import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          marginBottom: "2rem",
          color: "#37352f",
        }}
      >
        칸반 보드
      </h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
