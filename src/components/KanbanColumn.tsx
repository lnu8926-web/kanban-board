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
        background: "#f7f6f3",
        borderRadius: "8px",
        padding: "16px",
        width: "280px",
        minHeight: "400px",
        flexShrink: 0,
        border: "1px solid #e9e9e7",
      }}
    >
      <h3
        style={{
          fontSize: "13px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "#37352f",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {column.title}
        <span
          style={{
            marginLeft: "8px",
            background: "#e3e2df",
            borderRadius: "4px",
            padding: "1px 6px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {cards.length}
        </span>
      </h3>

      <div
        ref={setNodeRef}
        style={{
          minHeight: "100px",
          background: isOver ? "#eeece9" : "transparent",
          borderRadius: "6px",
          transition: "background 0.15s",
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
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d3d1cb",
              fontSize: "14px",
              resize: "none",
              fontFamily: "Inter, sans-serif",
              background: "#ffffff",
              color: input ? "#37352f" : "transparent",
              outline: "none",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          />
          {!input && (
            <span
              className="cursor"
              style={{
                position: "absolute",
                top: "10px",
                left: "13px",
                fontSize: "14px",
                color: "#9b9a97",
                pointerEvents: "none",
              }}
            >
              카드 내용을 입력하세요
            </span>
          )}
          <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
            <button
              onClick={handleAdd}
              style={{
                background: "#37352f",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
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
                background: "#ffffff",
                border: "1px solid #d3d1cb",
                borderRadius: "6px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                color: "#37352f",
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
            border: "1px dashed #d3d1cb",
            borderRadius: "6px",
            cursor: "pointer",
            color: "#9b9a97",
            fontSize: "13px",
            padding: "6px 12px",
            width: "100%",
            textAlign: "left",
            fontFamily: "Inter, sans-serif",
          }}
        >
          + 새 카드
        </button>
      )}
    </div>
  );
}
