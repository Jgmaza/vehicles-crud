import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

interface AlertDialogProps {
  id: number;
  onConfirm: any;
}

export function AlertDialogDemo(props: AlertDialogProps) {
  const mutationDelete = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch("/api/vehicle", {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
    },

    onSuccess: () => {
      console.log("Vehicle deleted");

      props.onConfirm();
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <i className="fas fa-trash-alt"></i>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#1e1e1e]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Estás seguro de eliminar este vehículo?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            Esta acción se eliminará de forma permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#1e1e1e] text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => mutationDelete.mutate(props.id)}
          >
            {mutationDelete.isPending ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Eliminar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
