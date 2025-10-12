import ProductCard from "../../../elements/ProductCard/ProductCard";
import type { IProduct } from "../../../../interfaces/product";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} isSliderCard={false} />
      ))}
    </div>
  );
}
