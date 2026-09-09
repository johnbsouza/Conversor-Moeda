import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 18,
    marginTop: 4,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 6,
  },
  rate: {
    color: colors.textSecondary,
    fontSize: 13,
  }
});