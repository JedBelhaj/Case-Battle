import MainWindow from "./components/MainWindow";
import SideBar from "./components/SideBar";
import "./index.css";
function App() {
  return (
    <div className="bg-zinc-900 min-h-screen w-screen flex">
      <MainWindow />
      <SideBar />
    </div>
  );
}

export default App;
