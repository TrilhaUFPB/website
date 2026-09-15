import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
export default function Layout({children}: {children: React.ReactNode}) { return <><NavBar />{children}<Footer /></>; }
