from django.urls import path
from .views import ContactFormView

from . import views

urlpatterns = [
    path('', views.AboutPageView.as_view(), name='about'),
    path('coaching/', views.CoachingPageView.as_view(), name='coaching'),
    path('productservice/', views.ProductServicePageView.as_view(), name='productservice'),
    path('contact/', views.ContactFormView.as_view(), name='contact'),
    path('config/', views.stripe_config),
    path('create-checkout-session/', views.create_checkout_session),
    path('success/', views.SuccessView.as_view()),
]
