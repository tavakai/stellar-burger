import {
  TypedUseSelectorHook,
  useDispatch, useSelector
} from 'react-redux';
import { AppDispatch, RootState, AppThunk } from '../../utils/types';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();