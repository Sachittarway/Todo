'use client';
import { Card, Input, Row} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState,useEffect } from "react";
import Cards from "./cards";
import Link from "next/link";
import '../app/globals.css'
import { Modal, useModal, Text } from "@nextui-org/react";

export default function Home() {
  const [des, setDes] = useState("");
  const [whole, setWhole] = useState([]);
  const { setVisible, bindings } = useModal();
  const [temp, setTemp] = useState("");
  const [ids, setIds] = useState("");

  useEffect(()=>{
    getData();
  },[]);

  const onChange = (e) => {
    setDes(e.target.value);
  }
  const changed = (e) => {
    setTemp(e.target.value);
  }

  const getData = async() =>{
    await fetch ("http://localhost:8080/mydata",{
        method:"GET"
    })
    .then((res)=>res.json())
    .then((data)=>{console.log(data);
        setWhole(data);
    })
  }

  const submitData = () =>{
    fetch("http://localhost:8080/mydata",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        description: des,
        bool: false
      })
    })
    .then((response)=>{
      if(response.ok){
        getData();
        setDes("");
      }
    })
  }

  const handleDelete = async(id) =>{
    await fetch(`http://localhost:8080/mydata/${id}`,{
        method:"DELETE"
    }).then((res)=>{
      if(res.ok){
        getData();
      }
    })
  }

  const handleupdate = async(id) =>{
    console.log(id);
    setVisible(true);
    setIds(id);
    await fetch(`http://localhost:8080/mydata/${id}`,{
      method:"GET"
   }).then((res)=>res.json())
   .then((data)=>{
      setTemp(data.description);
   })
  }

  const updates = async() =>{
    await fetch(`http://localhost:8080/mydata/${ids}`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        description: temp,
        bool: false
      })
    }).then((res)=>{
      if(res.ok){
        getData();
        setVisible(false);
      }
    })
  }

  const removed = () =>{
    setVisible(false);
    setIds("");
  }

  const handleCheck = async(id) =>{
    await fetch(`http://localhost:8080/mydata/${id}`,{
      method:"GET"
   }).then((res)=>res.json())
   .then((data)=>{
      fetch(`http://localhost:8080/mydata/${id}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          description: data.description,
          bool: !data.bool
        })
      }).then((res)=>{
        if(res.ok){
          getData();
        }
      })
   })
  }
  return (
    <div className="parent" >
      <Card className="card"css={{ mw: "700px" }} >
        <Card.Header css={{alignItems:"center"}}>
          <Text b>TODO APP😊</Text>
        </Card.Header>
        <Card.Divider />
        <div  style={{ display: 'flex',marginTop:"5px", marginLeft:"10px", marginBottom:"10px", marginTop:"20px"}}>
          <Input clearable bordered width="500px" value={des} onChange={onChange} Placeholder="Description" name="desc" css={{ mw: "700px" }}/><br /><br />
          <Button shadow color="success" onClick={submitData} auto css={{ mw: "100px", marginLeft:"10px"}}>Add Task</Button>
        </div>
      
        <div >
          {
            whole.length>0 ? 
              (
                <div className="originalcard"  >
                  {
                    whole.map((item)=>{
                      return(
                        <Cards id={item.id} className="singlecard" description={item.description} onclick={()=>handleDelete(item.id)} onUpdate={()=>handleupdate(item.id)} onCheck={()=>handleCheck(item.id)} buttonValue={item.bool}/>
                      )
                    })
                  }
                </div>
              ):
              (
                <h1>ADD TASK</h1>
              )
          }
        
        </div>
        <Card.Footer className="footer">
          <Text>Created By Sachit💗</Text>
        </Card.Footer>
      </Card>
      
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Update Data
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
          <Input clearable bordered width="500px" value={temp} onChange={changed} labelPlaceholder="Description" name="desc" /> 
            
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => removed()}>
            Close
          </Button>
          <Button auto onPress={() => updates()}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
