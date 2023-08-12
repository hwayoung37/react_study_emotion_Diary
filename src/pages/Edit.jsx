import { useNavigate, useSearchParams } from "react-router-dom";

// ✨React Router Dom의 유용한 기능
// 1. Path Variable(useParams)   2. Query String(페이지 라우팅에 영향X)   3. Page Moving(useNavigate)
// query : 웹페이지에 데이터를 전달하는 가장 간단한 방법. 물음표와 키/값을 사용하여 데이터 전달.

const Edit = () => {
  const navigate = useNavigate();
  // ✅useNavigate : 페이지를 이동시키는 함수를 반환

  const [searchParams, setSearchParams] = useSearchParams();
  // ✅setSearchParams : searchParams를 변경시킬 수 있다 = 실시간으로 query string 변경 가능

  // id가져오기 : 전달받은 query string을 꺼내 올 수 있다.
  const id = searchParams.get("id");
  console.log(id);

  const mode = searchParams.get("mode");
  console.log(mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 Edit 입니다.</p>
      <button onClick={() => setSearchParams({ who: "winterlood" })}>
        qs 바꾸기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
