import { jwtVerify, JWTPayload } from "jose";

export interface UserJWTPaylaod {
  jti: string;
  iat: number;
  userId: string;
}

export const getSecretKey = (): string => {
  if (typeof process.env.SECRET === "undefined") {
    throw new Error("SECRET enviroment variable us required");
  }
  return process.env.SECRET;
};

export const verifyAuth = async (token: string): Promise<JWTPayload> => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getSecretKey())
    );
    return Promise.resolve(verified.payload);
  } catch {
    return Promise.reject("Invalid token");
  }
};
