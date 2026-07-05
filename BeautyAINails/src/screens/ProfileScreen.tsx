import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBeautyStore } from '../store/useBeautyStore';
import { GradientBackground } from '../components/GradientBackground';
import { SectionTitle } from '../components/SectionTitle';
import { EmptyState } from '../components/EmptyState';
import { RecommendationCard } from '../components/RecommendationCard';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen: React.FC = () => {
  const { handProfile, favorites, tryOnHistory } = useBeautyStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>我的</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <SectionTitle title="手型档案" />
          {handProfile ? (
            <View style={styles.profileCard}>
              <View style={styles.profileRow}>
                <Text style={styles.label}>手型</Text>
                <Text style={styles.value}>{handProfile.handShape}</Text>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.label}>肤色</Text>
                <Text style={styles.value}>{handProfile.skinTone}</Text>
              </View>
              <View style={styles.profileRow}>
                <Text style={styles.label}>适合</Text>
                <Text style={styles.value}>{handProfile.suitable.join('、')}</Text>
              </View>
              <View style={[styles.profileRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.label}>不建议</Text>
                <Text style={styles.value}>{handProfile.unsuitable.join('、')}</Text>
              </View>
            </View>
          ) : (
            <EmptyState 
              title="还没有手型档案。\n上传一张手部照片，开始你的第一次推荐。" 
              icon="scan-outline" 
            />
          )}

          <SectionTitle title="我的收藏" style={styles.sectionMargin} />
          {favorites.length > 0 ? (
            favorites.map(item => (
              <RecommendationCard 
                key={`fav-${item.id}`} 
                item={item} 
                onPress={() => navigation.navigate('TryOn', { id: item.id })} 
              />
            ))
          ) : (
            <EmptyState 
              title="还没有收藏的方案。\n试戴后喜欢的款式会出现在这里。" 
              icon="heart-outline" 
            />
          )}

          <SectionTitle title="试戴记录" style={styles.sectionMargin} />
          {tryOnHistory.length > 0 ? (
            tryOnHistory.map(item => (
              <RecommendationCard 
                key={`hist-${item.id}`} 
                item={item} 
                onPress={() => navigation.navigate('TryOn', { id: item.id })} 
              />
            ))
          ) : (
            <EmptyState 
              title="还没有试戴记录。\n去首页发现适合你的美甲吧。" 
              icon="time-outline" 
            />
          )}

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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileRow: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    width: 80,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  value: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  sectionMargin: {
    marginTop: spacing.xl,
  },
});
