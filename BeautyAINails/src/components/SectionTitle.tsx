import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface Props {
  title: string;
  subtitle?: string;
  style?: StyleProp<TextStyle>;
}

export const SectionTitle: React.FC<Props> = ({ title, subtitle, style }) => {
  return (
    <React.Fragment>
      <Text style={[styles.title, style]}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
});
