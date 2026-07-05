import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface Props {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export const EmptyState: React.FC<Props> = ({ title, icon = 'folder-open-outline', style }) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={48} color={colors.textSecondary} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    opacity: 0.8,
  },
  icon: {
    marginBottom: spacing.md,
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
  },
});
