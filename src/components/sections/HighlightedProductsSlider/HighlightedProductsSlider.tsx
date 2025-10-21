import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../../elements/ProductCard/ProductCard";
import { defaultSwiperConfig } from "../../../common/config/swiper";
import type { IProduct } from "../../../interfaces/product";
import { GetHighlightedProductsService } from "../../../services/getHighlightedProductsService";

export default function HighlightedProductsSlider({
  classname,
}: {
  classname?: string;
}) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    GetHighlightedProductsService.execute().then((products) =>
      setProducts(products)
    );
  }, []);

  return (
    <div id="highlights" className={`block mx-auto max-w-[1480px] px-7 ${classname}`}>
      <Swiper {...defaultSwiperConfig}>
        {products.map((product) => (
          <SwiperSlide key={product.id} className="overflow-hidden">
            <ProductCard {...product} isSliderCard={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
