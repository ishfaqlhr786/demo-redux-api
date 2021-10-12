import React,{useState,useEffect,useCallback} from 'react';
import axios from 'axios';

export const AxiosRestApi = () => {
  const [name,setName]=useState("");
  //const [name1,setName1]=useState("");
  const [address,setAddress]=useState("");

  const [data, setData] = useState([]);//for fetching data from local json
/*
  useEffect(()=>{
    axios.get("http://localhost:7777/posts")
    .then(response => {
        console.log(response)
        setData(response.data)
    })
},[]) */
const fetchData = useCallback( () => {
    axios.get("http://localhost:7777/posts")
    .then(response => {
        console.log(response)
        setData(response.data)
    })
    
 }, []);
useEffect(() => {
    fetchData();
}, [fetchData]);



  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(name,address);
    axios.post("http://localhost:7777/posts",{name,address}).then(()=>{

    console.log("post created successfully");
    fetchData();
    })
  }
  const UpdatePost=(id,e)=>{
    axios.put(`http://localhost:7777/posts/${id}`,{name,address}).then(()=>{

        console.log("post created successfully");
        fetchData();
        })
  }
  const deletePost=(id,e)=>{
      alert("do u want delete?");
      axios.delete(`http://localhost:7777/posts/${id}`)
      
      .then(()=>{
          
         fetchData();
         alert("recode deleted");
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
     <table style={{border:"2px solid red"}}>
         <tr>
         <th>Id</th>
             <th>Name</th>
             <th>Address</th>
             <th>Action</th>
         </tr>
     {data.map(data  => (
     
     <tr key={data.id}>
       
       
        <td> {data.id}</td>
        
         <td>{data.name}</td><td> {data.address}</td>

    
        
     <td><button onClick={(e) => deletePost(data.id, e)}>Delete</button></td><td><button
     onClick={(e) => UpdatePost(data.id, e)}
     >Edit</button></td>
     </tr>)
               )}
     </table>
     
      <ul>
               {data.map(data=> (<li key={data.id}>{data.id}  {data.name} {data.address}</li>)
               )}
            </ul>
            <ul>
                       </ul>
        
      
    </div>
  )
}
