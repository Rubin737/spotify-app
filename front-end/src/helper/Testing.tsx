import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";

const Testing = () => {
 
  const [count,setCount]=useState(0)

const handleClick = () => {
//   setCount(function increment (current){
//     return  current+1
    
//   })
//   console.log(count);
//   setCount(function increment (current){
//     return  current+1
    
//   })
//   console.log(count);
//   setCount(function increment (current){
//     return  current+1
    
//   })
//   console.log(count);
// // }
  setCount(count+1)
  console.log(count);
  setCount(count+1)
  console.log(count);
  setCount(count+1)
  console.log(count);
  


}


  return (
    <>
      <button className="border p-3" onClick={handleClick}>Click</button>
      <p>{count}</p>
     
    </>
  );
}

export default Testing