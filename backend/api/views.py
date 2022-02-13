from django.shortcuts import render
from rest_framework import viewsets
from .models import DolarHistory
from .serializers import DolarHistorySerializer


class DolarHistoryView(viewsets.ModelViewSet):
    queryset = DolarHistory.objects.all()
    serializer_class = DolarHistorySerializer

    # def create(self, request):
    #     pass
