import mongoose, { Schema, Document } from 'mongoose';

export interface IProvince extends Document {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
}

const ProvinceSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  heroImage: { type: String, required: true } // URL to image
});

export default mongoose.model<IProvince>('Province', ProvinceSchema);
