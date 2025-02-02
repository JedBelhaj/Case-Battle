import { Suspense } from "react";
import MainWindow from "../components/MainWindow";
import SideBar from "../components/SideBar";
// import socket from "./socket";
function App() {
  return (
    <div className="bg-zinc-900 min-h-screen w-screen flex">
      <MainWindow />
      <SideBar />
    </div>
  );
}

export default App;
