import { useState } from "react";
import type { IProduct } from "../../../interfaces/product";
import Modal from "../Modal/Modal";
import { setCartItemService } from "../../../services/setCartItemService";
import { GetProductQuantityInCartService } from "../../../services/getProductQuantityInCartService";

export interface Props {
  product: IProduct;
}

export default function PriceCard({ product }: Props) {
  const quantityInCart = GetProductQuantityInCartService.execute({
    productId: product.id,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(quantityInCart || 1);

  const whatsappLink = new URL(import.meta.env.PUBLIC_WHATSAPP_LINK);
  whatsappLink.searchParams.append(
    "text",
    `Olá! Gostaria de comprar o produto: ${product.name}!`
  );

  const isOutOfStock = product.quantity === 0;
  const disabledClassName = "opacity-50 cursor-not-allowed";

  return (
    <div className="h-full">
      {product.quantity > 0 && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            setCartItemService.execute({ product, quantity: selectedQuantity });
          }}
        >
          <div className="bg-white p-6 rounded-lg">
            <p className="text-gray-700 text-center text-xl mb-10">
              Selecione a quantidade
            </p>

            <div className="w-full flex justify-center items-center gap-4 mb-4">
              <button
                onClick={() =>
                  setSelectedQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                }
                className="px-2 py-1 bg-pink-100 text-primary rounded-lg hover:bg-pink-200 transition"
              >
                -
              </button>

              <span className="text-xl font-bold">{selectedQuantity}</span>

              <button
                onClick={() =>
                  setSelectedQuantity((prev) =>
                    prev < product.quantity ? prev + 1 : prev
                  )
                }
                className="px-2 py-1 bg-pink-100 text-primary rounded-lg hover:bg-pink-200 transition"
              >
                +
              </button>
            </div>
            <p className="mb-4 text-center text-sm text-gray-700/70">{`${
              product.quantity
            } unidade${product.quantity !== 1 ? "s" : ""} ${
              product.quantity > 1 ? "disponíveis" : "disponível"
            }
            `}</p>

            <p className="mb-4 text-center text-sm text-gray-700/70">
              Seu carrinho terá {selectedQuantity}{" "}
              {selectedQuantity > 1 ? "unidades" : "unidade"} desse produto!
            </p>
          </div>
        </Modal>
      )}
      <div className="p-6 h-full flex flex-col justify-center bg-white rounded-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            {product.name}
          </h1>
          <p className="text-2xl font-bold">
            {product.price
              ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.price / 100)
              : null}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <p
            className={`${
              isOutOfStock
                ? "text-red-600 bg-red-500/45 rounded-lg px-4 w-fit "
                : "text-gray-600"
            } text-lg`}
          >
            {isOutOfStock
              ? "Produto indisponível no momento"
              : `${product.quantity} unidade${
                  product.quantity !== 1 ? "s" : ""
                } ${product.quantity > 1 ? "disponíveis" : "disponível"}
           `}
          </p>

          {product.categories?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-sm text-primary bg-pink-100 px-2 py-0.5 rounded-full"
                >
                  {cat.label}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <button
            type="button"
            disabled={isOutOfStock}
            className={`w-full cursor-pointer bg-primary hover:bg-primary/95 text-white font-medium py-3 rounded-lg transition ${
              isOutOfStock ? disabledClassName : ""
            }`}
            onClick={() => setIsOpen(true)}
          >
            Adicionar ao carrinho
          </button>

          <a
            href={isOutOfStock ? "" : whatsappLink.href}
            target={isOutOfStock ? "#" : "_blank"}
            onClick={(e) => {
              if (isOutOfStock) e.preventDefault();
            }}
            className={`w-full block text-center bg-primary hover:bg-primary/95 text-white font-medium py-3 rounded-lg transition ${
              isOutOfStock ? disabledClassName : ""
            }`}
          >
            Comprar pelo Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
}
