import { NoteDocument } from "@/models/note.model";
import { UserDocument } from "@/models/user.model";

export interface SuccessPostNoteResponse {
  message: string;
  note: NoteDocument;
  user: UserDocument;
}

export interface FailedPostNoteResponse {
  error: string;
}
