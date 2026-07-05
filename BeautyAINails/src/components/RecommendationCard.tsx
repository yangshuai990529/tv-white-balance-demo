import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { GlassCard } from './GlassCard';
import { Recommendation } from '../types';

interface Props {
  item: Recommendation;
  onPress: () => void;
}

export const RecommendationCard: React.FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
      <GlassCard style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <View style={styles.matchBadge}>
              <Ionicons name="sparkles" size={12} color={colors.primary} />
              <Text style={styles.matchText}>{item.matchScore}%</Text>
            </View>
          </View>
          <Text style={styles.tags} numberOfLines={1}>{item.tags.join(' / ')}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>{item.priceRange}</Text>
            <Text style={styles.infoText}> • </Text>
            <Text style={styles.infoText}>{item.duration}</Text>
          </View>
          <Text style={styles.reason} numberOfLines={2}>{item.reason}</Text>
          
          <View style={styles.button}>
            <Text style={styles.buttonText}>查看试戴</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    height: 160,
    backgroundColor: colors.white,
  },
  image: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    flex: 1,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.round,
  },
  matchText: {
    fontSize: 12,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginLeft: 4,
  },
  tags: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  reason: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.black,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.round,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    marginRight: 4,
  },
});
