export interface UserImage {
  base64: string;
  mimeType: string;
}

export enum AppState {
  INITIAL,
  GENERATING,
  RESULT_READY,
}

export type Theme = 'light' | 'dark';

// FIX: Added missing 'Category' type definition to resolve import errors.
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

// FIX: Added missing 'Product' type definition to resolve import errors.
export interface Product {
  id: number;
  name: string;
  categoryId: string;
  imageUrl: string;
  prompt: string;
  buyUrl: string;
}