import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from tutor_work.models import TutorProfile
from my_users.models import User

@pytest.mark.django_db
def test_tutor_list_filter():
    client = APIClient()
    
    # Create tutors
    user1 = User.objects.create_user(username='tutor1', role='TUTOR')
    TutorProfile.objects.create(user=user1, subjects='Math', hourly_rate=30.00)
    
    user2 = User.objects.create_user(username='tutor2', role='TUTOR')
    TutorProfile.objects.create(user=user2, subjects='Physics', hourly_rate=60.00)
    
    # Test filtering by subjects
    url = reverse('tutor-list')
    response = client.get(url, {'subjects': 'Math'})
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]['username'] == 'tutor1'
    
    # Test filtering by price range
    response = client.get(url, {'min_price': 40, 'max_price': 70})
    assert len(response.data) == 1
    assert response.data[0]['username'] == 'tutor2'
