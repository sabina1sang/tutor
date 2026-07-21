import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { WebContainer } from '../src/components/WebContainer';
import { RoleCard } from '../src/components/RoleCard';
import { theme } from '../src/utils/theme';

export default function LandingScreen() {
  const router = useRouter();

  const handleSelectRole = (role: string) => {
    router.push({ pathname: '/login', params: { role } });
  };

  return (
    <WebContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to TutorLink</Text>
        <Text style={styles.subtitle}>Who are you?</Text>
        <RoleCard title="Student" onPress={() => handleSelectRole('student')} />
        <RoleCard title="Parent" onPress={() => handleSelectRole('parent')} />
        <RoleCard title="Teacher" onPress={() => handleSelectRole('tutor')} />
      </View>
    </WebContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.lg, justifyContent: 'center' },
  title: { fontSize: 36, fontWeight: '900', color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: 18, color: theme.colors.textLight, marginBottom: 32 },
});
