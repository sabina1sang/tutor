from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'tutor', 'scheduled_time', 'status']
        read_only_fields = ['student', 'status']

    def create(self, validated_data):
        student = self.context['request'].user
        return Booking.objects.create(student=student, **validated_data)
