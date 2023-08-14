export type Theme = "light" | "dark";
export interface ThemeContext {
  theme: Theme;
  changeThemeTo: (newTheme: Theme) => void;
  switchTheme: () => void;
}
