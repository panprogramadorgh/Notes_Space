import { FC } from "react";
import Link from "next/link";

interface Props {}

const Dashboard: FC<Props> = ({}) => {
  return (
    <div>
      <h1>Dashboard page</h1>
      <Link href="/">Home page</Link>
    </div>
  );
};

export default Dashboard;
