import { Schema, model, models } from 'mongoose';

const CCADContentSchema = new Schema({
  section: {
    type: String,
    required: true,
    enum: ['about', 'coreValues', 'keyPrograms', 'achievements', 'impact', 'recognition'],
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String], // Array of strings for lists
    required: true,
  },
  impactStats: {
    artistsTrained: { type: Number, default: 1000 },
    culturalSites: { type: Number, default: 50 },
    communities: { type: Number, default: 25 },
    yearsOfService: { type: Number, default: 5 },
  },
  recognition: {
    type: [String], // Array of recognition items
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const CCADContent = models.CCADContent || model('CCADContent', CCADContentSchema);

export default CCADContent; 