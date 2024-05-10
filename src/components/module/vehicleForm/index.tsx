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

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#1e1e1e] text-white fixed bottom-5 right-5 rounded-full h-16 w-16 flex justify-center items-center text-lg">
          <i className="fas fa-plus font"></i>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1e1e1e]">
        <DialogHeader>
          <DialogTitle className="text-white">Crear usuario</DialogTitle>
          <DialogDescription>
            Registro de vehículos en la base de datos
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-[#2b2b2b] text-white" variant={"destructive"}>
            Cancelar
          </Button>
          <Button className="bg-[#2b2b2b] text-white" variant={"default"}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
