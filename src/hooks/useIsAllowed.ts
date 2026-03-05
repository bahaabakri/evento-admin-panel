import useAuth from "./useAuth";
import { useMemo } from "react";

const useIsAllowed = () => {
  const { user } = useAuth();

  // console.log("user", user);
  
  const allUserPermissions = useMemo(
    () => user?.roles?.flatMap(role => role.permissions) ?? [],
    [user?.roles]
  );

  const checkIsAllowed = (permissionsName: string[] = []) => {
    if (!permissionsName || permissionsName.length == 0) return true;
    return permissionsName.every(p =>
      allUserPermissions.some(up => up.slug === p)
    );
  };

  return { checkIsAllowed };
};

export default useIsAllowed;
