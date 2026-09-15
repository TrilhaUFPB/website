import Ufpe from "@/components/community/Ufpe";
import CommunityEffects from "@/components/community/CommunityEffects";
import "@/components/community/community.css";
export const metadata = { title: "Trilha UFPE" };
export default function Page() {
  return (
    <>
      <Ufpe />
      <CommunityEffects />
    </>
  );
}
