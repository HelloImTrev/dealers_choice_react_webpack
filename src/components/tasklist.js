import React from "react";

const TaskList = (props) => {
  return (
    <div>
      <ul>
        {props.tasks.map((task) => {
          return <li key={task.id}>{task.name}</li>;
        })}
      </ul>
      <input type="text"></input><button onClick={() => props.addTask('test')}>Add Task</button>
    </div>
  );
};

export default TaskList;
