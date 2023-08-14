import { model, models, Schema, InferSchemaType } from "mongoose";

const noteSchema = new Schema({
  name: {
    type: String,
    required: [true, "note name is required"],
    unique: false,
    min: [1, "note name must have 1 char at least"],
    max: [30, "note must have under 30 chars"],
  },
  messages: {
    type: [
      {
        owner: {
          type: String,
          require: [true, "the owner of th message is required"],
          unique: false,
          trim: true,
        },
        body: {
          type: String,
          require: [true, "the body of the message is rquired"],
          unique: false,
          trim: true,
        },
      },
    ],
    unique: false,
  },
});

export type Note = InferSchemaType<typeof noteSchema>;
export interface NoteDocument extends Note {
  _id: string;
  __v: number;
}

const NoteModel = models["note"] ?? model<Note>("note", noteSchema, "notes");

export default NoteModel;
