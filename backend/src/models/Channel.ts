// types
import type { Channel } from "@api";
// libraries
import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

const channelSchema = new Schema<Omit<Channel, "id"> & { _id: string }>({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  favorite_position: { type: null || Number, default: null },
  image_url: { type: String, required: true },
  name: { type: String, required: true },
  uri: { type: String, required: true },
});

export default model("channel", channelSchema);
