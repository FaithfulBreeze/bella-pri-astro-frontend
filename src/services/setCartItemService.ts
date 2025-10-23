import type { IProduct } from "../interfaces/product";

export class setCartItemService {
  static async execute({
    product,
    quantity,
  }: {
    product: IProduct;
    quantity: number;
  }) {
    let cart = localStorage.getItem("cart");

    if (!cart) {
      cart = JSON.stringify({ products: [] });
      localStorage.setItem("cart", cart);
    }

    const parsedCart = JSON.parse(cart);

    const foundProductInCartIndex = parsedCart.products.findIndex(
      (p: { id: number; quantity: number }) => p.id === product.id
    );

    if (quantity === 0) {
      if (foundProductInCartIndex !== -1) {
        parsedCart.products.splice(foundProductInCartIndex, 1);
      }
    } else {
      if (foundProductInCartIndex !== -1) {
        parsedCart.products[foundProductInCartIndex].quantity = quantity;
      } else {
        parsedCart.products.push({ id: product.id, quantity });
      }
    }

    localStorage.setItem("cart", JSON.stringify(parsedCart));
  }
}
