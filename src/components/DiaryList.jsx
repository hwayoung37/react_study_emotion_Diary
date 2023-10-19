import React, { useState, useEffect } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// ✅ React.memo : 전달되는 prop이 바뀌지 않으면 렌더링 일어나지 않도록 최적화하는 기법
// ⛔prop 중 onChange 함수는 부모컴포넌트가 리렌더링되면 useMemo가 정상적으로 동작하지 않는데 여기서는 왜 정상동작하는지?(onChange가 리렌더링 발생하지 않는 이유?)
// useState가 반환하는 상태 변환함수를 받고있기 때문. 따로 핸들링 하는 함수를 만들어서 넣는다면 그 함수는 새로 렌더링 되므로 리액트메모 정상동작 하지 않음!
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  //정렬기준
  const [sortType, setSortType] = useState("latest");
  //감정필터
  const [filter, setFilter] = useState("all");

  //옵션에 따라 List 정렬시키는 함수
  const getProcessedDiaryList = () => {
    //감정 필터링 함수(filterOption)
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    //데이터의 날짜를 비교해서 정렬시키는 함수(sortOption)
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); //문자열이 들어올 수 있으므로 숫자형으로 바꿔주기
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //데이터를 깊은 복사를 해서 복사본을 정렬 -> diaryList 원본 data를 건들지 않기 위해
    //diaryList를 json화 시키고 얘를 다시 JSON.parse를 통해 배열로 만들기
    const copyList = JSON.parse(JSON.stringify(diaryList));

    //필터 옵션에 따라 필터링 목록(filteredList) 생성 : filter가 all이면 copyList 그대로 사용하고, 아니면 filterCallBack함수를 사용하여 필터링
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    //위에서 필터링한 filteredList를 sort메서드를 사용하여 정렬.
    //sort는 두개의 인자를 받아서 비교하는 비교함수가 필요한데, 위에서 정의한 compare 사용
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
        // {...it} 을 DiaryItem 컴포넌트에 props로 전달
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
