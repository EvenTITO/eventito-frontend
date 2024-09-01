import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { serverDown } from '@/state/app/appSlice';

const useCustomQuery = (key, queryFn, options = {}) => {
  const dispatch = useDispatch();

  const customQueryFn = async () => {
    try {
      const data = await queryFn();
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status >= 400) {
        dispatch(serverDown());
      }
      throw error;
    }
  };

  return useQuery(key, customQueryFn, options);
};

export default useCustomQuery;
