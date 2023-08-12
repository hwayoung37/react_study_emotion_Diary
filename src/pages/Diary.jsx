import { useParams } from "react-router-dom";

const Diary = () => {
  // ✅useParams : path variable을 객체로 가져온다. react-router의 커스텀 훅스
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 Diary 입니다.</p>
    </div>
  );
};

export default Diary;
