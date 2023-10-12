import React from "react";
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick, //전달받는 요소 중 함수가 있으므로 useCallback처리
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
