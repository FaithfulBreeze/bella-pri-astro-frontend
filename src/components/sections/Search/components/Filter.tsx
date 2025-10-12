import { useEffect, useState, useRef } from "react";
import ProductCard from "../../../elements/ProductCard/ProductCard";
import type { IProduct } from "../../../../interfaces/product";
import { GetSearchProductsService } from "../../../../services/getSearchProductsService";
import { GetCategoriesService } from "../../../../services/getCategoriesService";
import type { ICategory } from "../../../../interfaces/category";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import OrderFilter from "./OrderFilter";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

interface FilterStateProps {
  products: IProduct[];
  categories: ICategory[];
  selectedCategoryIds: number[];
  search: string;
  count: number;
  currentPage: number;
  totalPages: number;
  skip: number;
  limit: number;
  orderByPrice: "ASC" | "DESC";
}

export default function Filter() {
  const [state, setState] = useState<FilterStateProps>({
    products: [],
    categories: [],
    selectedCategoryIds: [],
    search: "",
    count: 0,
    currentPage: 1,
    totalPages: 0,
    skip: 0,
    limit: 12,
    orderByPrice: "ASC",
  });

  const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setCategoryPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    GetCategoriesService.execute().then(({ categories }) => {
      setState((prev) => ({ ...prev, categories }));
    });
  }, []);

  useEffect(() => {
    GetSearchProductsService.execute({
      search: state.search,
      limit: state.limit,
      skip: state.skip,
      categoryIds: state.selectedCategoryIds,
      orderByPrice: state.orderByPrice,
    }).then(({ count, products }) => {
      const totalPages = Math.ceil(count / state.limit);
      const currentPage = state.limit ? state.skip / state.limit + 1 : 1;

      setState((prev) => ({
        ...prev,
        products,
        count,
        totalPages,
        currentPage,
      }));
    });
  }, [
    state.search,
    state.skip,
    state.limit,
    state.selectedCategoryIds,
    state.orderByPrice,
  ]);

  return (
    <>
      <SearchBar
        search={state.search}
        setSearch={(value) =>
          setState((prev) => ({ ...prev, search: value, skip: 0 }))
        }
      />

      <div className="flex flex-col gap-2 md:flex-row md:justify-between mt-4">
        <CategoryFilter
          categories={state.categories}
          selectedCategoryIds={state.selectedCategoryIds}
          setSelectedCategoryIds={(ids) =>
            setState((prev) => ({ ...prev, selectedCategoryIds: ids, skip: 0 }))
          }
        />
        <OrderFilter
          orderByPrice={state.orderByPrice}
          setOrderByPrice={(order) =>
            setState((prev) => ({ ...prev, orderByPrice: order, skip: 0 }))
          }
        />
      </div>

      <ProductGrid products={state.products} />

      <Pagination
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        onPrevious={() =>
          setState((prev) => ({ ...prev, skip: prev.skip - prev.limit }))
        }
        onNext={() =>
          setState((prev) => ({ ...prev, skip: prev.skip + prev.limit }))
        }
        disablePrevious={state.skip === 0}
        disableNext={state.skip + state.limit >= state.count}
      />
    </>
  );
}
