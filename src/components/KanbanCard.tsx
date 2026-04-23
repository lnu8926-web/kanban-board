import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "../types/kanban";

interface KanbanCardProps {
  card: Card;
  onDelete: (id: string) => void;
}

export function KanbanCard({ card, onDelete }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
      data: { card },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 드래그 핸들 영역만 listeners 적용 */}
        <span
          {...attributes}
          {...listeners}
          style={{
            fontSize: "14px",
            cursor: "grab",
            flex: 1,
          }}
        >
          {card.content}
        </span>
        <button
          onClick={() => onDelete(card.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#aaa",
            fontSize: "16px",
            padding: "0 4px",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
