import mongoose from 'mongoose';

const airportAssistanceSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    airportName: {
      type: String,
      required: [true, 'Airport name is required'],
      trim: true,
    },
    flightNumber: {
      type: String,
      required: [true, 'Flight number is required'],
      trim: true,
      uppercase: true,
    },
    direction: {
      type: String,
      required: true,
      enum: ['departure', 'arrival'],
    },
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required'],
    },
    passengers: {
      type: Number,
      required: true,
      min: [1, 'At least 1 passenger required'],
      default: 1,
    },
    assistanceTypes: {
      type: [String],
      required: true,
    },
    specialRequests: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      required: true,
      default: 'Airport Assistance',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt automatically add ho jayenge
  }
);

const AirportAssistance = mongoose.models.AirportAssistance || mongoose.model('AirportAssistance', airportAssistanceSchema);

export default AirportAssistance;