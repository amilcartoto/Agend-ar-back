import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  province: string;
  category: string;
  imageUrl?: string;
  price: number;
  user: mongoose.Schema.Types.ObjectId;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  province: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

export default mongoose.model<IEvent>('Event', EventSchema);
