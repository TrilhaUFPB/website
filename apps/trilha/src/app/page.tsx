import CommunityHome from "@/components/community/CommunityHome";
import CommunityEffects from "@/components/community/CommunityEffects";
import "@/components/community/community.css";
export const metadata = { title: "Trilha — de estudantes para estudantes" };
export default function Page() {
  return (
    <>
      <CommunityHome />
      <CommunityEffects globeDesign={1} />
    </>
  );
}
