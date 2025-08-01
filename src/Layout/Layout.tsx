import { Outlet } from "react-router-dom";
import { MainSidebar } from "@/Layout/MainSidebar/MainSidebar";
// import styles from './Layout.module.scss';
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "@/Layout/Header/Header";
const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div className="flex gap-2 items-center">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Header />
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <MainSidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

export default MainLayout;
