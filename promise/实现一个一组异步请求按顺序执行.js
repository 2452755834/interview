const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3
})
/*
 *@Description: 利用reduce，初始值传入一个Promise.resolve()，之后往里面不停的叠加.then()
                 利用forEach，本质和reduce原理相同
                 还可以用ES9中的for...await...of来实现。
 *@author: 卢少川 
 *@param: {  } []  =>
 *@return: 
 *@Date: 2022-06-22 17:58:38
*/
// function mergePromise(arr) {
//   const data = []
// // let promise=Promise.resolve()
// //   arr.forEach(p => {
// //    promise= promise.then(p).then(count=>{
// //       data.push(count)
// //       return data
// //     })
// //   });
// //   return promise
//   // 在这里写代码
//  return  arr.reduce((cur,next)=>{
//     return cur.then(next).then(res=>{
//       data.push(res)
//       return data
//     })
//   },Promise.resolve())
// }
async function mergePromise(arr) {
  const data = []
  for (const ajax of arr) {
    await Promise.resolve().then(ajax).then(count => {
      data.push(count)
      return data
    })
  }
}
mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]