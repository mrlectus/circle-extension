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
      <main className="flex justify-center items-center w-full p-2">
        <div className="w-[440px] h-[600px] p-2 text-white font-space border border-white">
          <NavBar />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
