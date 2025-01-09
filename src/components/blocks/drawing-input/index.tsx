"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  PenTool,
  Eraser,
  Undo2,
  Download,
  Circle,
  Square,
  Type,
  Palette,
} from "lucide-react";

interface DrawingPoint {
  x: number;
  y: number;
  pressure: number;
}

interface DrawingPath {
  points: DrawingPoint[];
  color: string;
  width: number;
  tool: "pen" | "eraser" | "shape";
  shape?: "circle" | "square";
}

const DrawingInput: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<DrawingPath | null>(null);
  const [paths, setPaths] = useState<DrawingPath[]>([]);
  const [selectedTool, setSelectedTool] = useState<"pen" | "eraser" | "shape">(
    "pen"
  );
  const [selectedShape, setSelectedShape] = useState<"circle" | "square">(
    "circle"
  );
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeColor, setStrokeColor] = useState("#6366f1");

  // Drawing context setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Drawing functions
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPath: DrawingPath = {
      points: [{ x, y, pressure: e.pressure }],
      color: selectedTool === "eraser" ? "#ffffff" : strokeColor,
      width: selectedTool === "eraser" ? strokeWidth * 2 : strokeWidth,
      tool: selectedTool,
      shape: selectedTool === "shape" ? selectedShape : undefined,
    };

    setCurrentPath(newPath);
    setPaths([...paths, newPath]);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentPath) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === "shape") {
      // For shapes, we'll redraw everything each time
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPaths(ctx, paths.slice(0, -1));

      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;

      const startPoint = currentPath.points[0];
      if (selectedShape === "circle") {
        const radius = Math.sqrt(
          Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
        );
        ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2);
      } else {
        const width = x - startPoint.x;
        const height = y - startPoint.y;
        ctx.rect(startPoint.x, startPoint.y, width, height);
      }
      ctx.stroke();
    } else {
      // For freehand drawing
      ctx.beginPath();
      ctx.strokeStyle = currentPath.color;
      ctx.lineWidth = currentPath.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const prevPoint = currentPath.points[currentPath.points.length - 1];
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      currentPath.points.push({ x, y, pressure: e.pressure });
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setCurrentPath(null);
  };

  // Helper function to draw all paths
  const drawPaths = (
    ctx: CanvasRenderingContext2D,
    pathsToDraw: DrawingPath[]
  ) => {
    pathsToDraw.forEach((path) => {
      if (path.tool === "shape") {
        // Draw shapes
        ctx.beginPath();
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.width;

        const startPoint = path.points[0];
        const endPoint = path.points[path.points.length - 1];

        if (path.shape === "circle") {
          const radius = Math.sqrt(
            Math.pow(endPoint.x - startPoint.x, 2) +
              Math.pow(endPoint.y - startPoint.y, 2)
          );
          ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2);
        } else {
          const width = endPoint.x - startPoint.x;
          const height = endPoint.y - startPoint.y;
          ctx.rect(startPoint.x, startPoint.y, width, height);
        }
        ctx.stroke();
      } else {
        // Draw freehand paths
        ctx.beginPath();
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        path.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }
    });
  };

  const handleUndo = () => {
    if (paths.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newPaths = paths.slice(0, -1);
    setPaths(newPaths);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaths(ctx, newPaths);
  };

  return (
    <div className="space-y-4">
      {/* Drawing Tools */}
      <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedTool === "pen" ? "default" : "ghost"}
            size="icon"
            onClick={() => setSelectedTool("pen")}
          >
            <PenTool className="h-4 w-4" />
          </Button>

          <Button
            variant={selectedTool === "eraser" ? "default" : "ghost"}
            size="icon"
            onClick={() => setSelectedTool("eraser")}
          >
            <Eraser className="h-4 w-4" />
          </Button>

          <Button
            variant={selectedTool === "shape" ? "default" : "ghost"}
            size="icon"
            onClick={() => setSelectedTool("shape")}
          >
            {selectedShape === "circle" ? (
              <Circle className="h-4 w-4" />
            ) : (
              <Square className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Color Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <div
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: strokeColor }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <div className="grid grid-cols-5 gap-1">
                {["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6"].map(
                  (color) => (
                    <button
                      key={color}
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: color }}
                      onClick={() => setStrokeColor(color)}
                    />
                  )
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Stroke Width */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <div className="h-4 w-4 flex items-center justify-center">
                  <div
                    className="rounded-full bg-foreground"
                    style={{
                      width: `${Math.min(16, strokeWidth)}px`,
                      height: `${Math.min(16, strokeWidth)}px`,
                    }}
                  />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <Slider
                value={[strokeWidth]}
                onValueChange={([value]) => setStrokeWidth(value)}
                min={1}
                max={20}
                step={1}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleUndo}
            disabled={paths.length === 0}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="relative h-[300px] bg-white rounded-lg border">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
};

export default DrawingInput;
