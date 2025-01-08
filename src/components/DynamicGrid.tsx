"use client";

import { useState, useEffect } from "react";

interface DynamicGridProps {
  cellSize?: number; // Size of each cell (default is 50px)
  className?: string; // Additional classes for the grid
}

const DynamicGrid = ({ cellSize = 50, className = "" }: DynamicGridProps) => {
  const [gridCount, setGridCount] = useState(0);

  useEffect(() => {
    const calculateGridCount = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const columns = Math.ceil(screenWidth / cellSize);
      const rows = Math.ceil(screenHeight / cellSize);
      setGridCount(columns * rows);
    };

    calculateGridCount(); // Initial calculation
    window.addEventListener("resize", calculateGridCount); // Recalculate on resize

    return () => {
      window.removeEventListener("resize", calculateGridCount);
    };
  }, [cellSize]);

  return (
    <div
      className={`absolute inset-0 grid pointer-events-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${cellSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, ${cellSize}px)`,
      }}
    >
      {Array.from({ length: gridCount }, (_, index) => (
        <div key={index} className="border border-gray-500"></div>
      ))}
    </div>
  );
};

export default DynamicGrid;
