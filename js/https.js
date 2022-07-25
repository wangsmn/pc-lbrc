const get = (url, callBack) => {
  axios.get(url)
    .then(response => {
      callBack(response)
    })
}


const post = (url, param, callBack) => {
  axios.post(url, param)
    .then(response => {
      console.log(response);
      callBack(response)
    })
}