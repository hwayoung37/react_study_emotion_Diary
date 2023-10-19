import { DiaryStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

// ⭐상세페이지 만들기 1. 데이터 가지고 오기(DiaryStateContext)
const Diary = () => {
  // ✅useParams : path variable을 객체로 가져온다. react-router의 커스텀 훅스
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []);

  //id와 diaryList가 변경될 때만 수행
  useEffect(() => {
    if (diaryList.length >= 1) {
      //다이어리가 하나라도 있을 때
      const targetDiary = diaryList.find(
        //diaryList의 id와 useParams로 사용하는 id가 일치하는 다이어리를 찾는다
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        //일기가 존재할 때는 상태를 만들어서 거기에 넣어줘야한다
        setData(targetDiary);
      } else {
        //일기가 없을 때
        alert("없는 일기입니다."); //⛔두번뜨는 이유?
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    // emotionList의 id가 현재 데이터의 이모션번호와 일치하는 요소를 확인 -> 이미지와 description 들고오기
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              // 이모션 배경화면 설정
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
