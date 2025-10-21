import type { IProduct } from "../interfaces/product";

interface ResponseProps extends IProduct {}

export class GetProductService {
  static async execute({ id }: { id: string }) {
    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/products/${id}`
    );
    const data: ResponseProps = await response.json();
    return data as IProduct;
  }
}
