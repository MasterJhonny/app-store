"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    supplier: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, quantity, category, supplier, img } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("price", price);
    formDataToSend.append("quantity", quantity);
    formDataToSend.append("category", category);
    formDataToSend.append("supplier", supplier);
    if (img) {
      formDataToSend.append("img", img);
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsLoading(false);
        alert("Producto registrado exitosamente");
        setFormData({
          name: "",
          price: "",
          quantity: "",
          category: "",
          supplier: "",
          img: null,
        });
        setSelectedFile(null);
        router.push("/");
      } else {
        alert("Error al registrar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-items-center items-center">
      <h1 className="font-bold text-black py-3 text-lg">
        Registrar Nuevo Producto
      </h1>
      <div className="w-96 p-6 pt-7 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label className="font-semibold text-sm">Detalle:</label>
            <input
              className="border border-gray-400 rounded-md py-1 px-2 font-semibold"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="font-semibold text-sm">Precio:</label>
            <input
              className="border border-gray-400 rounded-md py-1 px-2 font-semibold"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="font-semibold text-sm">Cantidad:</label>
            <input
              className="border border-gray-400 rounded-md py-1 px-2 font-semibold"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="font-semibold text-sm">Categoría:</label>
            <input
              className="border border-gray-400 rounded-md py-1 px-2 font-semibold"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="font-semibold text-sm">Proveedor:</label>
            <input
              className="border border-gray-400 rounded-md py-1 px-2 font-semibold"
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="font-semibold text-sm">Imagen:</label>
            <input
              className="border border-gray-400 rounded-md py-1 px-2 font-semibold"
              type="file"
              accept=".png,.jpg,.jpeg"
              name="img"
              onChange={handleFileChange}
              required
            />
          </div>
          {selectedFile && (
            <div className="flex flex-col mb-3">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="imagen producto"
                className="w-16 h-16 rounded-full"
              />
            </div>
          )}
          <Button
            type="submit"
            color="secondary"
            isLoading={isLoading}
            spinner={
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            {isLoading ? "Cargando..." : "Registrar Producto"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
