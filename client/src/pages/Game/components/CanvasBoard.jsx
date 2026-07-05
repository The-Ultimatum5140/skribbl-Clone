import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import socket from "@/services/socket";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

const CanvasBoard = ({ canDraw, brushColor, brushSize }) => {
  const { roomId } = useParams();

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const lastPosition = useRef({
    x: 0,
    y: 0,
  });

  // ================= DRAW LINE =================

  const drawLine = ({ x0, y0, x1, y1, color = "#000000", lineWidth = 4 }) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();
  };

  // ================= MOUSE DOWN =================

  const handleMouseDown = (e) => {
    if (!canDraw) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    lastPosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    isDrawing.current = true;
  };

  // ================= MOUSE MOVE =================

  const handleMouseMove = (e) => {
    if (!canDraw) return;
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const line = {
      x0: lastPosition.current.x,
      y0: lastPosition.current.y,
      x1: currentX,
      y1: currentY,
      color: brushColor,
      lineWidth: brushSize,
    };

    // Local Draw
    drawLine(line);

    // Broadcast
    socket.emit(SOCKET_EVENTS.DRAW_MOVE, {
      roomId,
      ...line,
    });

    lastPosition.current = {
      x: currentX,
      y: currentY,
    };
  };

  // ================= MOUSE UP =================

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // ================= INIT =================

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 500;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const handleRemoteDraw = (line) => {
      drawLine(line);
    };

    const handleClearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    socket.on(SOCKET_EVENTS.DRAW_MOVE, handleRemoteDraw);
    socket.on(SOCKET_EVENTS.CLEAR_CANVAS, handleClearCanvas);

    return () => {
      socket.off(SOCKET_EVENTS.DRAW_MOVE, handleRemoteDraw);
      socket.off(SOCKET_EVENTS.CLEAR_CANVAS, handleClearCanvas);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default CanvasBoard;
