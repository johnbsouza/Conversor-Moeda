import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  selectorButton: {
    backgroundColor: colors.inputBackground,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: colors.inputBackground,
    color: colors.text,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  currencyItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBackground,
  },
  currencyItemText: {
    color: colors.text,
    fontSize: 16,
  }
});