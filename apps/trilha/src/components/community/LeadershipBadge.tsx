/* eslint-disable @next/next/no-img-element */
const initiatives = {
  trilha: { name: "Trilha", logo: "/community/montanha-oficial.svg" },
  ufpb: { name: "Trilha UFPB", logo: "/community/ufpb-white.png" },
  ufpe: { name: "Trilha UFPE", logo: "/community/ufpe.png" },
  momento: { name: "Momento", logo: "/community/momento-symbol.svg" },
  htp: { name: "Hack The Path", logo: "/community/htp-logo.png" },
};
export default function LeadershipBadge({ initiative }: { initiative: keyof typeof initiatives }) {
  const { name, logo } = initiatives[initiative];
  return <span className={`leadership-logo leadership-logo--${initiative}`} title={name}><img src={logo} alt={name} /></span>;
}
