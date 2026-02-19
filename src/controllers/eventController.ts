import { Request, Response } from 'express';
import * as eventService from '../services/eventService';
import { IEvent } from '../models/Event';


// Obtener todos los eventos (con filtros opcionales)
export const getEvents = async (req: Request, res: Response) => {
  try {
    const { province, category } = req.query;
    const filter: any = {};

    if (province) filter.province = province;
    if (category) filter.category = category;

    const events = await eventService.getAllEvents(filter);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
};

// Obtener un evento por ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const event = await eventService.getEventById(id);

    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el evento' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, province, category } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = req.file.filename; // Solo el nombre del archivo, ya que usaremos local storage estático
    }

    const eventData: Partial<IEvent> = { 
      title, 
      description, 
      date, 
      location,
      province,
      category,
      imageUrl
    };
    
    const savedEvent = await eventService.createEvent(eventData);
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear evento', error });
  }
};

// Actualizar un evento
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { title, description, date, location, province, category } = req.body;
    let updateData: Partial<IEvent> = { title, description, date, location, province, category };

    if (req.file) {
      updateData.imageUrl = req.file.filename;
    }

    const updatedEvent = await eventService.updateEvent(id, updateData);

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar evento' });
  }
};

// Eliminar un evento
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const deletedEvent = await eventService.deleteEvent(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar evento' });
  }
};
