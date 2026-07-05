import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

interface Props {
  originalImage: string;
  tryOnImage: string;
}

export const TryOnCompare: React.FC<Props> = ({ originalImage, tryOnImage }) => {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={{ uri: showOriginal ? originalImage : tryOnImage }} 
        style={styles.image} 
      />
      
      <TouchableOpacity 
        style={styles.toggleButton} 
        onPressIn={() => setShowOriginal(true)}
        onPressOut={() => setShowOriginal(false)}
        activeOpacity={0.9}
      >
        <Ionicons name="git-compare-outline" size={20} color={colors.text} />
        <Text style={styles.toggleText}>按住对比原图</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  toggleButton: {
    position: 'absolute',
    bottom: spacing.lg,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.round,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleText: {
    marginLeft: spacing.xs,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
});
