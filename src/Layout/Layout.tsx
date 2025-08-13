import { Outlet, useLocation } from "react-router-dom";
import { MainSidebar } from "@/Layout/MainSidebar/MainSidebar";
// import styles from './Layout.module.scss';
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "@/Layout/Header/Header";
// import { checkIsAuthenticated } from "@/store/authSlice";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { AppDispatch } from "@/store/store";
const MainLayout = () => {
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();
  const hideNavbar = location.pathname.startsWith('/auth');
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   // check authentication in main layout
  //   dispatch(checkIsAuthenticated());
  // }, [dispatch]);
  return (

    !hideNavbar
      ?
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
          <div className="flex gap-2 items-center px-2">
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
      : <Outlet />
  );
}

export default MainLayout;
