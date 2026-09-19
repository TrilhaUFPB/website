import type { ComponentPropsWithoutRef, ReactNode } from "react";
const cx = (...names: (string | undefined | false)[]) => names.filter(Boolean).join(" ");
type ButtonStyle = { variant?: "cream" | "electric" | "dark"; size?: "sm" | "md" | "lg" };
const buttonClass = (variant: ButtonStyle["variant"] = "cream", size: ButtonStyle["size"] = "md", className?: string) => cx("ui-button", `ui-button--${variant}`, `ui-button--${size}`, className);
export function Button({ variant, size, className, type = "button", ...props }: ComponentPropsWithoutRef<"button"> & ButtonStyle) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />;
}
export function ButtonLink({ variant, size, className, ...props }: ComponentPropsWithoutRef<"a"> & ButtonStyle) {
  return <a className={buttonClass(variant, size, className)} {...props} />;
}
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cx("ui-container", className)} {...props} />;
}
export function Eyebrow({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={cx("ui-eyebrow", className)} {...props} />;
}
export function SectionHeading({ eyebrow, children, description, id }: { eyebrow?: string; children: ReactNode; description?: string; id?: string }) {
  return <header className="ui-section-heading">{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2 id={id}>{children}</h2>{description && <p>{description}</p>}</header>;
}
export function Card({ tone = "paper", className, ...props }: ComponentPropsWithoutRef<"article"> & { tone?: "paper" | "mint" | "dark" }) {
  return <article className={cx("ui-card", `ui-card--${tone}`, className)} {...props} />;
}
export function Badge({ children }: { children: ReactNode }) { return <span className="ui-badge">{children}</span>; }
type Direction = "up-right" | "down" | "up" | "left" | "right";
const paths: Record<Direction, string> = { "up-right": "M7 17 17 7M7 7h10v10", down: "M12 4v16m-6-6 6 6 6-6", up: "M12 20V4m-6 6 6-6 6 6", left: "M20 12H4m6-6-6 6 6 6", right: "M4 12h16m-6-6 6 6-6 6" };
export function ArrowIcon({ direction = "up-right" }: { direction?: Direction }) {
  return <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[direction]} /></svg>;
}
