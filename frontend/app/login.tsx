import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { FormField } from '../src/components/FormField';
import { WebContainer } from '../src/components/WebContainer';
import { theme } from '../src/utils/theme';
import apiClient from '../src/api/client';

export default function LoginScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();
  const router = useRouter();
  const { control, handleSubmit } = useForm({ defaultValues: { username: '', password: '' } });

  const mutation = useMutation({
    mutationFn: (data: any) => apiClient.post('/token/', data),
    onSuccess: () => {
      router.replace('/tutors'); 
    },
    onError: () => Alert.alert('Error', 'Invalid credentials'),
  });

  return (
    <WebContainer>
      <View style={styles.container}>
        <Text style={styles.title}>{role ? role.toUpperCase() : 'Login'}</Text>
        <FormField control={control} name="username" label="Username" />
        <FormField control={control} name="password" label="Password" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleSubmit((d) => mutation.mutate(d))}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.lg, justifyContent: 'center', backgroundColor: theme.colors.background },
  title: { fontSize: 32, fontWeight: '800', color: theme.colors.text, marginBottom: theme.spacing.lg },
  button: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: theme.borderRadius.md, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
