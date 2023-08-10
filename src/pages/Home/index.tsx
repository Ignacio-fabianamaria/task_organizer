import { ChangeEvent, useEffect, useState } from "react";
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
  const [totInprogress, setTotInProgress] = useState(0);
  const [totComplete, setTotComplete] = useState(0);

  useEffect(()=>{
    const storedTaskList = localStorage.getItem('taskList');
  if (storedTaskList) {
    setTaskList(JSON.parse(storedTaskList));
  }
    const newTotInProgress = taskList.reduce((acc,curr)=> (!curr.completed ? acc +1 : acc),0);
    setTotInProgress(newTotInProgress);
    const newTotComplete = taskList.reduce((acc,curr)=> (curr.completed ? acc +1 : acc),0);
    setTotComplete(newTotComplete)
  },[taskList])


  const handleAddTodo = () => {
    const newTask = {
      id: uuid(),
      description: todo,
      completed: false,
    };
    const newTaskList = [...taskList, newTask]; 
    setTaskList(newTaskList); 
    setTodo('');
    localStorage.setItem('taskList', JSON.stringify(newTaskList));
    
  }

  const handleDeleteTask = (id: string) => {
    const filterTasks = taskList.filter(task => task.id != id);
    setTaskList(filterTasks);
    localStorage.setItem('taskList', JSON.stringify(filterTasks));
  }

  const handleTaskDone = (id: string) => {
    const newTaskDone = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task
      }
    });
    setTaskList(newTaskDone);
    localStorage.setItem('taskList', JSON.stringify(newTaskDone));

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
    setTaskList(newTaskState);
    localStorage.setItem('taskList', JSON.stringify(newTaskState));

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
        <span className={styles.finish}>Finalizados: {totComplete} tarefas</span>
        <span className={styles.progress}>Em progresso: {totInprogress} tarefas</span>
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