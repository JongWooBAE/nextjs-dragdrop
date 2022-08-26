import { useReducer } from "react";
import type { NextPage } from "next";
import DropZone from "../components/DropZone";

const DragDrop: NextPage = () => {
  // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        // 한 개의 파일만 들어와야 하니 초기화
        state.fileList = []
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  return (
    <div>
      <main className="flex flex-col items-center">
        <DropZone data={data} dispatch={dispatch} />
      </main>

    </div>
  );
}

export default DragDrop;