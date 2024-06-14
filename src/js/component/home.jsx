import React,{useState,useEffect} from "react";

//create your first component
const Home = () => {
	//Variables to be used
	const noTask = ["~There is no active tasks~"];	// the first task just to be a placeholder. Will be replaced by the first real task
	const [tasks, setTasks ] = useState(noTask); // task list
	const [newTask, setNewTask] = useState("");  //new task as a string
	const [taskEditDiv, setTaskEditDiv] = useState("") //state to know if the mouse is over a task or not
	const [info, setInfo] = useState([]);
    const [data, setData] = useState({
         title: "",
         body: "",
         userId: 1
    })

	// function to know if the user is pressing the "enter" botton in the form input
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
		  addAndErase(); //we are doing the add and erase function
		}
	};

	//Delete a task by its position

	const deleteTask = (index) => {
		const taskToDelete = [...tasks];
		//console.log(index)
		taskToDelete.splice(index,1);
		setTasks(taskToDelete);
	}

	// Add and erase function .... add new task to the task list and we erase the current value in the input form 
	const addAndErase= () => {
		if (tasks[0] == noTask[0] && newTask !== "") {
			setTasks([newTask])
			setNewTask("");
			//console.log("first task")
		}
		else if (newTask != ""){
			setTasks([...tasks, newTask]);
			setNewTask("");
			//console.log("second ore more task")
		}
	}

	// Get the info from the API

	 async function getInfo() {
         try {
             const response = await fetch(
                 "https://playground.4geeks.com/todo/docs#/Todo%20operations"
             );
             const infoData = await response.json(); // JavaScript Object Notation
             setInfo(infoData);
         } catch (e) {
             console.log(e);
         }
     }

     useEffect(() => {
         getInfo();
     }, []);

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">My To Do List!</h1>
			<div className="border border-dark rounded m-auto my-5 w-50 p-3">
				<div className="input-group  ">
					<input type="text" className="form-control" placeholder="What needs to be done?" value={newTask} 
						onChange={(e) => setNewTask(e.target.value)} 
						onKeyDown={handleKeyPress} //event when the user click the enter button
					/>
					<button 
						className="btn btn-outline-primary" 
						type="button" 
						onClick={addAndErase}
					>
						Add
					</button>
				</div>
				{tasks.map((task, index) => (
          			<div className = "d-flex justify-content-center border-top border-dark mt-3 py-2"
						onMouseEnter={() => setTaskEditDiv(index)}
						onMouseLeave={() => setTaskEditDiv("")}
						key={index} >
						{taskEditDiv === index && tasks[0] != noTask[0] ? 
							<div className = "bg-primary text-light p-2 rounded border border-light d-flex justify-content-between w-100 h-100">
								<div className="d-flex align-items-center">{task}</div>
								<button className="btn btn-outline-light"
									onClick={()=>deleteTask(index)}> 
									DONE! 
								</button>
							</div>:
							<div className = "d-flex justify-content-start w-100 h-100">
							<div className="d-flex align-items-center">{task}</div>
							</div> }
					</div>
        		))}			
			</div>	
		</div>
	);
};

export default Home;
