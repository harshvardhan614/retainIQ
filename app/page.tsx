"use client"
import SideNav from "./components/SideNav";
import UpperHead from "./components/UpperHead";
// import Lower from "./components/Lower";
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { Container } from "./components/Container";
import Table from "./components/Table";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full ">
      <SideNav />
      <div className="flex flex-col w-full max-w-7xl p-2 sm:p-6">
         <UpperHead />
        {/* <DndProvider backend={HTML5Backend}>           
          <Container/>
        </DndProvider>  */}
        <Table/>

        {/* <Lower /> */}
      </div>
    </main>
  );
}
