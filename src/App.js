import React,{useState,useEffect} from 'react';
import axios from 'axios';

export const App = () => {
  const [name,setName]=useState("");
  const [address,setAddress]=useState("");

  const [data, setData] = useState([]);//for fetching data from local json

  useEffect(()=>{
    axios.get("http://localhost:7777/posts")
    .then(response => {
        console.log(response)
        setData(response.data)
    })
},[])


  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(name,address);
    axios.post("http://localhost:7777/posts",{name,address}).then(()=>{

    console.log("post created successfully");
    })
  }
  
  return (

    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>name</label>
        <input type="text"
        value={name}
        onChange={(e)=>{
          setName(e.target.value)
        }}/>
        <label>Address</label>
        <input type="text"
        value={address}
        onChange={(e)=>{
          setAddress(e.target.value);
        }}
      
        />
        
        <input type="submit" value="submit"/>
      </div>
      </form>  
      <ul>
               {data.map(data=> (<li key={data.id}>{data.name} {data.address}</li>)
               )}
            </ul>
        
      
    </div>
  )
}
