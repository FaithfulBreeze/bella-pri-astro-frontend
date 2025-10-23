import { useState } from "react";

export function CheckoutForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    payer: {
      name: "",
      surname: "",
      email: "",
      phone: {
        area_code: "",
        number: "",
      },
      address: {
        zip_code: "",
        street_name: "",
        street_number: "",
        neighborhood: "",
        city: "",
        federal_unit: "",
      },
    },
  });

  function handleChange(path: string, value: string) {
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let ref: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return updated;
    });
  }

  // --- formatadores automáticos ---
  function handleFormattedChange(path: string, value: string) {
    if (path === "payer.address.zip_code") {
      value = value.replace(/\D/g, "").slice(0, 8);
      if (value.length > 5)
        value = value.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
    }

    if (path === "payer.phone.area_code") {
      value = value.replace(/\D/g, "").slice(0, 2);
    }

    if (path === "payer.phone.number") {
      value = value.replace(/\D/g, "").slice(0, 9);
      if (value.length > 5)
        value = value.replace(/^(\d{5})(\d{1,4})$/, "$1-$2");
    }

    if (path === "payer.address.federal_unit") {
      value = value.toUpperCase().slice(0, 2);
    }

    handleChange(path, value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // validações simples antes de enviar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.payer.email)) {
      alert("Digite um email válido");
      return;
    }

    if (formData.payer.address.zip_code.length < 9) {
      alert("CEP inválido");
      return;
    }

    formData.payer.phone.number = formData.payer.phone.number
      .split("-")
      .join("");

    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-2xl shadow-md"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Dados do comprador
      </h3>

      {/* Nome e sobrenome */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Nome</label>
          <input
            placeholder="Ex: João"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            value={formData.payer.name}
            onChange={(e) => handleChange("payer.name", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Sobrenome</label>
          <input
            placeholder="Ex: Silva"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            value={formData.payer.surname}
            onChange={(e) => handleChange("payer.surname", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
          placeholder="exemplo@email.com"
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          value={formData.payer.email}
          onChange={(e) => handleChange("payer.email", e.target.value)}
          required
        />
      </div>

      {/* Telefone */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">DDD</label>
          <input
            placeholder="11"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none text-center"
            value={formData.payer.phone.area_code}
            onChange={(e) =>
              handleFormattedChange("payer.phone.area_code", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Telefone</label>
          <input
            placeholder="99999-9999"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            value={formData.payer.phone.number}
            onChange={(e) =>
              handleFormattedChange("payer.phone.number", e.target.value)
            }
            required
          />
        </div>
      </div>

      {/* Endereço */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">CEP</label>
        <input
          placeholder="12345-678"
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          value={formData.payer.address.zip_code}
          onChange={(e) =>
            handleFormattedChange("payer.address.zip_code", e.target.value)
          }
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Rua</label>
          <input
            placeholder="Av. Paulista"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            value={formData.payer.address.street_name}
            onChange={(e) =>
              handleChange("payer.address.street_name", e.target.value)
            }
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Número</label>
          <input
            placeholder="1000"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none text-center"
            value={formData.payer.address.street_number}
            onChange={(e) =>
              handleChange("payer.address.street_number", e.target.value)
            }
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Bairro</label>
        <input
          placeholder="Bela Vista"
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          value={formData.payer.address.neighborhood}
          onChange={(e) =>
            handleChange("payer.address.neighborhood", e.target.value)
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Cidade</label>
          <input
            placeholder="São Paulo"
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            value={formData.payer.address.city}
            onChange={(e) => handleChange("payer.address.city", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">UF</label>
          <input
            placeholder="SP"
            maxLength={2}
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none text-center uppercase"
            value={formData.payer.address.federal_unit}
            onChange={(e) =>
              handleFormattedChange(
                "payer.address.federal_unit",
                e.target.value
              )
            }
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 bg-primary hover:bg-primary/95 text-white rounded-lg font-semibold transition-all"
      >
        Continuar
      </button>
    </form>
  );
}
