import React,{ useState,useEffect } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./components/task";

class Tasks extends React.Component{
//  function Tasks(){
    // state = { tasks: [], currentTask: "" };
    // const [tasks,setTasks]=useState([])
    // const [currentTask,setCurrentTask]=useState("")

    async componentDidMount() {
        try{
            const { data } =  await getTasks();
            this.setState({ tasks: data });
        }
        catch(error){
            console.log(error);
        }
      }

//    useEffect(() => {
//         async function fetchMyAPI(){
//             try {
//                 const { data } =  await getTasks();
//                 setTasks({ tasks: data });
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchMyAPI()
//     }
//    , [])

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const { data } = await addTask({ task: this.state.currentTask });
            const tasks = originalTasks;
            tasks.push(data);
            this.setState({ tasks, currentTask: "" });}
        catch(error){
            console.log(error);
        }
        }

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            await updateTask(currentTask, {
                completed: !tasks[index].completed,
            });
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            this.setState({ tasks });
            
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({ tasks });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
}
export default Tasks;