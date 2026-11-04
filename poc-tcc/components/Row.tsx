import { StyleSheet, Text, View } from 'react-native';

type RowProps = {
  species: string;
  confidence: number;
  highlighted: boolean;
};

export function Row({ species, confidence, highlighted }: RowProps) {
  return (
    <View style={[styles.row, highlighted && styles.highlightedRow]}>
      <Text style={[styles.species, highlighted && styles.highlightedSpecies]}>
        {species}
      </Text>
      <Text style={[styles.confidence, highlighted && styles.highlightedSpecies]}>
        {(confidence * 100).toFixed(1)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dce4da',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 64,
    paddingHorizontal: 16,
  },
  highlightedRow: {
    backgroundColor: '#e3efe3',
    borderColor: '#4d8058',
    minHeight: 78,
  },
  species: {
    color: '#33443a',
    fontSize: 16,
  },
  confidence: {
    color: '#58665d',
    fontSize: 14,
    fontVariant: ['tabular-nums'],
  },
  highlightedSpecies: {
    color: '#1e5732',
    fontSize: 18,
    fontWeight: '700',
  },
});