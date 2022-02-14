from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response
from .models import DolarHistory
from .serializers import DolarHistorySerializer
from .utils import twitter_scrapper as scrapper
from .paginators import StandardDolarHistoryPagination


class DolarHistoryView(viewsets.GenericViewSet, RetrieveModelMixin):
    queryset = DolarHistory.objects.all()
    serializer_class = DolarHistorySerializer
    pagination_class = StandardDolarHistoryPagination

    def list(self, request, *args, **kwargs):
        q = self.get_queryset().order_by("date")[::-1]
        queryset = self.filter_queryset(q)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        count = 10
        if "count" in request.query_params:
            count = request.query_params["count"]

        twitter_response = scrapper.get_dollar_prices_from_twitter(count)
        response_data = {"errors": [], "created_objects": []}

        for response in twitter_response:
            serializer = self.serializer_class(data=response)

            if not serializer.is_valid():
                response_data["errors"].append(serializer.errors)
                continue
            serializer.save()

            response_data["created_objects"].append(response["date"])

        return Response(response_data)
