import Ufpb from "@/components/community/Ufpb";
import CommunityEffects from "@/components/community/CommunityEffects";
import "@/components/community/community.css";
export const metadata = { title: "Trilha UFPB" };
export default function Page() {
  return (
    <>
      <Ufpb />
      <CommunityEffects />
    </>
  );
}
