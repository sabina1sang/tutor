from rest_framework import generics, permissions
from .serializers import StudentRegistrationSerializer
from .models import User

class RegisterStudentView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StudentRegistrationSerializer
