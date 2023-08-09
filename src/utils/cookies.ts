// create cookie
interface CreateCookie {
  (newCookieData: { name: string; value: any; maxAge: number }): void;
}
export const createCookie: CreateCookie = ({ name, value, maxAge }) => {
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
};

// delete cookie
interface DeleteCookie {
  (name: string): void;
}

export const deleteCookie: DeleteCookie = (name) => {
  document.cookie = `${name}=; max-age=${0}; path=/`;
};

// find cookies
interface FindCookies {
  (): null | { [key: string]: string };
}

export const findCookies: FindCookies = () => {
  if (!document.cookie) return null;

  const cookiesObj: { [key: string]: string } = {};
  for (const pair of document.cookie.split('; ')) {
    const [key, value] = pair.split("=");
    cookiesObj[key] = value;
  }

  return cookiesObj;
};
