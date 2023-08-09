import { jwtVerify } from "jose";

export interface UserJWTPaylaod {
  jti: string;
  iat: number;
}

export const getSecretKey = (): string => {
  if (typeof process.env.SECRET === "undefined") {
    throw new Error("SECRET enviroment variable us required");
  }
  return process.env.SECRET;
};

export const verifyAuth = async (token: string): Promise<UserJWTPaylaod> => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getSecretKey())
    );
    return Promise.resolve(verified.payload as UserJWTPaylaod);
  } catch {
    return Promise.reject("Invalid token");
  }
};
