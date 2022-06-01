from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # path('documents/', views.DocumentViewSet.as_view(), name='documents'),
    path('documents/', views.DocumentViewSet.as_view({
        'get': 'list',
        'post': 'create',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='documents'),
]