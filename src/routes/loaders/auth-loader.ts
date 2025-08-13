import { checkIsAuthenticated } from "@/store/authSlice";
import { store } from "@/store/store";
import { redirect } from "react-router-dom";

export async function authLoader() {
    // check the auth status from store 
  const state = store.getState();
  if (!state.auth.isAuthenticated) {
    const resultAction = await store.dispatch(checkIsAuthenticated());
    if (checkIsAuthenticated.rejected.match(resultAction)) {
      throw redirect("/auth/loginRegister");
    }
  }
  return null;
}