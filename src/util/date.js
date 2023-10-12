// ✅toISOString(): ISO형식의 문자열을 반환하는 메서드
// console.log(new Date().toISOString());  //2023-09-12T21:52:37.804Z
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
