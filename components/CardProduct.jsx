"use client";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useRef } from "react";

const CardProduct = ({ item }) => {
  const copyText = () => {
    // Copia el texto al portapapeles
    navigator.clipboard
      .writeText(item.name)
      .then(function () {
        console.log("Texto copiado al portapapeles: " + item.name);
      })
      .catch(function (err) {
        console.error("Error al copiar el texto: ", err);
      });
  };

  return (
    <Card
      shadow="sm"
      key={item.id}
      isPressable
      onPress={() => {
        console.log("item pressed!");
        copyText();
      }}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={item.name}
          className="w-full object-cover h-[140px]"
          src={item.img}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <p className="font-semibold">{item.name}</p>
        <p className="font-bold text-black bg-slate-200 p-2 rounded-full text-lg">
          {item.price}
        </p>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
