import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

export function Button({ currency, variant = 'primary', isSelected, onPress }) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        isSelected && (variant === 'primary' ? styles.primary : styles.secondary)
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{currency.code}</Text>
    </TouchableOpacity>
  );
}