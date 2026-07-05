import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useBeautyStore } from '../store/useBeautyStore';
import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { Tag } from '../components/Tag';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

const INSPIRATIONS = [
  '去海边', '第一次约会', '上班通勤', '生日聚会', '拍写真', 
  '参加婚礼', '显白', '高级感', '温柔感', '韩系甜美', 
  '极简', '辣妹风', '夏日感', '奶茶色', '法式'
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedInspirations, toggleInspiration, setHandImage } = useBeautyStore();

  const handleUploadPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('需要权限', '请允许访问相册以上传照片');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setHandImage(result.assets[0].uri);
      navigation.navigate('Analyzing');
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.title}>今天，做一款适合你的美甲</Text>
            <Text style={styles.subtitle}>拍一张手，让 AI 根据你的肤色、手型和场景推荐适合你的款式。</Text>
          </View>

          <View style={styles.sloganCard}>
            <Text style={styles.sloganText}>别再盲选美甲了。</Text>
            <Text style={styles.sloganText}>拍一张手，让 AI 告诉你什么最适合。</Text>
          </View>

          <View style={styles.actionContainer}>
            <PrimaryButton 
              title="拍一张手" 
              onPress={() => navigation.navigate('Camera')} 
              style={styles.actionBtn}
            />
            <SecondaryButton 
              title="上传照片" 
              onPress={handleUploadPhoto}
              style={styles.actionBtn}
            />
          </View>

          <View style={styles.tagsSection}>
            <View style={styles.tagsHeader}>
              <Text style={styles.sectionTitle}>选择你的灵感</Text>
              {selectedInspirations.length > 0 && (
                <Text style={styles.selectedCount}>已选择 {selectedInspirations.length} 个灵感</Text>
              )}
            </View>
            <View style={styles.tagsContainer}>
              {INSPIRATIONS.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  selected={selectedInspirations.includes(tag)}
                  onPress={() => toggleInspiration(tag)}
                  style={styles.tag}
                />
              ))}
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  sloganCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  sloganText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  actionContainer: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  actionBtn: {
    width: '100%',
  },
  tagsSection: {
    marginTop: spacing.sm,
  },
  tagsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  selectedCount: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    marginBottom: spacing.xs,
  },
});
