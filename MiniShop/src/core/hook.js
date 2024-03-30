import { useContext } from "react";
import { ProviderContext } from "./Provider";

export default function useSelector() {
  const { state } = useContext(ProviderContext);

  return state;
}
export const useDispatch = () => {
  const { dispatch } = useContext(ProviderContext);
  return dispatch;
};
