import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    /** preciso informar pelo menos os campos principais */
    content: {
      // posso usar tipos primitivos do js
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Notification', NotificationSchema);
