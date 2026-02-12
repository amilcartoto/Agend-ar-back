import { Request, Response } from 'express';
import Event from '../models/Event';

// aca debe ir los controladores de los eventos 


export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = req.file.filename; // Solo el nombre del archivo, ya que usaremos local storage estático
    }

    const newEvent = new Event({ 
      title, 
      description, 
      date, 
      location,
      imageUrl
    });
    
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear evento' });
  }
};
