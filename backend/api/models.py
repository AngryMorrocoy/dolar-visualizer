from django.db import models


class DolarHistory(models.Model):
    date = models.DateTimeField()
    price = models.FloatField()
    tweet_url = models.URLField()  # Max length is actually 200
