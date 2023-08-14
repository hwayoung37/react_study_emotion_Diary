const MyButton = ({ type, text, onClick }) => {
  // 이 배열 안에 타입이 있는지 확인하고 있으면 그대로, 없으면 default 반환
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// 버튼타입을 전달하지 않으면 "default"
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
