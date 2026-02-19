import { Request, Response } from 'express';
import Province from '../models/Province';

export const getAllProvinces = async (req: Request, res: Response) => {
  try {
    const provinces = await Province.find();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener provincias', error });
  }
};

export const createProvince = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, heroImage } = req.body;
    const newProvince = new Province({ name, slug, description, heroImage });
    await newProvince.save();
    res.status(201).json(newProvince);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear provincia', error });
  }
};
