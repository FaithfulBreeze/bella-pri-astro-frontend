import { useState, useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { GetCartSummaryService } from "../../../services/getCartSummaryService";
import { CreatePaymentPreferenceService } from "../../../services/createPaymentPreferenceService";
import Modal from "../Modal/Modal";
import { CheckoutForm } from "../CheckoutForm/CheckoutForm";
import type { ICheckoutFormPayer } from "../../../interfaces/checkout-form-payer";
import type { IProduct } from "../../../interfaces/product";
import { setCartItemService } from "../../../services/setCartItemService";

const ITEMS_PER_PAGE = 5;

export default function CartSummaryCard() {
  const [cartSummary, setCartSummary] = useState<
    { product: IProduct; quantity: number }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    initMercadoPago(import.meta.env.PUBLIC_MP_KEY);
  }, []);

  useEffect(() => {
    GetCartSummaryService.execute()
      .then(setCartSummary)
      .catch((err) => console.error("Failed to load cart:", err));
  }, []);

  const calculateTotal = () =>
    cartSummary.reduce(
      (acc, item) => acc + (item.product.price * item.quantity) / 100,
      0
    );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handlePayment = async ({ payer }: { payer: ICheckoutFormPayer }) => {
    try {
      setIsLoading(true);
      const { init_point, sandbox_init_point } =
        await CreatePaymentPreferenceService.execute({ cartSummary, payer });

      const redirectUrl =
        import.meta.env.MODE === "production" ? init_point : sandbox_init_point;

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Payment initialization failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (product: IProduct, newQuantity: number) => {
    setCartItemService.execute({ product, quantity: newQuantity });
    setCartSummary((prev) =>
      prev
        .map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const anyItemExceedsStock = cartSummary.some(
    (item) => item.quantity > item.product.quantity
  );

  if (!cartSummary || cartSummary.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600 font-medium">Seu carrinho está vazio</p>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(cartSummary.length / ITEMS_PER_PAGE);
  const paginatedItems = cartSummary.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <Modal
        hideButtons
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {}}
      >
        <CheckoutForm onSubmit={handlePayment} />
      </Modal>

      <h2 className="text-xl font-semibold text-gray-800 text-center sm:text-left">
        Resumo do Carrinho
      </h2>

      <div className="flex flex-col gap-4">
        {paginatedItems.map(({ product, quantity }, i) => {
          const totalPrice = (product.price * quantity) / 100;
          const exceedsStock = quantity > product.quantity;

          return (
            <div
              key={product.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                paginatedItems.length - 1 !== i
                  ? "border-b border-gray-200"
                  : ""
              } pb-4`}
            >
              <img
                src={product.mainAsset?.src}
                alt={product.name}
                className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 flex flex-col min-w-0">
                <p className="font-medium text-gray-800">{product.name}</p>

                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(product, quantity - 1)}
                    disabled={quantity <= 0}
                    className="px-2 py-1 bg-pink-100 text-primary rounded-lg hover:bg-pink-200 transition"
                  >
                    -
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() => updateQuantity(product, quantity + 1)}
                    disabled={quantity >= product.quantity}
                    className="px-2 py-1 bg-pink-100 text-primary rounded-lg hover:bg-pink-200 transition"
                  >
                    +
                  </button>
                </div>

                {exceedsStock && (
                  <p className="text-red-500 text-sm mt-1">
                    Quantidade selecionada maior que o estoque disponível (
                    {product.quantity})
                  </p>
                )}
              </div>

              <p className="font-semibold text-gray-800 sm:ml-4">
                {formatCurrency(totalPrice)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-2">
          <button
            className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-center sm:text-base text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <span className="text-lg font-medium text-gray-800">Total</span>
        <span className="text-lg font-bold text-gray-900">
          {formatCurrency(calculateTotal())}
        </span>
      </div>

      <div>
        {anyItemExceedsStock && (
          <p className="text-red-500 text-sm mb-2">
            Ajuste a quantidade dos itens com estoque insuficiente para
            continuar.
          </p>
        )}
        <button
          type="button"
          disabled={isLoading || anyItemExceedsStock}
          className={`w-full cursor-pointer bg-primary hover:bg-primary/95 text-white font-medium py-3 rounded-lg transition ${
            isLoading || anyItemExceedsStock
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
          onClick={() => setIsOpen(true)}
        >
          {isLoading ? "Processando..." : "Pagar"}
        </button>
      </div>
    </div>
  );
}
