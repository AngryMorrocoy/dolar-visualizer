import requests
import re
from datetime import datetime
from backend.settings import ENV


def extract_data_from_tweet(tweet_text: str) -> tuple:
    """Function to extract dolar data from @monitordolarvla tweets
    return: (date, time, price, url)
    """
    # First we remove emojis
    tweet_text = tweet_text.encode("ascii", "ignore")
    tweet_text = tweet_text.decode()

    # This regular expresion groups are our required fields
    regExpr = "^[^\d]*(\d+/\d+/\d+)[^\d]*(\d+:\d+).*\n.+Bs\.\s(\d+,\d+).*\n.+(https.+)"

    result = re.search(regExpr, tweet_text)

    # Return an invalid tuple if the regex doesn't match
    return (None, None, None, None) if not result else result.groups()


def get_dollar_prices_from_twitter(count: int = 5):
    """Using an external api fetchs the tweets from the @monitordolarvla user
    and transform their tweets into objects with the next fields:
        ( 'date', 'price', 'tweet_url',)"""
    API_URL = "https://twitter135.p.rapidapi.com"
    monitorDolarVlaUser = "1111628873211527168"

    headers = {
        "x-rapidapi-host": ENV["TWITTER_RAPIDAPI_HOST"],
        "x-rapidapi-key": ENV["TWITTER_RAPIDAPI_KEY"],
    }

    # The response from this code is a total mess should clean it
    req = requests.get(
        f"{API_URL}/UserTweets/",
        params={"id": monitorDolarVlaUser, "count": str(count)},
        headers=headers,
    )

    if req.status_code != 200:
        raise ValueError("Response code != 200")

    # Cleaning the response

    data = req.json()
    # We make our way to the "instructions" field in the response
    data = data["data"]["user"]["result"]["timeline"]["timeline"]["instructions"]
    # The instructions field is a list of dicts, so we filter those which
    # type is "TimelineAddEntries"
    data = filter(lambda instruction: instruction["type"] == "TimelineAddEntries", data)

    response = []

    # We iterate through all the TimelineAddEntries
    for obj in data:
        # For each entry here
        for entry in obj["entries"]:
            # If it's not a tweet continue
            if not "tweet" in entry["entryId"]:
                continue

            # Finally we get the actual tweet text
            tweet_legacy = entry["content"]["itemContent"]["tweet_results"]["result"][
                "legacy"
            ]
            tweet_content = tweet_legacy["full_text"]

            date, time, price, url = extract_data_from_tweet(tweet_content)

            if not all([date, time, price, url]):
                continue

            # Price now is a valid float
            price = float(price.replace(",", "."))

            # We separate the day month and the year
            day, month, year = date.split("/")
            # We get the hour
            hour = time.split(":")[0]
            # Since monitor dolar only updates at 9am and 1pm
            # If the hour is '1' then we change it to 13
            # We want it in a 24h format
            if hour[0] == "1":
                hour = "13"

            _datetime = datetime(*map(int, [year, month, day, hour]))

            response.append({"date": _datetime, "price": price, "url": url})

    return response
