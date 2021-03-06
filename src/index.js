import React from "react";
import ReactDOM from "react-dom";
import TaskList from "./components/tasklist";
import axios from "axios";

class ToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      task: []
    }

    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  
   async addTask(task) {
    try {
      await axios.post('/api/tasks', { name: task });
      const res = await axios.get('/api/tasks');

      this.setState({ task: res.data });
    } catch(e) {
      console.log(e);
    }
  }

  async deleteTask(id) {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      const task = this.state.task.filter((task) => {
        return task.id !== id;
      });

      this.setState({ task });
    } catch(e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    try{
      const res = await axios.get('/api/tasks');
      const data = res.data;
      this.setState({ task: data });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const tasks = this.state.task;
    const addTask = this.addTask;
    const deleteTask = this.deleteTask;
    return(
      <TaskList tasks={tasks} addTask={addTask} deleteTask={deleteTask}/>
    )
  }
}

ReactDOM.render(<ToDo />, document.querySelector('#root'));