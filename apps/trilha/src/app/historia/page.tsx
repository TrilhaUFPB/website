import History from "@/components/community/History";
import CommunityEffects from "@/components/community/CommunityEffects";
import "@/components/community/community.css";
export const metadata = { title: "Nossa história" };
export default function Page() {
  return (
    <>
      <History />
      <CommunityEffects />
    </>
  );
}
