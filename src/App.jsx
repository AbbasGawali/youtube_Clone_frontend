import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Sidebar from "./components/Sidebar.jsx";
function App() {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />
        <div className=" w-full px-4 py-4">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
