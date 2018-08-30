import axios from "axios"

export default function ajax(url,data={},type="GET") {
  return new Promise((reslove,reject)=>{
    let promise;
    if(type==="GET"){
      let paramStr = '';
      Object.keys(data).forEach(key=>{
        paramStr += key+"="+data[key]+"&";
      })
      if(paramStr){
        paramStr=paramStr.substring(0,paramStr.length-1);
      }
      promise=axios.get(url+"?"+paramStr);
    }else if(type==="POST"){
      promise=axios.post(url,data);
    }
    promise.then(res=>{
      reslove(res.data);
    })
      .catch(err=>{
        reject(err);
      })
  })
}
