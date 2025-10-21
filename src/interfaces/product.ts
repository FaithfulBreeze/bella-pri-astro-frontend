import type { IAsset } from "./asset";
import type { ICategory } from "./category";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  link?: string;
  highlighted: boolean;
  mainAsset?: IAsset;
  assets: IAsset[];
  categories: ICategory[];
}
