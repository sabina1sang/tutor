import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from my_users.models import User
from tutor_work.models import TutorProfile

@pytest.mark.django_db
def test_tutor_registration():
    client = APIClient()
    url = reverse('register-tutor')
    data = {
        'username': 'tutor1',
        'email': 'tutor1@example.com',
        'password': 'password123',
        'bio': 'Experienced math tutor',
        'subjects': 'Math, Physics',
        'hourly_rate': '50.00'
    }
    
    response = client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.filter(username='tutor1').exists()
    
    user = User.objects.get(username='tutor1')
    assert user.role == 'TUTOR'
    assert TutorProfile.objects.filter(user=user).exists()
    
    profile = TutorProfile.objects.get(user=user)
    assert profile.bio == 'Experienced math tutor'
    assert profile.subjects == 'Math, Physics'
    assert float(profile.hourly_rate) == 50.00
