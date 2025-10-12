import type { IProduct } from "../interfaces/product";

interface ResponseProps {
  products: IProduct[];
  count: number;
}

export class GetHighlightedProductsService {
  static async execute() {
    const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/products/highlighted`);
    const data: ResponseProps = await response.json();
    return data.products;
  }
}
