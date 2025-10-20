import { useEffect } from "react";
import "./App.scss";
import MainRouterProvider from "./routes/Router";
import { checkIsAuthenticated } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
function InitAuth() {
  // dispatch check auth action on first load
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkIsAuthenticated());
  }, [dispatch]);
  return null; // No UI
}
function App() {
  return (
    <>
      <InitAuth />
      <MainRouterProvider />
    </>
  );
}

export default App;
