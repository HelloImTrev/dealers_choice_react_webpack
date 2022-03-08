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
    return(
      <TaskList tasks={tasks}/>
    )
  }
}

ReactDOM.render(<ToDo />, document.querySelector('#root'));