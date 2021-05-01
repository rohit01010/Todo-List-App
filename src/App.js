import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import db from "./firebase";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([""]);
  const [currTask, setCurrTask] = useState(0);

  useEffect(() => {
    db.collection("users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            status: doc.data().status,
          }))
        );
      });
  }, []);

  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editToggle, setEditToggle] = useState("");
  const [markerWidth, setWidth] = useState("20px");
  const [markerLeft, setLeft] = useState("10px");

  const addTodos = (event) => {
    event.preventDefault();
    // setTodos([...todos, input]);
    db.collection("users")
      .add({
        todo: input,
        status: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => alert(err.message));

    setInput("");
  };

  return (
    <div className="App">
      <h1>TODO</h1>
      <div className="App__Box">
        <div className="App__input">
          <form>
            <p>+</p>
            <input
              type="text"
              placeholder="Create a new todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input}
              variant="primary"
              type="submit"
              onClick={addTodos}
            >
              ADD
            </button>
          </form>
        </div>
        <div className="App__display">
          <ul>
            {todos
              .sort((a, b) => (a.status == true && b.status == false ? 1 : -1))
              .map((todo) => {
                if (
                  currTask == 0 ||
                  (currTask == 1 && todo.status == false) ||
                  (currTask == 2 && todo.status == true)
                ) {
                  return (
                    <>
                      <li>
                        <div className="checkbox__cover">
                          <input
                            type="checkbox"
                            checked={todo.status}
                            onChange={(e) => {
                              db.collection("users")
                                .doc(todo.id)
                                .update({ status: e.target.checked });
                            }}
                          />
                        </div>
                        <p
                          style={
                            todo.status
                              ? { textDecoration: "line-through" }
                              : { textDecoration: "none" }
                          }
                        >
                          {todo.todo}
                        </p>
                        <button
                          onClick={() => {
                            setEditInput(todo.todo);
                            setEditToggle(todo.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() =>
                            db.collection("users").doc(todo.id).delete()
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </li>
                      {editToggle == todo.id ? (
                        <li className="editItem">
                          <input
                            value={editInput}
                            onChange={(e) => {
                              setEditInput(e.target.value);
                            }}
                          ></input>
                          <button
                            onClick={() => {
                              db.collection("users").doc(todo.id).update({
                                todo: editInput,
                              });

                              setEditInput("");
                              setEditToggle("");
                            }}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            onClick={() => {
                              setEditInput("");
                              setEditToggle("");
                            }}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </li>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }
              })}
          </ul>
        </div>
        <div className="App_controls">
          <p>{todos.filter((todo) => !todo.status).length} items left</p>
          <nav>
            <span
              id="marker"
              style={{ width: markerWidth, left: markerLeft }}
            ></span>
            <a
              className={currTask == 0 ? "active" : ""}
              onClick={(e) => {
                setCurrTask(0);
                console.log(e);

                setWidth(e.target.offsetWidth + "px");
                setLeft(e.target.offsetLeft + "px");
              }}
            >
              All
            </a>
            <a
              className={currTask == 1 ? "active" : ""}
              onClick={(e) => {
                setCurrTask(1);
                console.log(e);

                setWidth(e.target.offsetWidth + "px");
                setLeft(e.target.offsetLeft + "px");
              }}
            >
              Active
            </a>
            <a
              className={currTask == 2 ? "active" : ""}
              onClick={(e) => {
                setCurrTask(2);
                console.log(e);
                setWidth(e.target.offsetWidth + "px");
                setLeft(e.target.offsetLeft + "px");
              }}
            >
              Completed
            </a>
          </nav>
          <a
            onClick={() => {
              const confirmBox = window.confirm(
                "Do you want to delete all completed tasks?"
              );
              if (confirmBox === true) {
                todos.map((todo) => {
                  if (todo.status === true) {
                    db.collection("users").doc(todo.id).delete();
                  }
                });
              }
            }}
          >
            Clear Completed
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
