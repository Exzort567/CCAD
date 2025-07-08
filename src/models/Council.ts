import { Schema, model, models } from 'mongoose';

const CouncilSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Honorary Chairperson', 'Executive Board', 'Section Head', 'Committee Heads & Members'],
  },
  committee: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Council = models.Council || model('Council', CouncilSchema);

export default Council; 