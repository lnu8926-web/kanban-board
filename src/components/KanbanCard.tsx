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
          background: "#fffffe",
          border: "1px solid #e3e2df",
          borderRadius: "6px",
          padding: "10px 12px",
          marginBottom: "6px",
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
            color: "#37352f",
            lineHeight: "1.5",
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
            color: "#c7c6c3",
            fontSize: "16px",
            padding: "0 0 0 8px",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
