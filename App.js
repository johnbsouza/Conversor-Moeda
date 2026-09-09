import React, { useState, useEffect } from 'react';
import {  View,  Text,  StatusBar,  ScrollView,  TouchableOpacity,  KeyboardAvoidingView,  Platform,  Alert,  ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './app.styles';
import { colors } from './src/constants/colors';
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

      <LinearGradient
        colors={['#25252B', '#1E1E24', '#18181D']}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.content}>

            <View style={styles.header}>
              <Text style={styles.title}>Conversor Global</Text>
              <Text style={styles.subtitle}>Cotações de todo o mundo em tempo real</Text>
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

            <TouchableOpacity style={styles.swapButton} onPress={swapCurrency} activeOpacity={0.7}>
              <Text style={styles.swapButtonText}>↕</Text>
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
              style={[styles.convertTouchable, (!amount || loading) && styles.convertButtonDisabled]}
              onPress={handleConvert}
              disabled={!amount || loading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={(!amount || loading) ? ['#2A2A30', '#2A2A30'] : ['#FF007F', '#00F0FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.convertButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.convertButtonText}>Converter</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <ResultCard
              result={result}
              exchangeRate={exchangeRate}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
            />

          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}