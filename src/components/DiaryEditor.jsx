// 새일기쓰기 페이지와 수정하기 페이지의 형태가 동일하므로 컴포넌트를 만들어서 재사용 가능하도록
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

// ✅toISOString(): ISO형식의 문자열을 반환하는 메서드
// console.log(new Date().toISOString());  //2023-09-12T21:52:37.804Z
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate } = useContext(DiaryDispatchContext);

  // <emotionItem>을 클릭하면 onClick prop으로 emotion_id를 받으면서
  // 현재 어떤 emotion이 선택됐는지 알 수 있다
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  //
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return; //더 이상 진행 못하도록
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true }); // 홈으로 돌아가게 ✅replace: true 작성 완료 후 뒤로가기 못하도록
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        // Navigate(-1) : 뒤로가기
      />
      <section>
        {/* section 태그는 시맨틱태그 : 의미론적 태그로 div 태그와 같음 */}
        <h4>오늘은 언제인가요?</h4>
        <div className="input_box">
          <input
            className="input_date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
        </div>
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((it) => (
            // <div key={it.emotion_id}>{it.emotion_descript}</div>
            <EmotionItem
              key={it.emotion_id}
              {...it}
              onClick={handleClickEmote}
              //isSelected: emotion자신이 선택이 됐는지 안됐는지 확인하는 props(선택true, 안됨falus) -> 선택에 따라 스타일 바꾸기 위해서
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="input_box text_werapper">
          <textarea
            placeholder="오늘은 어땠나요"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
          <MyButton
            text={"작성완료"}
            type={"positive"}
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
