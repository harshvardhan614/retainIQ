import Image from "next/image";
import SideNav from "./components/SideNav";
import UpperHead from "./components/UpperHead";
import MainTable from "./components/MainTable";
import Lower from "./components/Lower";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center">
      <SideNav/>
      <div className="flex flex-col items-center justify-center">        
      <UpperHead/>
      <MainTable/>
      <Lower/>
      </div>
    </main>
  );
}
