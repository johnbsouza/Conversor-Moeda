import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  amount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.secondary, 
    marginBottom: 8,
  },
  rate: {
    color: colors.textSecondary,
    fontSize: 13,
  }
});