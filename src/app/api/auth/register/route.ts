import { NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { hashSync as hashPassword } from "bcryptjs";

export async function POST(request: Request) {
  // connecting to database
  if ((await connectDB()) === false) {
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
  }
  // agarrando el cuerpo de la request
  const { name, password } = await request.json();

  // comprobando que el nombre sea unico
  const matchingPasswordUsers = await UserModel.findOne({ name });
  if (matchingPasswordUsers)
    return NextResponse.json(
      {
        error: "The name already exists",
      },
      { status: 409 }
    );

  // validando y construyendo el documento
  try {
    if (!name || name.length < 3 || name.length > 20)
      throw new Error("Name must have a length between 3 and 20 chars");
    else if (!password || password.length < 6)
      throw new Error("The Password must have 6 characters at least");

    const newUserData = {
      name,
      password: hashPassword(password, 12),
    };
    const user = new UserModel(newUserData);
    await user.save();
    return NextResponse.json({
      message: {
        text: "New user inserted",
        user,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
