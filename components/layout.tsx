import { ReactNode } from "react";
import Header from "./header/header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default Layout;
