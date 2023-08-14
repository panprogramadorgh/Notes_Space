import { NextRequest, NextResponse } from "next/server";
import { findUser, createNote, updateUser, findNote } from "@/utils/crud";
import { NoteDocument } from "@/models/note.model";
import { UserDocument } from "@/models/user.model";
import { verifyAuth } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export async function GET(request: NextRequest) {
  // connecting to database
  if ((await connectDB()) === false) {
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
  }

  const token = request.cookies.get("token")?.value;
  const verifiedToken =
    token && (await verifyAuth(token).catch((error) => console.error(error)));

  if (!verifiedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user: UserDocument = await findUser({ _id: verifiedToken.userId });
  if (!user) {
    const response = NextResponse.json({
      error: "Your session expired",
      sessionExpired: true,
    });
    response.cookies.delete("token");
    return response;
  }
  try {
    const notes: NoteDocument[] = [];
    for (const eachNote in user.notes) {
      notes[eachNote] = await findNote({ _id: user.notes[eachNote] });
    }
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Could not find some note" },
        { status: 400 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  // connecting to database
  if ((await connectDB()) === false) {
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
  }

  const token = request.cookies.get("token")?.value;
  const verifiedToken =
    token && (await verifyAuth(token).catch((error) => console.error(error)));

  if (!verifiedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = (await findUser({ _id: verifiedToken.userId })) as UserDocument;
  if (!user) {
    const response = NextResponse.json({
      error: "Your session expired",
      sessionExpired: true,
    });
    response.cookies.delete("token");
    return response;
  }

  const { name } = await request.json();
  try {
    if (!name || name.length < 1 || name.length > 30) {
      throw new Error("The note name must have a length between 1 and 30");
    }

    /* Puede causar problemas cuando se busca el note que dice tener el usurio, en el caso de que se haya borrado de la base de datos */
    const notes: NoteDocument[] = [];
    for (const eachNote in user.notes) {
      notes[eachNote] = await findNote({ _id: user.notes[eachNote] });
    }
    /* */

    const noteNames = notes.map((eachNote) => {
      return eachNote.name!;
    });
    if (noteNames.includes(name)) {
      throw new Error("You already have a note with that name");
    }
    /* Puede causar problemas al actualizar el usuario y como resultado haber introducido un note no valido */
    const newNote = (await createNote({ name })) as NoteDocument;
    const newNotesUserProperty = [...user.notes, newNote._id];
    await updateUser({ _id: user._id }, { notes: newNotesUserProperty });
    /* */

    return NextResponse.json(
      { message: "New note created !", note: newNote, user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
