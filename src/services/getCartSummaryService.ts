import type { IProduct } from "../interfaces/product";
import { GetProductService } from "./getProductService";

export class GetCartSummaryService {
  static async execute(): Promise<{ product: IProduct; quantity: number }[]> {
    const cart = JSON.parse(
      localStorage.getItem("cart") ?? JSON.stringify({ products: [] })
    );

    const mappedProducts = await Promise.all(cart.products.map(
      async ({ id, quantity }: { id: number; quantity: number }) => ({
        product: await GetProductService.execute({ id: id.toString() }),
        quantity,
      })
    ));
    
    return mappedProducts
  }
}
