import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { GlassCard } from './GlassCard';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  image: string;
  selected: boolean;
  onPress: () => void;
}

export const InspirationCard: React.FC<Props> = ({ title, image, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <GlassCard style={[styles.card, selected && styles.cardSelected]}>
        <Image source={{ uri: image }} style={styles.image} />
        {selected && (
          <View style={styles.overlay}>
            <Ionicons name="checkmark-circle" size={24} color={colors.white} />
          </View>
        )}
      </GlassCard>
      <Text style={[styles.title, selected && styles.titleSelected]} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: spacing.md,
    alignItems: 'center',
    width: 100,
  },
  card: {
    width: 100,
    height: 140,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderColor: 'transparent',
    borderWidth: 2,
  },
  cardSelected: {
    borderColor: colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.medium,
  },
  titleSelected: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
});
