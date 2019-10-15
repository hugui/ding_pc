export function GetUrlParams(location, paraName) {
  const arrStr = location.search;
  const arrOld = arrStr.slice(1, arrStr.length).split('&');
  if (arrOld.length > 0) {
    let newArr = [];
    for (let i = 0; i < arrOld.length; i++) {
      newArr = arrOld[i].split('=');
      if (newArr != null && newArr[0] === paraName) {
        return newArr[1];
      }
    }
    return '';
  } else {
    return '';
  }
}
