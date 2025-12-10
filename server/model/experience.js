import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: '',
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    default: 'Present',
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['work', 'project'],
    default: 'work',
  },
  technologies: {
    type: [String],
    default: [],
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Experience = mongoose.model('Experience', ExperienceSchema);
export default Experience;

