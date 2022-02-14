from django_filters import rest_framework as filters
from .models import DolarHistory


class DolarHistoryFilter(filters.FilterSet):
    class Meta:
        model = DolarHistory
        fields = {"date": ["range"]}
