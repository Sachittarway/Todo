'use client';
import { useState, useEffect } from "react";
import { Card, Input, Row } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Cards from "./cards";
import Link from "next/link";
import "../app/globals.css";
import { Modal, useModal, Text } from "@nextui-org/react";

export default function Home() {
  const [des, setDes] = useState("");
  const [whole, setWhole] = useState([]);
  const { setVisible, bindings } = useModal();
  const [temp, setTemp] = useState("");
  const [ids, setIds] = useState("");

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      setWhole(todos);
    }
  }, []);

  

  const onChange = (e) => {
    setDes(e.target.value);
  };

  const changed = (e) => {
    setTemp(e.target.value);
  };

  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const submitData = () => {
    if(des===""){
      alert("Please Enter Task");
    }else{
      const newTodo = {
        id: Date.now(),
        description: des,
        bool: false,
    }

    const updatedTodos = [...whole, newTodo];
    setWhole(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);

    setDes("");
  };
}

  const handleDelete = (id) => {
    const updatedTodos = whole.filter((todo) => todo.id !== id);
    setWhole(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const handleUpdate = (id) => {
    setVisible(true);
    setIds(id);

    const todo = whole.find((item) => item.id === id);
    setTemp(todo.description);
  };

  const updateTodo = () => {
    const updatedTodos = whole.map((todo) => {
      if (todo.id === ids) {
        return {
          ...todo,
          description: temp,
        };
      }
      return todo;
    });

    setWhole(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);

    setVisible(false);
    setIds("");
  };

  const handleCheck = (id) => {
    const updatedTodos = whole.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          bool: !todo.bool,
        };
      }
      return todo;
    });

    setWhole(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  return (
    <div className="parent">
      <Card className="card" css={{ mw: "700px" }}>
        <Card.Header css={{ alignItems: "center" }}>
          <Text b>TODO APP😊</Text>
        </Card.Header>
        <Card.Divider />
        <div
          style={{
            display: "flex",
            marginTop: "5px",
            marginLeft: "10px",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <Input
            clearable
            bordered
            width="500px"
            value={des}
            onChange={onChange}
            Placeholder="Description"
            name="desc"
            css={{ mw: "700px" }}
          />
          <Button
            shadow
            color="success"
            onPress={submitData}
            auto
            css={{ mw: "100px", marginLeft: "10px" }}
          >
            Add Task
          </Button>
        </div>

        <div>
          {whole.length > 0 ? (
            <div className="originalcard">
              {whole.map((item) => (
                <Cards
                  id={item.id}
                  className="singlecard"
                  description={item.description}
                  onclick={() => handleDelete(item.id)}
                  onUpdate={() => handleUpdate(item.id)}
                  onCheck={() => handleCheck(item.id)}
                  buttonValue={item.bool}
                />
              ))}
            </div>
          ) : (
            <h1>ADD TASK</h1>
          )}
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
            <Input
              clearable
              bordered
              width="500px"
              value={temp}
              onChange={changed}
              labelPlaceholder="Description"
              name="desc"
            />
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => removed()}>
            Close
          </Button>
          <Button auto onPress={() => updateTodo()}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
