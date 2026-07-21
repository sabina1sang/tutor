import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export function WebContainer({ children }: { children: React.ReactNode }) {
  return (
    <View style={Platform.OS === 'web' ? styles.webWrapper : styles.mobileWrapper}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    maxWidth: 500,
    marginHorizontal: 'auto',
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  mobileWrapper: {
    flex: 1,
  },
});
