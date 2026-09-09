import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { styles } from './styles';
import { currenciesMap } from '../../constants/currenciesMap';

export function CurrencySelector({ selectedValue, currencies, onSelect }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const formatCurrencyLabel = (code) => {
    const info = currenciesMap[code];
    if (info) {
      return `${info.flag} ${info.name} (${code})`;
    }
    return `🌐 ${code} (${code})`;
  };

  const searchedCurrencies = currencies.filter(code => {
    const info = currenciesMap[code];
    const name = info ? info.name.toLowerCase() : '';
    const query = searchQuery.toLowerCase();
    
    return code.toLowerCase().includes(query) || name.includes(query);
  });

  const filteredCurrencies = searchedCurrencies.sort((a, b) => {
    const hasA = currenciesMap[a] ? 1 : 0;
    const hasB = currenciesMap[b] ? 1 : 0;

    if (hasA !== hasB) {
      return hasB - hasA;
    }

    return a.localeCompare(b);
  });

  return (
    <View>
      <TouchableOpacity 
        style={styles.selectorButton} 
        onPress={() => {
          setSearchQuery('');
          setModalVisible(true);
        }}
      >
        <Text style={styles.selectorText}>{formatCurrencyLabel(selectedValue)}</Text>
        <Text style={styles.selectorText}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione a Moeda</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>Fechar</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Digite o país ou sigla..."
              placeholderTextColor="#A8A8B3"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredCurrencies}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.currencyItem}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.currencyItemText}>
                    {formatCurrencyLabel(item)}
                  </Text>
                </TouchableOpacity>
              )}
            />
            
          </View>
        </View>
      </Modal>
    </View>
  );
}