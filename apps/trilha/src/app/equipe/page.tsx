import Team from "@/components/community/Team";
import CommunityEffects from "@/components/community/CommunityEffects";
import "@/components/community/community.css";
export const metadata = { title: "Quem somos" };
export default function Page() {
  return (
    <>
      <Team />
      <CommunityEffects />
    </>
  );
}
