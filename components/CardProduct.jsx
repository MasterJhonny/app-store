"use client";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useRef } from "react";

const CardProduct = ({ item }) => {
  const copyText = () => {
    // Copia el texto al portapapeles
    navigator.clipboard
      .writeText(item.detail)
      .then(function () {
        console.log("Texto copiado al portapapeles: " + item.detail);
      })
      .catch(function (err) {
        console.error("Error al copiar el texto: ", err);
      });
  };

  return (
    <Card
      shadow="sm"
      key={item.detail}
      isPressable
      onPress={() => {
        console.log("item pressed!");
        copyText();
      }}
    >
      <CardBody className="overflow-visible p-0">
        <p className="font-bold p-2 rounded-full text-base text-center">
          Bs. {item.price}
        </p>
        <Image
          shadow="sm"
          radius="none"
          width="100%"
          alt={item.detail}
          className="w-full object-cover h-[140px]"
          src={item.image_url}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <p className="font-semibold">{item.detail}</p>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
