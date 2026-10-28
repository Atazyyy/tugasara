import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Papan from "./components/Papan";
import Aktivitas from "./components/Aktivitas";
import useBoard from "./hooks/useBoard";

export default function App() {
  const [view, setView] = useState("papan");
  const board = useBoard();

  const navigate = (v) => {
    setView(v);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
      <Navbar view={view} onNavigate={navigate} />
      <main className="flex-1 pb-16 sm:pb-0">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          {view === "papan" && <Papan board={board} />}
          {view === "aktivitas" && <Aktivitas board={board} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
