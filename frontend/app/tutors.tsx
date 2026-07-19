import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import apiClient from '../src/api/client';

interface Tutor {
  id: number;
  username: string;
  bio: string;
  subjects: string;
  hourly_rate: string;
}

const fetchTutors = async (): Promise<Tutor[]> => {
  const { data } = await apiClient.get('/tutors/');
  return data;
};

export default function TutorListScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tutors'],
    queryFn: fetchTutors,
  });

  if (isLoading) return <ActivityIndicator style={styles.center} />;
  if (error) return <Text style={styles.center}>Error loading tutors</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Link href={{ pathname: '/book', params: { tutorId: item.id } }} asChild>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.username}</Text>
            <Text>{item.subjects}</Text>
            <Text>${item.hourly_rate}/hr</Text>
          </TouchableOpacity>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 15, margin: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
});
