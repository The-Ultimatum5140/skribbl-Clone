import { useParams } from "react-router-dom";

import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

const Toolbar = ({
  canDraw,
  brushColor,
  brushSize,
  setBrushColor,
  setBrushSize,
}) => {
  const { roomId } = useParams();

  const colors = ["#000000", "#ff0000", "#0000ff", "#00aa00", "#ffff00"];

  const handleClearCanvas = () => {
    if (!canDraw) return;

    socket.emit(SOCKET_EVENTS.CLEAR_CANVAS, {
      roomId,
    });
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      {/* Colors */}
      <div className="flex items-center gap-3">
        {colors.map((color) => (
          <button
            key={color}
            disabled={!canDraw}
            onClick={() => setBrushColor(color)}
            className="h-8 w-8 rounded-full border-2 transition disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor: color,
              borderColor: brushColor === color ? "#ffffff" : "transparent",
            }}
          />
        ))}

        {/* Eraser */}
        <button
          disabled={!canDraw}
          onClick={() => setBrushColor("#ffffff")}
          className="rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          🩹 Eraser
        </button>
      </div>

      {/* Brush Size */}
      <div className="flex items-center gap-3">
        <span className="text-sm">Brush</span>

        <input
          type="range"
          min="2"
          max="20"
          value={brushSize}
          disabled={!canDraw}
          onChange={(e) => setBrushSize(Number(e.target.value))}
        />
      </div>

      {/* Clear Canvas */}
      <button
        disabled={!canDraw}
        onClick={handleClearCanvas}
        className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        🗑 Clear
      </button>
    </div>
  );
};

export default Toolbar;
