import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
    const dispatch = useDispatch();
    // use the following instead of above to avoid binding creator 
    // which results in a different bound in every rendering.
    // a new bound triggers call to useEffect in code-cell.tsx.
    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch);
    }, [dispatch]);
};
