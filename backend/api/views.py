from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from .models import DolarHistory
from .serializers import DolarHistorySerializer
from .utils import twitter_scrapper as scrapper
from .paginators import StandardDolarHistoryPagination
from .filters import DolarHistoryFilter


class DolarHistoryView(viewsets.ReadOnlyModelViewSet):
    queryset = DolarHistory.objects.all().order_by("date").reverse()
    serializer_class = DolarHistorySerializer
    pagination_class = StandardDolarHistoryPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = DolarHistoryFilter

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
