// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Vehicle } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import error from "next/error";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Vehicle[] | Vehicle | error | { message: string }>
) {
  try {
    if (req.method === "GET") {
      const vehicles = await prisma.vehicle.findMany();
      return res.status(200).json(vehicles);
    }

    if (req.method === "POST") {
      const { name, make, model, photo, price, year } = req.body;
      const vehicle = await prisma.vehicle.create({
        data: {
          name,
          make,
          model,
          photo,
          price,
          year,
        },
      });
      return res.status(201).json(vehicle); // Wrap vehicle inside an array
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      const vehicle = await prisma.vehicle.delete({
        where: {
          id,
        },
      });
      return res.status(200).json(vehicle);
    }

    if (req.method === "PUT") {
      const { id, name, make, model, photo, price, year } = req.body;
      const vehicle = await prisma.vehicle.update({
        where: {
          id,
        },
        data: {
          name,
          make,
          model,
          photo,
          price,
          year,
          updatedAt: new Date(),
        },
      });
      return res.status(200).json(vehicle);
    }
  } catch (error) {
    res.status(500).json(error as error);
  }
}
