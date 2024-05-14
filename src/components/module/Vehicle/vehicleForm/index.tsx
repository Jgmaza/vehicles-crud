import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

type VehicleForm = {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  photo: string;
};

interface VehicleFormProps {
  onSubmit: any;
  action: "create" | "update";
  data?: VehicleForm | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export function DialogDemo(props: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VehicleForm>();

  useEffect(() => {
    if (props.data) {
      setValue("id", props.data.id);
      setValue("name", props.data.name);
      setValue("make", props.data.make);
      setValue("model", props.data.model);
      setValue("year", props.data.year);
      setValue("price", props.data.price);
      setValue("photo", props.data.photo);
    }
  }, [props.data]);

  const mutation = useMutation({
    mutationFn: async (data: VehicleForm) => {
      const response = await fetch("/api/vehicle", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          make: data.make,
          model: data.model,
          year: parseInt(data.year + ""),
          price: parseInt(data.price + ""),
          photo: data.photo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 201) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
    onSuccess: () => {
      props.onSubmit();
      props.setOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async (data: VehicleForm) => {
      const response = await fetch("/api/vehicle", {
        method: "PUT",
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          make: data.make,
          model: data.model,
          year: parseInt(data.year + ""),
          price: parseInt(data.price + ""),
          photo: data.photo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
    onSuccess: () => {
      props.onSubmit();
      props.setOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<VehicleForm> = (data) => {
    if (props.action === "create") {
      mutation.mutate(data);
    } else {
      mutationUpdate.mutate(data);
    }
  };
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1e1e1e] text-white fixed bottom-5 right-5 rounded-full h-16 w-16 flex justify-center items-center text-lg">
          <i className="fas fa-plus font"></i>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1e1e1e]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {props.action === "create"
              ? "Crear vehículo"
              : "Actualizar vehículo"}
          </DialogTitle>
          <DialogDescription>
            {props.action === "create"
              ? "Complete el formulario para crear un nuevo vehículo"
              : "Complete el formulario para actualizar un vehículo"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[#f0f0f0]">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Nombre del vehículo"
              className="col-span-3 bg-[#2b2b2b] text-white"
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="make" className="text-right text-[#f0f0f0]">
              Marca
            </Label>
            <Input
              id="make"
              placeholder="Marca del vehículo"
              className="col-span-3 bg-[#2b2b2b] text-white"
              {...register("make", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right text-[#f0f0f0]">
              Modelo
            </Label>
            <Input
              id="model"
              placeholder="Modelo del vehículo"
              className="col-span-3 bg-[#2b2b2b] text-white"
              {...register("model", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right text-[#f0f0f0]">
              Año
            </Label>
            <Input
              id="year"
              type="number"
              placeholder="Año del vehículo"
              className="col-span-3 bg-[#2b2b2b] text-white"
              {...register("year", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right text-[#f0f0f0]">
              Precio
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Precio del vehículo"
              className="col-span-3 bg-[#2b2b2b] text-white"
              {...register("price", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right text-[#f0f0f0]">
              Link de la imagen
            </Label>
            <Input
              id="photo"
              type="string"
              placeholder="Link de la imagen del vehículo"
              className="col-span-3 bg-[#2b2b2b] text-white"
              defaultValue="https://ddools.imgix.net/cars/base.png?w=600&mark-align=center,middle&mark=https%3A%2F%2Fddools.imgix.net%2Fcars%2Fpaint.png%3Fw%3D600%26bri%3D-18%26con%3D26%26monochrome%3D000000"
              {...register("photo", { required: true })}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-[#2b2b2b] text-white"
              variant={"default"}
            >
              Cerrar
            </Button>
          </DialogClose>
          <Button
            variant="secondary"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          >
            {mutation.isPending || mutationUpdate.isPending ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
              </>
            ) : props.action === "create" ? (
              "Crear"
            ) : (
              "Actualizar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
