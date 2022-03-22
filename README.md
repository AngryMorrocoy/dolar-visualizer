# Dolar visualizer

This is a fullstack app to visualize a graphic of the price over time in
Venezuela. You can see it live [here](https://dolar-visualizer.herokuapp.com/)

# Index

- [How it works?](#how-it-works)
- [API](#api)
    - [Date format](#date-format)
    - [GET: /api/dolar-history/](#get-apidolar-history)
    - [POST: /api/dolar-history/](#post-apidolar-history)

## How it works?

Well, there exists a twitter account
([@monitordolarvla](https://twitter.com/monitordolarvla)) that posts the average
price of the dolar at *9AM* and at *1PM*.

Using [this](https://rapidapi.com/Glavier/api/twitter135/) API from **rapidapi**
I get those tweets and parse them into a database table, then create an API to
fetch all that data, and update it.

## API

The api defined routes, responses and valid parameters.

### Date format

The way the date is parsed by the API is
"{YEAR}-{MONTH}-{DAY}T{HOUR}:{MINUTES}:{SECONDS}Z"

> Sample: "2022-02-15T09:00:00Z"

### GET: /api/dolar-history/

***Response***:

- **count**: Total number of results. (Integer).
- **next**: Url for the next page or null. (Url?).
- **previous**: Url for the previous page or null. (Url?).
- **results**: A list of objects with this syntax:
    - **date**: The date and time for this price in [this](#date-format)
      format.
    - **price**: A float number that indicates the price of the dollar in
      **BsD**.
    - **tweet_url**: The url for the actual from where the data came
      from.

***Params***:

- **date__range**: Two comma separated [dates](#date-format) that acts like a
  range (end inclusive).

  **Example:**
  /api/dolar-history/?**date__range**=2022-02-01T00:00:00Z,2022-02-05T00:00:00Z \
  \
  Will return the dolar prices from February 2nd to February 5th.

- **page**: The number of the page that do you want to access (starting at 1).

  **Example**:
  /api/dolar-history/?**page**=3 \
  \
  Will return the third page of the data.

- **page_size**: How many results do you want to be en each page. (Default=10)

  **Example**:
  /api/dolar-history/?**page_size**=5 \
  \
  Will return a repsonse with 5 items in the "results" field.

It's **IMPORTANT** to know that non of this params exclude others. So you can
use all of them in a single request if you want to.

---

### POST: /api/dolar-history/

This is a protected "*admin only*" route to fetch data from the twitter api and
parse it into the database.

***Response***:

- **errors**: An array with the errors that happened when trying to fetch the data.
- **created_objects**: An array with the objects created on the database (prices
  of the dollar).

***Params***:

- **count**: The number of tweets you want to fetch (Default: 5).
