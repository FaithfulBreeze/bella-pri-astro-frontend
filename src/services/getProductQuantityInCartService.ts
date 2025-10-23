export class GetProductQuantityInCartService {
  static execute({ productId }: { productId: number }): number {
    const cart = JSON.parse(
      localStorage.getItem("cart") ?? JSON.stringify({ products: [] })
    );

    const foundProduct = cart.products.find(
      (p: { id: number; quantity: number }) => p.id === productId
    );

    return foundProduct?.quantity || 0;
  }
}
