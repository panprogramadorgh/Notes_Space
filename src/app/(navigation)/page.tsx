import { FC } from "react";
import SesionButton from "@/components/SesionButton";
import styles from "./page.module.css";

const App: FC<{}> = ({}) => {
  return (
    <>
      <h1>Home page</h1>
      <SesionButton />
    </>
  );
};

export default App;
