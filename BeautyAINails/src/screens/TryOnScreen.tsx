import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useBeautyStore } from '../store/useBeautyStore';
import { TryOnCompare } from '../components/TryOnCompare';
import { Tag } from '../components/Tag';
import { Toast } from '../components/Toast';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { mockRecommendations } from '../data/mockRecommendations';

type Props = {
  route: RouteProp<RootStackParamList, 'TryOn'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'TryOn'>;
};

const ADJUSTMENTS = ['更高级', '更可爱', '更显白', '更低调', '更闪一点'];

export const TryOnScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const item = mockRecommendations.find(r => r.id === id);
  const { currentHandImage, favorites, toggleFavorite, addTryOnHistory } = useBeautyStore();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const isFavorite = item ? favorites.some(fav => fav.id === item.id) : false;

  useEffect(() => {
    if (item) {
      addTryOnHistory(item);
    }
  }, [item]);

  if (!item) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `看看这款【${item.name}】美甲，AI推荐的，超级好看！`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    setToastMsg('已保存到相册');
    setToastVisible(true);
  };

  const handleAdjust = (adj: string) => {
    setToastMsg(`正在生成${adj}的版本...`);
    setToastVisible(true);
  };

  const handImg = currentHandImage || item.image; // fallback if no photo taken

  return (
    <View style={styles.container}>
      <Toast message={toastMsg} visible={toastVisible} onHide={() => setToastVisible(false)} />
      
      <View style={styles.imageSection}>
        <TryOnCompare originalImage={handImg} tryOnImage={item.tryOnImage} />
        
        <SafeAreaView style={styles.headerAbsolute}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <View style={styles.detailsSection}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.matchBadge}>
              <Ionicons name="sparkles" size={14} color={colors.primary} />
              <Text style={styles.matchText}>{item.matchScore}% 适配</Text>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {item.tags.map(tag => (
              <Tag key={tag} label={tag} selected={false} onPress={() => {}} style={styles.tag} />
            ))}
          </View>

          <View style={styles.reasonCard}>
            <Text style={styles.reasonText}>{item.reason}</Text>
          </View>

          <Text style={styles.sectionTitle}>微调方向</Text>
          <View style={styles.adjustContainer}>
            {ADJUSTMENTS.map(adj => (
              <TouchableOpacity key={adj} style={styles.adjustBtn} onPress={() => handleAdjust(adj)}>
                <Text style={styles.adjustText}>{adj}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.footer}>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => toggleFavorite(item)}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={28} 
                color={isFavorite ? colors.error : colors.text} 
              />
              <Text style={styles.actionText}>收藏</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={28} color={colors.text} />
              <Text style={styles.actionText}>分享</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={handleSave}>
              <Ionicons name="download-outline" size={28} color={colors.white} />
              <Text style={styles.saveBtnText}>保存图片</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageSection: {
    height: '55%',
    width: '100%',
  },
  headerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    marginTop: -24,
    paddingTop: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 164, 106, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.round,
  },
  matchText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  tag: {
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  reasonCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  reasonText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  adjustContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  adjustBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.round,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  adjustText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.round,
  },
  saveBtnText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginLeft: spacing.sm,
  },
});
