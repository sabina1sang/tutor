import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { FormField } from '../../src/components/FormField';
import apiClient from '../../src/api/client';

export default function StudentRegistrationScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: { username: '', email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: (data: any) => apiClient.post('/auth/register/student/', data),
    onSuccess: () => {
      Alert.alert('Success', 'Account created! Redirecting to login.');
      router.replace('/login');
    },
    onError: (error: any) => {
      Alert.alert('Error', error.response?.data?.detail || 'Registration failed');
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <FormField control={control} name="username" label="Username" />
      <FormField control={control} name="email" label="Email" />
      <FormField control={control} name="password" label="Password" secureTextEntry />
      <Button title="Register" onPress={handleSubmit(onSubmit)} disabled={mutation.isPending} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
});
