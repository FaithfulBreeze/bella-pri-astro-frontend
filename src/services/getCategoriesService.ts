import type { ICategory } from "../interfaces/category";

interface ResponseProps {
  categories: ICategory[];
  count: number;
}

export class GetCategoriesService {
  static async execute() {
    const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/categories`);
    const data: ResponseProps = await response.json();
    return data;
  }
}
