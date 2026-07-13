import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from my_users.models import User
from scheduling.models import Booking

@pytest.mark.django_db
def test_create_booking():
    student = User.objects.create_user(username='student', role='STUDENT')
    tutor = User.objects.create_user(username='tutor', role='TUTOR')
    
    client = APIClient()
    client.force_authenticate(user=student)
    
    url = reverse('booking-list-create')
    data = {
        'tutor': tutor.id,
        'scheduled_time': '2026-08-01T10:00:00Z'
    }
    
    response = client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert Booking.objects.filter(student=student, tutor=tutor).exists()
    
    booking = Booking.objects.get(student=student, tutor=tutor)
    assert booking.status == 'PENDING'
