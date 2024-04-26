import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./index";

export const useAppDispatch: () => AppDispatch = useDispatch; //디스패치 함수 정의
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //Redux스토어의 상태를 선택
