import React from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import { FormField } from '../src/components/FormField';
import apiClient from '../src/api/client';
import { useAuthStore } from '../src/store/authStore';

export default function LoginScreen() {
  const { control, handleSubmit } = useForm({
    defaultValues: { username: '', password: '' },
  });
  const router = useRouter();
  
  const setTokens = useAuthStore((state) => state.setTokens);

  const mutation = useMutation({
    mutationFn: (data: any) => apiClient.post('/token/', data),
    onSuccess: (response) => {
      setTokens(response.data.access, response.data.refresh);
      router.replace('/tutors');
    },
    onError: (error: any) => {
      Alert.alert('Error', 'Login failed.');
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <FormField control={control} name="username" label="Username" />
      <FormField control={control} name="password" label="Password" secureTextEntry />
      <Button title="Login" onPress={handleSubmit(onSubmit)} disabled={mutation.isPending} />
      <Link href="/register/student" style={styles.link}>
        <Text>Don't have an account? Register</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  link: { marginTop: 15, textAlign: 'center' },
});
