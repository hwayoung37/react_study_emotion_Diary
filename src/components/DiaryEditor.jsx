// 새일기쓰기 페이지와 수정하기 페이지의 형태가 동일하므로 컴포넌트를 만들어서 재사용 가능하도록
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { DiaryDispatchContext } from "./../App.js";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  // <emotionItem>을 클릭하면 onClick prop으로 emotion_id를 받으면서
  // 현재 어떤 emotion이 선택됐는지 알 수 있다
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return; //더 이상 진행 못하도록
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true }); // 홈으로 돌아가게 ✅replace: true 작성 완료 후 뒤로가기 못하도록
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      //idEdit가 있을때 이 페이지가 렌더링 됨
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        // Navigate(-1) : 뒤로가기
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
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
