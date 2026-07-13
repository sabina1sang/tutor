import django_filters
from .models import TutorProfile

class TutorFilter(django_filters.FilterSet):
    subjects = django_filters.CharFilter(lookup_expr='icontains')
    min_price = django_filters.NumberFilter(field_name='hourly_rate', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='hourly_rate', lookup_expr='lte')

    class Meta:
        model = TutorProfile
        fields = ['subjects', 'min_price', 'max_price']
