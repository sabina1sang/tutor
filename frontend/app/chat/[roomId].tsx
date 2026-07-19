import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';

export default function ChatScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const socket = useRef<WebSocket | null>(null);
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    // Note: In production, use wss:// and handle token in auth header or sub-protocol
    socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomId}/`);

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => socket.current?.close();
  }, [roomId]);

  const sendMessage = () => {
    socket.current?.send(JSON.stringify({ message: input }));
    setInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.sender}: {item.message}</Text>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  inputContainer: { flexDirection: 'row', padding: 10 },
  input: { flex: 1, borderWidth: 1, marginRight: 10 },
  message: { padding: 5, borderBottomWidth: 1 },
});
