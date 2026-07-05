import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <GradientBackground style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={FadeIn.duration(1000).delay(300)} style={styles.textContainer}>
          <Text style={styles.logo}>Beauty AI</Text>
          <Text style={styles.slogan}>Find Your Perfect Nails</Text>
          <Text style={styles.subtitle}>AI 帮你找到最适合自己的美甲</Text>
        </Animated.View>
      </View>
      
      <Animated.View entering={FadeInDown.duration(800).delay(800)} style={styles.footer}>
        <PrimaryButton 
          title="开始体验" 
          onPress={() => navigation.replace('MainTabs')} 
        />
      </Animated.View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: typography.weights.bold,
    color: colors.text,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  slogan: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    marginBottom: spacing.lg,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  footer: {
    paddingBottom: spacing.xxl,
    width: '100%',
  },
});
