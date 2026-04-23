import { useDroppable } from "@dnd-kit/core";
import type { Card, Column } from "../types/kanban";
import { KanbanCard } from "./KanbanCard";
import { useState } from "react";

interface KanbanColumnProps {
  column: Column;
  cards: Card[];
  onAddCard: (columnId: string, content: string) => void;
  onDeleteCard: (id: string) => void;
}

export function KanbanColumn({
  column,
  cards,
  onAddCard,
  onDeleteCard,
}: KanbanColumnProps) {
  const [input, setInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const handleAdd = () => {
    if (!input.trim()) return;
    onAddCard(column.id, input.trim());
    setInput("");
    setIsAdding(false);
  };

  return (
    <div
      style={{
        background: "#f4f5f7",
        borderRadius: "12px",
        padding: "12px",
        width: "280px",
        minHeight: "400px",
        flexShrink: 0,
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 700,
          marginBottom: "12px",
          color: "#444",
        }}
      >
        {column.title}
        <span
          style={{
            marginLeft: "8px",
            background: "#ddd",
            borderRadius: "10px",
            padding: "1px 8px",
            fontSize: "12px",
          }}
        >
          {cards.length}
        </span>
      </h3>

      <div
        ref={setNodeRef}
        style={{
          minHeight: "100px",
          background: isOver ? "#e8f0fe" : "transparent",
          borderRadius: "8px",
          transition: "background 0.2s",
          padding: "4px",
        }}
      >
        {cards.map((card) => (
          <KanbanCard key={card.id} card={card} onDelete={onDeleteCard} />
        ))}
      </div>

      {isAdding ? (
        <div style={{ marginTop: "8px" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="카드 내용을 입력하세요"
            rows={2}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
              resize: "none",
              fontFamily: "sans-serif",
            }}
          />
          <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
            <button
              onClick={handleAdd}
              style={{
                background: "#0052cc",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              추가
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setInput("");
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                color: "#888",
              }}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          style={{
            marginTop: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#888",
            fontSize: "13px",
            padding: "4px",
          }}
        >
          + 카드 추가
        </button>
      )}
    </div>
  );
}
