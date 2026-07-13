from django.urls import path
from .views import RegisterStudentView

urlpatterns = [
    path('auth/register/student/', RegisterStudentView.as_view(), name='register-student'),
]
