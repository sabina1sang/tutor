from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import TutorRegistrationSerializer, TutorProfileSerializer
from .models import TutorProfile
from .filters import TutorFilter

class RegisterTutorView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TutorRegistrationSerializer

class TutorProfileListView(generics.ListAPIView):
    queryset = TutorProfile.objects.all()
    serializer_class = TutorProfileSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TutorFilter
