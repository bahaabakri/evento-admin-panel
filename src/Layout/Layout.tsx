import { Outlet } from "react-router-dom";
import { MainSidebar } from "./MainSidebar/MainSidebar";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Evento Admin Panel</h1>
      </header>
      <main className="flex-1 p-4">
        {/* Main content goes here */}
        <section className="w-72 lg:w-80">
            <MainSidebar />
        </section>
        <section>
            {/** Content Section here */}
            <Outlet></Outlet>
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2023 Evento Admin Panel
      </footer>
    </div>
  );
}

export default MainLayout;