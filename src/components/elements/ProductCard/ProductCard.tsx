import type { IProduct } from "../../../interfaces/product";

export interface Props extends IProduct {
  isSliderCard: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  mainAsset,
  categories,
  isSliderCard,
}: Props) {
  const formattedPrice = price
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price / 100)
    : null;

  if (!mainAsset?.src) return null;

  if (isSliderCard) {
    return (
      <a
        href={`/product/${id}`}
        className="relative w-full h-full shadow-lg overflow-hidden transition-transform duration-300 group cursor-pointer"
      >
        <img
          src={mainAsset.src}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-0 w-full bg-white backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex flex-col gap-1">
            <h3 className="text-md font-semibold text-gray-800 truncate">
              {name}
            </h3>

            <div className="flex flex-wrap gap-1">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="text-sm text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full"
                >
                  {category.label}
                </span>
              ))}
            </div>

            {formattedPrice && (
              <p className="text-md font-bold text-gray-900">
                {formattedPrice}
              </p>
            )}
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={`/product/${id}`}
      className="relative w-full h-full bg-white shadow-md rounded-md overflow-hidden transition-transform duration-300 group cursor-pointer hover:scale-105"
    >
      <div className="relative w-full h-56">
        <img
          src={mainAsset.src}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>

        <div className="flex flex-wrap gap-1">
          {categories.map((category, index) => (
            <span
              key={index}
              className="text-sm text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full"
            >
              {category.label}
            </span>
          ))}
        </div>

        {formattedPrice && (
          <p className="text-md font-bold text-gray-900">{formattedPrice}</p>
        )}
      </div>
    </a>
  );
}
