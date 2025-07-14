import { Schema, model, models } from 'mongoose';

const BannerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Banner = models.Banner || model('Banner', BannerSchema);

export default Banner; 