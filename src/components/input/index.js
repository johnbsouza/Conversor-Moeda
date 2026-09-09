import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';
import { colors } from '../../constants/colors';

export function Input({ label, value, onChangeText }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="0.00"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
      />
    </View>
  );
}