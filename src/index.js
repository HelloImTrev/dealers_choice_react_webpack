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
  }

  async addTask(task) {
    try {
      const res = await axios.post(`/api/tasks/${task}`);
      console.log(res.data);
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
    const addTask = this.addTask
    return(
      <TaskList tasks={tasks} addTask={addTask}/>
    )
  }
}

ReactDOM.render(<ToDo />, document.querySelector('#root'));