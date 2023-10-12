import React from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  //이미지가 안뜬다면
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  //날짜데이터 가공하기
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  //디테일 다이어리 버튼 함수
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  //수정하기 버튼 함수
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          ` emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
//item컴포넌트의 부모컴포넌트에서 필터값이 변경되면 list컴포넌트에서 관리하는 state의 값이 변경되어 불필요한 렌더링이 일어나는걸 막음
