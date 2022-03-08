import React from "react";

const TaskList = (props) => {
  return (
    <div>
      <ul>
        {props.tasks.map((task) => {
          return <li key={task.id}>{task.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
