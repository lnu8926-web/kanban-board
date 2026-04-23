import { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Card, Column } from "../types/kanban";
import { KanbanColumn } from "./KanbanColumn";

const INITIAL_COLUMNS: Column[] = [
  { id: "todo", title: "할 일" },
  { id: "in-progress", title: "진행 중" },
  { id: "done", title: "완료" },
];

const INITIAL_CARDS: Card[] = [
  { id: "1", columnId: "todo", content: "dnd-kit 공부하기" },
  { id: "2", columnId: "todo", content: "칸반 보드 만들기" },
  { id: "3", columnId: "in-progress", content: "블로그 글 쓰기" },
];

export function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id as string;
    const newColumnId = over.id as string;

    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, columnId: newColumnId } : card,
      ),
    );
  };

  const handleAddCard = (columnId: string, content: string) => {
    const newCard: Card = {
      id: crypto.randomUUID(),
      columnId,
      content,
    };
    setCards((prev) => [...prev, newCard]);
  };

  const handleDeleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "2rem",
          overflowX: "auto",
        }}
      >
        {INITIAL_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            cards={cards.filter((card) => card.columnId === column.id)}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
          />
        ))}
      </div>
    </DndContext>
  );
}
