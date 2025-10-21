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
      cart = JSON.stringify({});
      localStorage.setItem("cart", cart);
    }

    const parsedCart = JSON.parse(cart);

    if (parsedCart[product.id]) {
      parsedCart[product.id].quantity += quantity;
    } else {
      parsedCart[product.id] = { product, quantity };
    }

    localStorage.setItem("cart", JSON.stringify(parsedCart));
  }
}
