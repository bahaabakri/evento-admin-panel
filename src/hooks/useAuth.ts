// src/hooks/useAuth.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
const useAuth = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return { user, isAuthenticated };
};

export default useAuth;