import React from "react";

const TaskList = (props) => {
  return (
    <div>
      <ul>
        {props.tasks.map((task) => {
          return <li key={task.id}>{task.name}</li>;
        })}
      </ul>
      <input id="task" type="text"></input><button onClick={() => {
        const input = document.getElementById('task').value;
        props.addTask(input);
      }}>Add Task</button>
    </div>
  );
};

export default TaskList;
