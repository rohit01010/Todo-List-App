import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import db from "./firebase";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([""]);

  useEffect(() => {
    db.collection("users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const [input, setInput] = useState("");

  const addTodos = (event) => {
    event.preventDefault();
    // setTodos([...todos, input]);
    db.collection("users")
      .add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => alert(err.message));

    setInput("");
  };

  return (
    <div className="App">
      <h1>Todo - App</h1>
      <div className="App__input">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Task"
              autoComplete="off"
            />
          </Form.Group>
          <Button
            style={{ float: "left" }}
            disabled={!input}
            variant="primary"
            type="submit"
            onClick={addTodos}
          >
            Submit
          </Button>
        </Form>
      </div>
      <div className="App__display">
        <ListGroup>
          {todos.map((todo) => {
            return (
              <ListGroup.Item>
                <p>{todo.todo}</p>
                <Button
                  onClick={(event) =>
                    db.collection("users").doc(todo.id).delete()
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
}

export default App;
