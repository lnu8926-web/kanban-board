import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  return (
    <div>
      <h1 style={{ padding: "1.5rem 2rem", fontSize: "20px", fontWeight: 700 }}>
        칸반 보드
      </h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
