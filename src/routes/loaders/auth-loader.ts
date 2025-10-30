import { UserStatus } from "@/enums/user-status.enum";
import { checkIsAuthenticated } from "@/store/authSlice";
import { store } from "@/store/store";
import { redirect } from "react-router-dom";

export async function authLoader() {
  let state = store.getState();

  // If not authenticated yet, dispatch the check
  if (!state.auth.isAuthenticated) {
    const resultAction = await store.dispatch(checkIsAuthenticated());

    // ❗ Get the updated state after dispatch
    state = store.getState();

    // If still unauthorized
    if (checkIsAuthenticated.rejected.match(resultAction)) {
      throw redirect("/auth/login");
    }
  }

  const user = state.auth.user;

  // 🧩 Check verification and status
  if (user && !user.isVerified) {
      throw redirect("/auth/login");
  }

  if (user && user.status === UserStatus.PENDING) {
    throw redirect("/auth/pending");
  }

  if (user && user.status === UserStatus.REJECTED) {
    throw redirect("/auth/rejected");
  }

  return null;
}
