from rest_framework import serializers
from django.db import transaction
from my_users.models import User
from .models import TutorProfile

class TutorRegistrationSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(write_only=True)
    subjects = serializers.CharField(write_only=True)
    hourly_rate = serializers.DecimalField(write_only=True, max_digits=10, decimal_places=2)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'bio', 'subjects', 'hourly_rate']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        bio = validated_data.pop('bio')
        subjects = validated_data.pop('subjects')
        hourly_rate = validated_data.pop('hourly_rate')

        with transaction.atomic():
            user = User.objects.create_user(**validated_data, role='TUTOR')
            TutorProfile.objects.create(
                user=user, 
                bio=bio, 
                subjects=subjects, 
                hourly_rate=hourly_rate
            )
            return user

class TutorProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = TutorProfile
        fields = ['id', 'username', 'email', 'bio', 'subjects', 'hourly_rate']
