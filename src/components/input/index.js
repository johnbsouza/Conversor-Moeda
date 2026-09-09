import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';

export function Input({ label, value, onChangeText }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="0.00"
        placeholderTextColor="#4a4a52"
        keyboardType="numeric"
      />
    </View>
  );
}