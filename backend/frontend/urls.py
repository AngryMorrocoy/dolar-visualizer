from django.urls import path, re_path
from django.views.static import serve
from . import views
from pathlib import Path
from backend.settings import BASE_DIR

urlpatterns = [
    path("", views.index, name="Frontend"),
]
