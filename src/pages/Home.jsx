import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";

import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  //useContext를 통해서 state를 받는다(개발자도구 컴포넌트의 hooks - context에서 확인가능)
  const diaryList = useContext(DiaryStateContext);

  //받은 데이터를 상단 날짜에 따라 다르게 출력되도록 데이터 가공하기위한 state
  const [data, setData] = useState([]);

  // 상단 날짜 state, 초기값은 현재 날짜
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  //getFullYear: 연도 가져오기, getMonth: 월 가져오기(1월은 0월로 나옴 그래서 +1 해주기)

  // ✅diaryList와 현재 날짜가 변경되었을 때 리렌더링
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date( //현재월의 1일
        curDate.getFullYear(),
        curDate.getMonth(),
        1 //1일
      ).getTime();

      const lastDay = new Date( //현재월의 마지막일
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0 //마지막일
      ).getTime();

      setData(
        //현재월의 1일부터 마지막일까지의 날짜에 속하는 data를 필터링
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [curDate, diaryList]);
  // ⛔React Hook useEffect has a missing dependency: 'diaryList'. Either include it or remove the dependency array

  //오른쪽 클릭 시 월을 하나씩 늘려주는 함수
  const increaseMonth = () => {
    //새로운 date 객체 생성 날짜는 curDate에서 년월일 들고옴
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
    console.log(curDate);
  };

  //왼쪽 클릭 시 월을 하나씩 줄여주는 함수
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
