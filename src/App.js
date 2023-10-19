import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
import React, { useEffect, useReducer, useRef } from "react";

//프로젝트 전반적으로 사용될 일기 데이터 state관리 로직
//newState라는 변수를 사용하여 여기에 일기데이터를 넣도록, 그리고 return newState 해주기(return 없으면 break)
//✅useReducer의 data와 reducer의 state는 같을까?
//data는 일기 데이터가 저장된 상태이고, state는 reducer에서 관리되는 상태이다.
//useReducer를 통해 data는 state의 초기값이 되고 dispatch를 통해 state가 변경되면 data도 변경되어 현재상태를 반영한다.
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      // const newItem = { ...action.data };
      // newState = [newItem, ...state];
      newState = [action.data, ...state]; //기존 state에 생성된 데이터 추가
      break; //default까지 수행되지 않도록
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  // ✅일기 저장하기 : newState가 변화할 때마다 로컬스토리지에 넣는다.
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

//데이터 state와 state의 dispatch함수를 컴포넌트 전역에 공급하기 위한 context만들기 -> Provider로 공급하기
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// ✅컴포넌트가 마운트 되었을 때 로컬스토리지에 있는 데이터를 꺼내와서 data state의 초기값으로 사용하도록
function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      //새로 작성할 일기 id 설정 : 가장 최신으로 정렬한 뒤 그 일기의 id + 1
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        //빈배열이 아닐때
        dataId.current = parseInt(diaryList[0].id + 1);
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  //⛔Warning: Encountered two children with the same key, `1`.
  //생성되는 일기의 id를 0부터 만들어서 기존 더미데이터의 id와 겹친다. -> 리액트 디벨로퍼 툴스 확인
  const dataId = useRef(0); //데이터의 아이디

  //create : 새로운 데이터를 받아서 일기객체(data)로 만들어준다
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE", //✅이 타입은 언제 사용? reducer에서 이 함수가 어떻게 동작하는지 타입으로 설정
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  //remove
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        {/* 데이터 state를 변화시키는 dispatch함수를 객체로 전달 */}
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
