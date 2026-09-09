import { View, Text } from 'react-native';
import { styles } from './styles';

export function ResultCard({ result, exchangeRate, fromCurrency, toCurrency }) {
  if (!result || !exchangeRate) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Resultado:</Text>
      <Text style={styles.amount}>{result} {toCurrency}</Text>
      <Text style={styles.rate}>
        Taxa de câmbio: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
      </Text>
    </View>
  );
}