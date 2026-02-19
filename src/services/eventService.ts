import Event, { IEvent } from '../models/Event';

export const getAllEvents = async (filter: any = {}) => {
  return await Event.find(filter).sort({ date: 1 });
};

export const getEventById = async (id: string) => {
  return await Event.findById(id);
};

export const createEvent = async (eventData: Partial<IEvent>) => {
  const newEvent = new Event(eventData);
  return await newEvent.save();
};

export const updateEvent = async (id: string, eventData: Partial<IEvent>) => {
  return await Event.findByIdAndUpdate(id, eventData, { new: true });
};

export const deleteEvent = async (id: string) => {
  return await Event.findByIdAndDelete(id);
};
