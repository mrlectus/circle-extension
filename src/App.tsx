import React from "react";
import { NavBar } from "./components/navbar";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const App = () => {
  const [_, setUser] = React.useState<string | null>();
  const [cookies] = useCookies(["userToken"]);
  React.useEffect(() => {
    setUser(cookies?.userToken);
  });
  return (
    <>
      <main className="w-[300px] h-[400px] p-2 text-white font-space">
        <NavBar />
        <Outlet />
      </main>
    </>
  );
};

export default App;
