"use client";
import { useEffect, useState } from "react";
import CardProduct from "@/components/CardProduct";
import { Input } from "@nextui-org/input";
import AddButton from "@/components/AddButton";
import LoadingSpinner from "@/components/LoadingSpinner";

import { SearchIcon } from "@/components/icons";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const LoadProducts = async () => {
  const data = await fetch(`${API_BASE_URL}/products`);
  return await data.json();
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // state of search
  const [search, setSearch] = useState("");

  // expression regex and filter tasks
  const expre = new RegExp(search, "i");
  const searchName = products.filter((product) => expre.test(product.name));

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await LoadProducts();
      setIsLoading(false);
      console.log("🚀 ~ PageProducts ~ productsData:", productsData);
      setProducts(productsData);
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h2 className="text-center text-lg font-bold py-2">
        Catalogo de Productos
      </h2>
      {isLoading && <LoadingSpinner />}
      <div className="w-full py-2 pb-4 flex justify-center">
        <Input
          className="w-full max-w-md"
          placeholder="Buscar..."
          type="search"
          size="lg"
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          value={search}
          onValueChange={setSearch}
        />
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 py-2">
        {searchName.map((item) => (
          <CardProduct item={item} key={item.id} />
        ))}
      </div>
      <AddButton href="/products/new" />
    </>
  );
}
