import { NextRequest, NextResponse } from "next/server";
import { findUser, createChat, updateUser, findChat } from "@/utils/crud";
import { ChatDocument } from "@/models/chat.model";
import { UserDocument } from "@/models/user.model";
import { verifyAuth } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

// export async function GET(request: NextRequest) {
//   // connecting to database
//   if ((await connectDB()) === false) {
//     return NextResponse.json(
//       { error: "Error connecting to database" },
//       { status: 500 }
//     );
//   }

//   const token = request.cookies.get("token")?.value;
//   const verifiedToken =
//     token && (await verifyAuth(token).catch((error) => console.error(error)));

//   if (!verifiedToken) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user: UserDocument = await findUser({ _id: verifiedToken.userId });
//   if (!user) {
//     const response = NextResponse.json({
//       error: "Your session expired",
//       sessionExpired: true,
//     });
//     response.cookies.delete("token");
//     return response;
//   }
//   try {
//     const chats: ChatDocument[] = [];
//     console.log(user.chats);
//     // chats existe
//     user.chats.forEach(async (chatId, index) => {
//       const chat: ChatDocument = await findChat({ _id: chatId });
//       chats[index] = chat;
//     });
//     return NextResponse.json({ chats }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { error: "Could not find a chat" },
//         { status: 400 }
//       );
//     }
//   }
// }

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
      throw new Error("The chat name must have a length between 1 and 30");
    }

    /* Puede causar problemas cuando se busca el chat que dice tener el usurio, en el caso de que se haya borrado de la base de datos */
    const chats: ChatDocument[] = [];
    for (const eachChat in user.chats) {
      chats[eachChat] = await findChat({ _id: user.chats[eachChat] });
    }
    /* */

    const chatNames = chats.map((eachChat) => {
      return eachChat.name!;
    });
    if (chatNames.includes(name)) {
      throw new Error("You already have a chat with that name");
    }
    /* Puede causar problemas al actualizar el usuario y como resultado haber introducido un chat no valido */
    const newChat = (await createChat({ name })) as ChatDocument;
    const newChatsUserProperty = [...user.chats, newChat._id];
    await updateUser({ _id: user._id }, { chats: newChatsUserProperty });
    /* */

    return NextResponse.json(
      { message: "New chat created !", chat: newChat, user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
