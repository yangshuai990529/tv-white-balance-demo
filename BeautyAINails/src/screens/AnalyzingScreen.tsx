import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useBeautyStore } from '../store/useBeautyStore';
import { GradientBackground } from '../components/GradientBackground';
import { AnalysisStep } from '../components/AnalysisStep';
import { mockRecommendations } from '../data/mockRecommendations';
import { spacing } from '../theme/spacing';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Analyzing'>;
};

export const AnalyzingScreen: React.FC<Props> = ({ navigation }) => {
  const { currentHandImage, setRecommendations, setAnalysisResult } = useBeautyStore();

  useEffect(() => {
    // Mock API Call delay
    const timer = setTimeout(() => {
      // Mock results
      setAnalysisResult({
        handShape: '修长型',
        skinTone: '暖白',
        suitable: ['奶茶色', '细闪', '法式', '低饱和色系'],
        unsuitable: ['高饱和荧光色', '厚重钻饰']
      });
      // Pick top 4 recommendations
      setRecommendations(mockRecommendations.slice(0, 4));
      
      navigation.replace('Result');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          {currentHandImage ? (
            <Image source={{ uri: currentHandImage }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <View style={styles.overlay} />
        </View>

        <View style={styles.stepsContainer}>
          <AnalysisStep text="正在识别手型..." delayMs={0} />
          <AnalysisStep text="正在分析肤色冷暖..." delayMs={800} />
          <AnalysisStep text="正在匹配适合甲型..." delayMs={1600} />
          <AnalysisStep text="正在生成推荐方案..." delayMs={2400} />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: spacing.xxxl,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DDD',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(201, 164, 106, 0.2)', // primary color tint
  },
  stepsContainer: {
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
});
