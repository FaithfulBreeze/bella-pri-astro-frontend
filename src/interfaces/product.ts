import type { ICategory } from "./category";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  link?: string;
  highlighted: boolean;
  mainAsset?: { id: number; name: string; src: string };
  assets: { id: number; name: string; src: string }[];
  categories: ICategory[];
}
