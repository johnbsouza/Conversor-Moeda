import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.text,
    fontWeight: '500',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  }
});