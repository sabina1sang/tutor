import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from my_users.models import User

@pytest.mark.django_db
def test_student_registration():
    client = APIClient()
    url = reverse('register-student')
    data = {
        'username': 'student1',
        'email': 'student1@example.com',
        'password': 'password123'
    }
    
    response = client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.filter(username='student1').exists()
    
    user = User.objects.get(username='student1')
    assert user.role == 'STUDENT'
