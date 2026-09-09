import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { styles } from './app.styles';
import { Input } from './src/components/input';
import { ResultCard } from './src/components/resultCard';
import { CurrencySelector } from './src/components/currencySelector';
import { fetchExchangeRate } from './src/services/api';
import { convertCurrency } from './src/utils/convert';
export default function App() {

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchExchangeRate('USD');
        const currenciesList = Object.keys(data.rates);
        setAvailableCurrencies(currenciesList);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar a lista de moedas.');
      }
    };

    loadCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!amount) return;

    try {
      setLoading(true);
      const data = await fetchExchangeRate(fromCurrency);
      const rate = data.rates[toCurrency];
      setExchangeRate(rate);

      const convertedAmount = convertCurrency(amount, rate);
      setResult(convertedAmount);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao converter. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>

          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moeda</Text>
            <Text style={styles.subtitle}>Cotações do mundo em tempo real</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>

            <CurrencySelector
              selectedValue={fromCurrency}
              currencies={availableCurrencies}
              onSelect={setFromCurrency}
            />

            <Input
              label="Valor:"
              value={amount}
              onChangeText={setAmount}
            />
          </View>


          <TouchableOpacity style={styles.swapButton} onPress={swapCurrency}>
            <Text style={styles.swapButtonText}>↑↓</Text>
          </TouchableOpacity>


          <View style={styles.card}>
            <Text style={styles.label}>Para:</Text>

            <CurrencySelector
              selectedValue={toCurrency}
              currencies={availableCurrencies}
              onSelect={setToCurrency}
            />
          </View>

          <TouchableOpacity
            style={[styles.convertButton, (!amount || loading) && styles.convertButtonDisabled]}
            onPress={handleConvert}
            disabled={!amount || loading}
            activeOpacity={0.7} 
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.convertButtonText}>Converter</Text>
            )}
          </TouchableOpacity>


          <ResultCard
            result={result}
            exchangeRate={exchangeRate}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}