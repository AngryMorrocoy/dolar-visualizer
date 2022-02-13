from rest_framework import serializers
from .models import DolarHistory


class DolarHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DolarHistory
        fields = "__all__"
