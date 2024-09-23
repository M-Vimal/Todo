import { auth, db } from "../firebase";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
const Todo = ({ msg }) => {
  const [tasks, settasks] = useState([]);
  const [addtask, setaddtask] = useState(false);
  const newtaskref = useRef("");
  const updatedtaskref = useRef("");
  const [taskupdate, settaskupdate] = useState(false);
  const [change, setchange] = useState(false);
  const [val, setval] = useState();
  const [updateid, setupdateid] = useState();
  const navigate = useNavigate();
  const msgg = msg;
  useEffect(() => {
    const tasks = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        navigate("/login");
      }
      const collectionref = collection(db, "Todos");
      const q = query(collectionref, where("userid", "==", uid));
      try {
        let result = [];
        const snapshot = await getDocs(q);
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        settasks(result);
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    };

    tasks();
  }, [change]);
  const add = () => {
    setaddtask(!addtask);
  };

  const handleadd = async (e) => {
    e.preventDefault();
    const newtask = newtaskref.current.value;
    const uid = localStorage.getItem("uid");
    try {
      await addDoc(collection(db, "Todos"), {
        userid: uid,
        todos: newtask,
        status: "todo",
      });
      setaddtask(!addtask);
      setchange(!change);
    } catch (err) {
      console.error("error", err);
    }
  };

  const handledelete = async (task) => {
    try {
      await deleteDoc(doc(db, "Todos", task));
      setchange(!change);
    } catch (err) {
      console.error("error", err);
    }
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    const updatedtask = updatedtaskref.current.value;
    console.log(updatedtask);

    try {
      await updateDoc(doc(db, "Todos", updateid), {
        todos: updatedtask,
      });
      setchange(!change);
      settaskupdate(!taskupdate);
      setval("");
      setupdateid(null);
    } catch (err) {
      console.error("error", err);
    }
  };

  const beforeupdate = async (taskid) => {
    settaskupdate(!taskupdate);
    const docs = doc(db, "Todos", taskid);

    const updatedoc = await getDoc(docs);
    if (updatedoc) {
      const v = updatedoc.data();
      setval(v.todos);
      setupdateid(taskid);
      console.log("val", val);
    }
  };

  const handlelogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
      navigate("/");
    } catch (error) {
      console.error("error", error);
      alert(error);
    }
  };

  return (
    <div className="maindiv">
      <h1>Todossss..</h1>
      <div className="table-div">
        <table className="table">
          <thead>
            <tr>
              <th>task</th>
              <th>status</th>
              <th>update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.todos}</td>
                <td>{task.status}</td>
                <td>
                  <button className="btn"
                    onClick={() => {
                      beforeupdate(task.id);
                    }}
                  >
                    update
                  </button>
                </td>
                <td>
                  <button className="btn"
                    onClick={() => {
                      handledelete(task.id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addtask && (
        <form onSubmit={handleadd}>
          <div className="add-div">
            <label>Add Task</label>
            <input type="text" ref={newtaskref} />
            <input type="submit" />
          </div>
        </form>
      )}
      {taskupdate && (
        <form onSubmit={handleupdate}>
          <div className="update-div">
            <label>Task</label>
            <input type="text" defaultValue={val} ref={updatedtaskref} />
            <input type="submit" />
          </div>
        </form>
      )}
      <div className="btn-div">
        <button onClick={add} className="btn">
          <h5>Add Todo</h5>
        </button>

        <button onClick={handlelogout} className="btn btn-danger">
          <h5>Logout</h5>
        </button>
      </div>
    </div>
  );
};

export default Todo;
