from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import DolarHistory
from .serializers import DolarHistorySerializer
from .utils import twitter_scrapper as scrapper


class DolarHistoryView(viewsets.ModelViewSet):
    queryset = DolarHistory.objects.all()
    serializer_class = DolarHistorySerializer

    def create(self, request, *args, **kwargs):
        count = 10
        if "count" in request.query_params:
            count = request.query_params["count"]

        # serializer = self.serializer_class(data=request.data)
        # if not serializer.is_valid():

        twitter_response = scrapper.get_dollar_prices_from_twitter(count)
        print(twitter_response)

        return Response(status=status.HTTP_400_BAD_REQUEST)
