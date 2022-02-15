from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt
from . import views

router = routers.DefaultRouter()
router.register("dolar-history", views.DolarHistoryView, "Dolar history")

urlpatterns = [
    path("", include(router.urls)),
    path("token/", jwt.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt.TokenRefreshView.as_view(), name="token_refresh"),
]
