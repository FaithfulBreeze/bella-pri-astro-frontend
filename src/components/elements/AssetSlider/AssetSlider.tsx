import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import type { IAsset } from "../../../interfaces/asset";
import { productPageSwiperConfig } from "../../../common/config/swiper";
import "swiper/css";
import "swiper/css/navigation";

interface AssetSliderProps {
  assets: IAsset[];
}

export default function AssetSlider({ assets }: AssetSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef<any>(null);

  const handleThumbnailClick = (index: number) => {
    if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
      mainSwiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div >
        <Swiper
          {...productPageSwiperConfig}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          ref={mainSwiperRef}
          aria-label="Asset slider"
        >
          {assets.map((asset) => (
            <SwiperSlide key={asset.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={asset.src}
                  alt={asset.name}
                  className="mx-auto object-contain max-h-[70dvh] rounded-xl"
                  loading="lazy"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className={`grid gap-2 ${
          assets.length === 1
            ? "grid-cols-1"
            : assets.length === 2
            ? "grid-cols-2"
            : "grid-cols-4 sm:grid-cols-6"
        }`}
      >
        {assets.map((asset, index) => (
          <motion.button
            key={asset.id}
            onClick={() => handleThumbnailClick(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full h-20 rounded-lg overflow-hidden border-2 transition-all duration-200
        ${
          index === activeIndex ? "border-primary shadow-md" : "border-gray-200"
        }`}
          >
            <img
              src={asset.src}
              alt={asset.name}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
