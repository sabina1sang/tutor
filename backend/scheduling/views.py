from rest_framework import generics, permissions
from .models import Booking
from .serializers import BookingSerializer

class BookingCreateListView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'TUTOR':
            return Booking.objects.filter(tutor=user)
        return Booking.objects.filter(student=user)

class BookingUpdateView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Tutors can only update their own bookings
        return Booking.objects.filter(tutor=self.request.user)
