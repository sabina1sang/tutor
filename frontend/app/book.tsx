import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { FormField } from '../src/components/FormField';
import apiClient from '../src/api/client';
import { useLocalSearchParams } from 'expo-router';

export default function BookTutorScreen() {
  const { tutorId } = useLocalSearchParams<{ tutorId: string }>();

  const { control, handleSubmit } = useForm({
    defaultValues: { scheduled_time: '' },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => apiClient.post('/bookings/', { ...data, tutor: tutorId }),
    onSuccess: () => {
      Alert.alert('Success', 'Booking request sent!');
    },
    onError: () => {
      Alert.alert('Error', 'Booking failed.');
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <FormField control={control} name="scheduled_time" label="Scheduled Time (YYYY-MM-DDTHH:MM:SSZ)" />
      <Button title="Book Demo Class" onPress={handleSubmit(onSubmit)} disabled={mutation.isPending} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
});
