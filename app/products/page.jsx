"use client";

import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const LoadProducts = async () => {
  const data = await fetch(`${API_BASE_URL}/products`);
  return await data.json();
};

const PageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await LoadProducts();
      console.log("🚀 ~ PageProducts ~ productsData:", productsData);
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h2 className="text-center text-lg font-bold py-2">
        Catalogo de productos
      </h2>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 py-2">
        {products.map((item) => (
          <CardProduct item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default PageProducts;
