import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Row } from './components/Row';

type Scenario = 'high' | 'low' | 'limit' | 'empty';

type Candidate = {
  id: string;
  species: string;
  confidence: number;
};

const scenarioOptions: { value: Scenario; label: string }[] = [
  { value: 'high', label: 'Alta' },
  { value: 'low', label: 'Baixa' },
  { value: 'limit', label: 'Limite' },
  { value: 'empty', label: 'Vazio' },
];

const candidatesByScenario: Record<Scenario, Candidate[]> = {
  high: [
    { id: 'jararaca', species: 'Jararaca', confidence: 0.93 },
    { id: 'cascavel', species: 'Cascavel', confidence: 0.04 },
    { id: 'coral', species: 'Coral-verdadeira', confidence: 0.03 },
  ],
  low: [
    { id: 'jararaca', species: 'Jararaca', confidence: 0.41 },
    { id: 'cascavel', species: 'Cascavel', confidence: 0.38 },
    { id: 'coral', species: 'Coral-verdadeira', confidence: 0.12 },
  ],
  limit: [
    { id: 'jararaca', species: 'Jararaca', confidence: 0.8 },
    { id: 'cascavel', species: 'Cascavel', confidence: 0.12 },
    { id: 'coral', species: 'Coral-verdadeira', confidence: 0.08 },
  ],
  empty: [],
};

export default function App() {
  const [scenario, setScenario] = useState<Scenario>('high');
  const candidates = candidatesByScenario[scenario];
  const firstCandidate = candidates[0];
  const isUncertain = firstCandidate !== undefined && firstCandidate.confidence < 0.8;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.eyebrow}>OPHIDIA · RESULTADO</Text>
      <Text style={styles.title}>Espécies candidatas</Text>

      <View style={styles.scenarioControls}>
        {scenarioOptions.map((option) => (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: scenario === option.value }}
            onPress={() => setScenario(option.value)}
            style={[styles.scenarioButton, scenario === option.value && styles.activeButton]}
          >
            <Text
              style={[styles.buttonText, scenario === option.value && styles.activeButtonText]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {isUncertain && (
        <Text accessibilityRole="alert" style={styles.warning}>
          Resultado incerto. Tente outra foto.
        </Text>
      )}

      <FlatList
        contentContainerStyle={styles.listContent}
        data={candidates}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>Nenhuma espécie identificada.</Text>
        }
        renderItem={({ item, index }) => (
          <Row
            species={item.species}
            confidence={item.confidence}
            highlighted={index === 0 && !isUncertain}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f2',
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  eyebrow: {
    color: '#52705b',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#1e3026',
    fontSize: 27,
    fontWeight: '700',
    marginTop: 8,
  },
  scenarioControls: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  scenarioButton: {
    alignItems: 'center',
    backgroundColor: '#e5eae2',
    borderRadius: 8,
    flex: 1,
    minHeight: 46,
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#28583d',
  },
  buttonText: {
    color: '#34483a',
    fontSize: 15,
    fontWeight: '600',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  warning: {
    backgroundColor: '#fff0d9',
    borderColor: '#e0aa5d',
    borderRadius: 8,
    borderWidth: 1,
    color: '#75450f',
    fontSize: 15,
    marginTop: 20,
    padding: 14,
  },
  listContent: {
    gap: 12,
    paddingTop: 20,
  },
  emptyMessage: {
    color: '#58665d',
    fontSize: 16,
    paddingVertical: 24,
    textAlign: 'center',
  },
});
