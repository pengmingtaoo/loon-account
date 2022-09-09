let id: number = parseInt(window.localStorage.getItem('_idMax') ||'0')||0;
//第一个0，保底有字符串；第二个0 ，保底是个0，不至于食Nan,null;
function createId(){
  id++
  return id
}
export default createId