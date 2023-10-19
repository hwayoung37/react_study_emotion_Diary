# 하루의 감정을 기록할 수 있는 감정일기장

**한입 크기로 잘라 먹는 리액트(udemy)**
<br />
<br />

**<프로젝트 기초 공사>**

1. 라우팅
   
- `react-router-dom` 라이브러리 사용
- src폴더의 page폴더에서 사용할 페이지 컴포넌트 만들기(`Home`, `New`, `Edit`, `Diary`)

2. 폰트, 레이아웃, 이미지 에셋 세팅

- 레이아웃(스타일) 세팅 : App의 최상단 태그는 `body`이므로 `body`부터 스타일 적용
- 이미지 세팅 : public 폴더에 위치

3. 공통 컴포넌트 세팅

- prop으로 사용할 요소 찾기 - 공용 컴포넌트로 사용할 것들의 규칙 파악
* MyButton 컴포넌트
  * `props` : type(className으로 스타일 구분), text, onClick
  * type은 `defaultProps` 설정
* MyHeader 컴포넌트
  * `props` : headText, leftChild, rightChild

4. 상태관리 세팅

- `useReducer` : 컴포넌트에서 상태변화로직을 분리
- `context API` : 데이터를 컴포넌트 전역에서 관리. dispatch함수도 중첩 context를 만들어 공급
<br />
<br />

**<페이지 구현>**

1. Home

- `context`에서 전체 일기 data 불러오기 : diaryList
- `state` 1. data : header 날짜에 따라 다르게 출력되는 일기 data 2. curDate : header 날짜
- `useEffect` : curDate, diaryList 변경 시 setData 실행
* diaryList 컴포넌트
  - ControlMenu 컴포넌트
  - `props` : diaryList
  - `state` 1. sortType : 정렬기준 2. filter : 감정필터
  - 옵션에 따라 list 정렬시키는 함수
  * DiaryItem 컴포넌트
    - `props` : id, emotion, content, date
    - useNavigate : 상세페이지, 수정페이지로 이동

2. Diary(상세페이지)

- `context`에서 전체 일기 data 불러오기 : diaryList
- `state` 1. data : useParams로 가져온 path variable인 id와 일치하는 diaryList의 일기 데이터
- `useEffect` : id, diaryList 변경 시 setData 실행

3. Edit(일기쓰기)

- `context`에서 전체 일기 data 불러오기 : diaryList
- `state` 1. originData : useParams로 가져온 path variable인 id와 일치하는 diaryList의 일기 데이터
- `useEffect` : id, diaryList 변경 시 setData 실행
* DiaryEditor 컴포넌트 - originData가 있으면 출력
  - `props` : isEdit, originData
  - `state` 1. content 2. emotion 3. date
  - `context`에서 Dispatch 함수 불러오기 : onCreate, onEdit, onRemove
  - `useEffect` : idEdit가 있을 때 state 3개 변경함수 실행
  - isEdit에 따라 수정화면인지, 새 일기작성 화면인지 렌더링 달라짐
<br />
<br />

**<DB, 최적화, 배포>**

1. `LocalStorage`를 데이터베이스로 사용
2. 최적화
- `React.memo` : &lt;DiaryItem&gt;의 부모 컴포넌트에서 옵션값(state)이 변경되면, &lt;DiaryItem&gt;에서 불필요하게 렌더링이 일어나는 것을 막는다.
- `useCallback`
3. 배포준비 : title, content, lang, favicon 수정
4. 배포 : `firebase`
<br />
<br />

✅state 설정 기준 : 데이터를 어떤 기준으로 출력할 것인가   
✅useEffect는 page컴포넌트에서 주로 사용   
✅context에서 데이터를 가지고 오는 것도 주로 page컴포넌트   

