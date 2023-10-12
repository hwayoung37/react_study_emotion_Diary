import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

// 원본 데이터를 가져오는 작업
const Edit = () => {
  const [originData, setOriginData] = useState();

  const navigate = useNavigate();
  // ✅useNavigate : 페이지를 이동시키는 함수를 반환
  const { id } = useParams();
  // ✅useParams : PathVariable을 Edit 컴포넌트에서 받아와야 한다
  // ✅useSearchParams : 쿼리스트링

  const diaryList = useContext(DiaryStateContext);
  //DiaryStateContext가 제공하는 diaryList 데이터를 받아온다

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id) //params로 가져온 id가 string일 수 있으므로 형변환
      );
      console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        //targetDiary가 없을 때 = undefined일 때 = false일 때 홈으로
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {/* originData가 있으면 <DiaryEditor /> 출력 */}
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;

// ⛔ No routes matched location "/edit/1" - 이 경로에 매치되는 컴포넌트가 설정한 라우팅에는 없다
// <Route path="/edit/:id" element={<Edit />} />
