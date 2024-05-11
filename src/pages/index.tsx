/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Vehicle from "@/interface/vehicle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";

import Style from "./style.module.css";
import { DialogDemo } from "@/components/module/Vehicle/vehicleForm";
import { useEffect, useState } from "react";
import { AlertDialogDemo } from "@/components/module/Vehicle/alertDeleteVehicle";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, refetch } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await fetch("/api/vehicle");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<"create" | "update">("create");
  const [vehicleSelected, setVehicleSelected] = useState<Vehicle | null>(null);


  useEffect(() => {
    if (open === false) {
      setVehicleSelected(null);
      setAction("create");
    }
  }, [open]);

  return (
    <main
      className={`bg-[#09090b] h-screen max-h-screen overflow-auto relative ${inter.className} ${Style.scrollBar}`}
    >
      <h1 className="text-white text-4xl font-bold text-center pt-10">
        Vehículos
      </h1>
      <div className="flex flex-row flex-wrap gap-4 p-6 justify-center">
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
            <p>Precio: {vehicle.price}</p>

            <div className="flex justify-between items-end">
              <Button
                variant="outline"
                className="mt-4 text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  setVehicleSelected(vehicle);
                  setAction("update");
                  setOpen(true);
                }}
              >
                <i className="fas fa-edit"></i>
              </Button>
              <AlertDialogDemo id={vehicle.id} onConfirm={refetch} />
            </div>
          </Card>
        ))}
      </div>

      <DialogDemo
        onSubmit={refetch}
        open={open}
        setOpen={setOpen}
        action={action}
        data={vehicleSelected}
      />
    </main>
  );
}
