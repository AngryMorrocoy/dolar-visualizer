from django.shortcuts import render
from backend.settings import BASE_DIR

# Create your views here.


def index(request):
    print(BASE_DIR)
    return render(request, "frontend/index.html")
