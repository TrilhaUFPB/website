import { notFound } from "next/navigation";
import { ComponentGallery } from "@trilha/ui/gallery";

export const metadata = { title: "Trilha · Component library", robots: { index: false, follow: false } };
export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <ComponentGallery />;
}
