from django.urls import path
from .views import RegisterTutorView, TutorProfileListView

urlpatterns = [
    path('auth/register/tutor/', RegisterTutorView.as_view(), name='register-tutor'),
    path('tutors/', TutorProfileListView.as_view(), name='tutor-list'),
]
