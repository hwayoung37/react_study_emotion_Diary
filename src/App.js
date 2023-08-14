import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

//test

function App() {
  //이미지 파일이 안뜬다면
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || ""; //env.PUBLIC_URL에 env.PUBLIC_URL가 존재한다면 담고, 아니면 비워라

  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          // props에 컴포넌트를 넣을 수도 있다
          leftChild={
            <MyButton text={"왼쪽 버튼"} onClick={() => alert("왼쪽클릭")} />
          }
          rightChild={
            <MyButton
              text={"오른쪽 버튼"}
              onClick={() => alert("오른쪽클릭")}
            />
          }
        />
        <h2>App.js</h2>

        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭");
          }}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭");
          }}
          type={"negative"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭");
          }}
        />
        <br />
        {/* process.env.PUBLIC_URL : public 디렉토리에 바로 접근 */}
        {/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
