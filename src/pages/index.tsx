/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Vehicle from "@/interface/vehicle";
import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";

import Style from "./style.module.css";
import { DialogDemo } from "@/components/module/vehicleForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await fetch("/api/vehicle");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return (
    <main
      className={`bg-[#09090b] h-screen max-h-screen overflow-auto relative ${inter.className} ${Style.scrollBar}`}
    >
      <h1 className="text-white text-4xl font-bold text-center pt-10">
        Vehículos
      </h1>
      <div className="flex flex-row gap-4 p-4">
        {data?.map((vehicle: Vehicle) => (
          <Card key={vehicle.id} className="p-4 bg-[#1e1e1e] text-white w-fit">
            <img
              src={vehicle.photo}
              alt={vehicle.name}
              width={300}
              height={300}
              className={Style.images}
            />
            <p>Nombre: {vehicle.name}</p>
            <p>Marca: {vehicle.make}</p>
            <p>Modelo: {vehicle.model}</p>
            <p>Año: {vehicle.year}</p>
            {/* Add more properties here */}
          </Card>
        ))}
      </div>

      <DialogDemo />

    </main>
  );
}
