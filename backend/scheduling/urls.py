from django.urls import path
from .views import BookingCreateListView, BookingUpdateView

urlpatterns = [
    path('bookings/', BookingCreateListView.as_view(), name='booking-list-create'),
    path('bookings/<int:pk>/', BookingUpdateView.as_view(), name='booking-update'),
]
