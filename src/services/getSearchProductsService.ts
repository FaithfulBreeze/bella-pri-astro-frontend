import type { IProduct } from "../interfaces/product";

interface ResponseProps {
  products: IProduct[];
  count: number;
}

export class GetSearchProductsService {
  static async execute({
    search,
    skip,
    limit,
    categoryIds,
    orderByPrice
  }: {
    search?: string;
    skip?: number;
    limit?: number;
    categoryIds?: number[];
    orderByPrice?: "ASC" | "DESC";
  }) {
    const params = new URLSearchParams();

    if (limit !== undefined) params.append("limit", String(limit));
    if (skip !== undefined) params.append("skip", String(skip));
    if (categoryIds && categoryIds.length > 0) {
      params.append("categoryIds", `[${categoryIds.join(",")}]`);
    }
    if (orderByPrice) {
      params.append("orderByPrice", orderByPrice);
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";

    const response = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/products${
        search ? `/search/${search}` : ""
      }${queryString}`
    );

    const data: ResponseProps = await response.json();
    return data;
  }
}
