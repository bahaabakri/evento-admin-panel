// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuthenticated } from '@/store/authSlice';
import { AppDispatch, RootState } from '@/store/store';
const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkIsAuthenticated());
  }, [dispatch]);

  return { user, isAuthenticated };
};

export default useAuth;