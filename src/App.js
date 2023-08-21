import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
import React, { useReducer, useRef } from "react";

//프로젝트 전반적으로 사용될 일기 데이터 state관리 로직
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
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
  return newState;
};

//데이터 state와 state의 dispatch함수를 컴포넌트 전역에 공급하기 위한 context만들기 -> Provider로 공급하기
export const DiaryStateContext = React.createContext();
export const DiaryDispathContext = React.createContext();

// ✅ 필터링 시 출력 데이터 확인
const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1692103867921,
    // console.log(new Date().getTime());
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1692103867922,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1692103867923,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1692103867924,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1692103867925,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0); //데이터의 아이디

  //create : 새로운 데이터를 받아서 일기객체(data)로 만들어준다
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
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
      <DiaryDispathContext.Provider value={(onCreate, onEdit, onRemove)}>
        {/* 데이터 state를 변화시키는 dispatch함수를 객체로 전달 */}
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispathContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
