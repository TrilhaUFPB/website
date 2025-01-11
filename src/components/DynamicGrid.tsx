"use client";

interface DynamicGridProps {
  cellSize?: number; // Size of each cell (default is 50px)
  numberOfCells?: number; // Number of cells to render
  className?: string; // Additional classes for the grid
}

const DynamicGrid = ({ cellSize = 50, numberOfCells = 100, className = "" }: DynamicGridProps) => {

  return (
    <div
      className={`absolute inset-0 grid pointer-events-none ${className} overflow-hidden`}
      style={{
        gridTemplateColumns: `repeat(${numberOfCells}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${numberOfCells}, ${cellSize}px)`,
      }}
    >
      {Array.from({ length: numberOfCells*numberOfCells }, (_, index) => (
        <div key={index} className="border border-gray-500"></div>
      ))}
    </div>
  );
};

export default DynamicGrid;
