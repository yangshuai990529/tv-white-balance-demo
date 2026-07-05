import { create } from 'zustand';
import { Recommendation, HandProfile } from '../types';

interface BeautyState {
  // 当前选择的灵感标签 (支持多选)
  selectedInspirations: string[];
  toggleInspiration: (tag: string) => void;

  // 当前上传/拍摄的手部照片
  currentHandImage: string | null;
  setHandImage: (uri: string | null) => void;

  // 手型分析结果
  handProfile: HandProfile | null;
  setAnalysisResult: (result: HandProfile | null) => void;

  // 当前推荐方案列表
  recommendations: Recommendation[];
  setRecommendations: (list: Recommendation[]) => void;

  // 收藏列表
  favorites: Recommendation[];
  toggleFavorite: (item: Recommendation) => void;

  // 试戴记录
  tryOnHistory: Recommendation[];
  addTryOnHistory: (item: Recommendation) => void;

  // 清除当前会话（重新开始）
  clearCurrentSession: () => void;
}

export const useBeautyStore = create<BeautyState>((set) => ({
  selectedInspirations: [],
  toggleInspiration: (tag) =>
    set((state) => {
      const exists = state.selectedInspirations.includes(tag);
      return {
        selectedInspirations: exists
          ? state.selectedInspirations.filter((t) => t !== tag)
          : [...state.selectedInspirations, tag],
      };
    }),

  currentHandImage: null,
  setHandImage: (uri) => set({ currentHandImage: uri }),

  handProfile: null,
  setAnalysisResult: (result) => set({ handProfile: result }),

  recommendations: [],
  setRecommendations: (list) => set({ recommendations: list }),

  favorites: [],
  toggleFavorite: (item) =>
    set((state) => {
      const exists = state.favorites.find((fav) => fav.id === item.id);
      return {
        favorites: exists
          ? state.favorites.filter((fav) => fav.id !== item.id)
          : [...state.favorites, item],
      };
    }),

  tryOnHistory: [],
  addTryOnHistory: (item) =>
    set((state) => {
      // 避免重复记录相同的历史，或者将其放到最前面
      const filtered = state.tryOnHistory.filter((hist) => hist.id !== item.id);
      return {
        tryOnHistory: [item, ...filtered],
      };
    }),

  clearCurrentSession: () =>
    set({
      selectedInspirations: [],
      currentHandImage: null,
      handProfile: null,
      recommendations: [],
    }),
}));
