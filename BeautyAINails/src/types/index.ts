export interface Recommendation {
  id: string;
  name: string;
  image: string; // 方案图
  tryOnImage: string; // 试戴效果图
  originalHandImage?: string; // 原始手部图
  matchScore: number;
  tags: string[];
  priceRange: string;
  duration: string;
  reason: string;
  style: string;
  scene: string;
}

export interface HandProfile {
  handShape: string;
  skinTone: string;
  suitable: string[];
  unsuitable: string[];
}
