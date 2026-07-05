import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useBeautyStore } from '../store/useBeautyStore';
import { GradientBackground } from '../components/GradientBackground';
import { InspirationCard } from '../components/InspirationCard';
import { SectionTitle } from '../components/SectionTitle';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

const CATEGORIES = [
  { id: '1', title: '今日推荐', tags: ['显白', '极简', '高级感', '法式'] },
  { id: '2', title: '显白款', tags: ['显白', '夏日感', '冰透'] },
  { id: '3', title: '通勤款', tags: ['通勤', '极简', '法式'] },
  { id: '4', title: '约会款', tags: ['约会', '温柔', '韩系甜美'] },
  { id: '5', title: '夏日款', tags: ['夏日感', '辣妹风', '清新'] },
  { id: '6', title: '高级感', tags: ['高级感', '珍珠白', '冷淡风'] },
];

export const InspirationScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedInspirations, toggleInspiration } = useBeautyStore();

  const handleSelect = (tag: string) => {
    if (!selectedInspirations.includes(tag)) {
      toggleInspiration(tag);
    }
    // Navigate back to home where the tags are displayed
    (navigation.navigate as any)('Home');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>找到你的美甲灵感</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {CATEGORIES.map(category => (
            <View key={category.id} style={styles.categorySection}>
              <SectionTitle title={category.title} style={styles.categoryTitle} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                {category.tags.map((tag, index) => (
                  <InspirationCard 
                    key={index}
                    title={tag}
                    image={`https://picsum.photos/seed/${category.title}${index}/200/300`}
                    selected={selectedInspirations.includes(tag)}
                    onPress={() => handleSelect(tag)}
                  />
                ))}
              </ScrollView>
            </View>
          ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  categorySection: {
    marginBottom: spacing.xl,
  },
  categoryTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  horizontalScroll: {
    paddingHorizontal: spacing.lg,
  },
});
