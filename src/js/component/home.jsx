import React, { useState, useEffect } from "react";

const Home = () => {
  const apiURL = "https://playground.4geeks.com/todo";
  const user = "LuisenEstrada"; //the user we are going to use in this practice
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addNewTask = (newTask) => {
    if (newTask != "") {
      sendTasksToApi({ label: newTask, is_done: false });
    }
  };

  const keyPressNewUser = (e) => {
    if (e.key === "Enter") {
      addNewTask(newTask); //
    }
  };

  //Sen NewTask to the API

  const sendTasksToApi = async (task) => {
    const response = await fetch(`${apiURL}/todos/${user}`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTasks(tasks.concat(data));
      setNewTask("");
    }
  };

  const deleteTask = async (id) => {
    const response = await fetch(`${apiURL}/todos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setTasks(tasks.filter((item) => item.id != id));
    }
  };

  //Create new user
  const createUser = async () => {
    const response = await fetch(`${apiURL}/users/${user}`, {
      method: "POST",
    });
    console.log(response.status);
  };

  //Get user Tasks
  const getTasks = async (user) => {
    const response = await fetch(`${apiURL}/users/${user}`);
    if (response.status == 404) {
      createUser();
      return;
    }
    if (response.ok) {
      const data = await response.json();
      setTasks(data.todos);
    }
  };

  //useEsffect to create new users and get the task list of the user
  useEffect(() => {
    getTasks(user);
  }, []);

  return (
    <div className="conteiner">
      <h1 className="text-center my-5">My to do list with API !</h1>
      <div className="border border-dark rounded m-auto my-3 w-50 p-3">
        <div className="input-group  ">
          <input
            type="text"
            className="form-control"
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={keyPressNewUser} //event when the user click the enter button
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => addNewTask(newTask)}
          >
            <div className="text"> Add</div>
          </button>
        </div>
      </div>
      <div className="border border-dark rounded m-auto my-3 w-50 p-3">
        {tasks.length != 0 ? (
          tasks.map((task) => (
            <div
              className="d-flex align-items-center justify-content-between"
              key={task.id}
            >
              <div className="w-100 border border-dark p-2 rounded-2 my-2 mx-1">
                {task.label}
              </div>
              <div>
                <button
                  className="btn  btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <div className="w-100 d-flex justify-content-center border border-dark p-2 rounded-2 my-2 mx-1">
              There is no current tasks
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
