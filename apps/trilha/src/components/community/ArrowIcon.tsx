type Direction = "up-right" | "down" | "up" | "left";
const paths: Record<Direction, string> = {
  "up-right": "M7 17 17 7M7 7h10v10",
  down: "M12 4v16m-6-6 6 6 6-6",
  up: "M12 20V4m-6 6 6-6 6 6",
  left: "M20 12H4m6-6-6 6 6 6",
};
export default function ArrowIcon({
  direction = "up-right",
}: {
  direction?: Direction;
}) {
  return (
    <svg
      className="arrow-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
