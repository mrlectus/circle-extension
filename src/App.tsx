import React from "react";
import { NavBar } from "./components/navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  const [_, setUser] = React.useState<string | null>();
  React.useEffect(() => {
    const token = localStorage.getItem("userId");
    setUser(token);
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
