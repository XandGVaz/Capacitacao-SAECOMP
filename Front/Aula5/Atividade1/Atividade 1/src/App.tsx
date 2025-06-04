import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";


function App() {
  
  const [count, setcount] = useState<number>(0);
  
  const urls = ['/home', '/sobre-nos', '/login'];

  useEffect(()=>{
    console.log(count);
  }, [count]);



  return( 
    <div>
      <NavBar
        urls={urls}// dentro de chaves por ser uma parte do tsx dentro do html
      />
      <p>{count}</p>
      <button
        onClick={()=>{
          setcount(count+1);
        }}
      >
         +1
      </button>
    </div>
  );
}

export default App
