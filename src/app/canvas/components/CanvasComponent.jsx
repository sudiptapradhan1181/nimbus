"use client";
import { useEffect, useState, useRef } from "react";

export default function CanvasComponent() {
  const canvasRef = useRef(null);
  const [isPanning, setIsPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    const scaleFactor = 0.1;
    setScale((prev) =>
      Math.max(0.5, Math.min(3, prev - e.deltaY * scaleFactor))
    );
  };

  const handleMouseDown = (e) => {
    setIsPanning(true);
    setStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setOffset({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
  };

  const handleMouseUp = () => setIsPanning(false);
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 bg-gray-200 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
      }}
    />
  );
}
