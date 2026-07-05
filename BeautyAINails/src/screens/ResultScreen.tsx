import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useBeautyStore } from '../store/useBeautyStore';
import { GradientBackground } from '../components/GradientBackground';
import { RecommendationCard } from '../components/RecommendationCard';
import { SectionTitle } from '../components/SectionTitle';
import { SecondaryButton } from '../components/SecondaryButton';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { mockRecommendations } from '../data/mockRecommendations';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Result'>;
};

export const ResultScreen: React.FC<Props> = ({ navigation }) => {
  const { handProfile, recommendations, setRecommendations } = useBeautyStore();

  const handleShuffle = () => {
    // Simple mock shuffle
    const shuffled = [...mockRecommendations].sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 4));
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>为你推荐 4 套方案</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {handProfile && (
            <View style={styles.profileCard}>
              <Text style={styles.profileText}>
                你的手型偏<Text style={styles.highlight}>{handProfile.handShape}</Text>，肤色偏<Text style={styles.highlight}>{handProfile.skinTone}</Text>，适合{handProfile.suitable.join('、')}。
              </Text>
            </View>
          )}

          <SectionTitle 
            title="推荐方案" 
            subtitle="以下方案根据你的手型、肤色和选择的灵感生成。" 
            style={styles.sectionTitle}
          />

          <View style={styles.list}>
            {recommendations.map((item) => (
              <RecommendationCard 
                key={item.id} 
                item={item} 
                onPress={() => navigation.navigate('TryOn', { id: item.id })} 
              />
            ))}
          </View>

          <SecondaryButton 
            title="换一批" 
            onPress={handleShuffle} 
            style={styles.shuffleBtn} 
          />

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backBtn: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  placeholder: {
    width: 32,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(201, 164, 106, 0.3)', // primary
  },
  profileText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  highlight: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
  },
  list: {
    marginBottom: spacing.xl,
  },
  shuffleBtn: {
    marginBottom: spacing.xl,
  },
});
