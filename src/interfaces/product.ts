export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  link?: string;
  highlighted: boolean;
  mainAsset?: { id: number; name: string; src: string };
  assets: { id: number; name: string; src: string }[];
  categories: { id: number; label: string }[];
}
