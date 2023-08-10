import { ChangeEvent, useState } from "react";
import { Header } from "../../components/Header";
import { List } from "../../components/List";
import styles from './Home.module.css';
import { v4 as uuid } from 'uuid';

export interface ITaskList {
  id: string,
  description: string,
  completed: boolean,
}
export function Home() {
  const [todo, setTodo] = useState<string>('');
  const [taskList, setTaskList] = useState<ITaskList[]>([]);

  const handleAddTodo = () => {
    const newTask = {
      id: uuid(),
      description: todo,
      completed: false,
    };
    setTaskList([...taskList, newTask]);
    setTodo('');
  }

  const handleDeleteTask = (id: string) => {
    const filterTasks = taskList.filter(task => task.id != id);
    setTaskList(filterTasks);
  }

  const handleTaskDone = (id: string) => {
    const newTaskDone = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task
      }
    });
    setTaskList(newTaskDone)
  }

  const handleEditTask = (event:ChangeEvent<HTMLInputElement>, id:string) => {
    const newTaskState = taskList.map(task => {
      if(task.id === id){
        return {
          ...task,
          description: event.target.value,
        }
      }
      return task;
    })
    setTaskList(newTaskState)
  }

  return (
    <div>
      <Header />
      <div className={styles.createTask}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Adicionar</button>
      </div>
      <div className={styles.filter}>
        <span className={styles.finish}>Finalizados: 5 tarefas</span>
        <span className={styles.progress}>Em progresso: 5 tarefas</span>
      </div>
      <List
        tasks={taskList}
        deleteTask={handleDeleteTask}
        taskDone={handleTaskDone}
        editTask={handleEditTask}
        />
    </div>
  )
}