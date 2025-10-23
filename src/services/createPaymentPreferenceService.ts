import type { ICheckoutFormPayer } from "../interfaces/checkout-form-payer";
import type { IProduct } from "../interfaces/product";

interface ResponseProps {
  init_point: string;
  sandbox_init_point: string;
}

interface InputProps {
  payer: ICheckoutFormPayer;
  cartSummary: { product: IProduct; quantity: number }[];
}

export class CreatePaymentPreferenceService {
  static async execute({ payer, cartSummary }: InputProps) {
    const products: Pick<IProduct, "name" | "price" | "quantity" | "id">[] = [];

    for (let cartItem of cartSummary) {
      const { product, quantity } = cartItem;
      products.push({
        id: product.id,
        name: product.name,
        price: product.price / 100,
        quantity,
      });
    }

    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/payments`,
      {
        method: "POST",
        body: JSON.stringify({
          products,
          payer,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: ResponseProps = await response.json();

    return data;
  }
}
