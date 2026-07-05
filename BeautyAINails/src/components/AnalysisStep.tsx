import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

interface Props {
  text: string;
  delayMs?: number;
}

export const AnalysisStep: React.FC<Props> = ({ text, delayMs = 0 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="scan-outline" size={16} color={colors.white} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: spacing.sm,
    borderRadius: radius.md,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  text: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.medium,
  },
});
