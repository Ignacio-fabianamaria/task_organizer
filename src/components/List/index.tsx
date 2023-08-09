import { ReactComponent as Confirm } from '../../assets/check.svg'
import { ReactComponent as Edit } from '../../assets/editar.svg'
import { ReactComponent as Delete } from '../../assets/trash.svg'
import { ITaskList } from '../../pages/Home'
import style from './List.module.css'

interface IProps{
tasks:ITaskList[],
deleteTask: (id:string)=>void
}

export function List({tasks, deleteTask}:IProps) {
  return (
    <>
    {tasks.map((e)=>{
      return(
    <div className={style.card}>
      <input type='text' value={e.description} />
      <div className={style.icon}>
        <Delete
        style={{ width: '1rem' }}
        onClick={()=>deleteTask(e.id)}
        />
        <Edit style={{ width: '1.3rem' }} />
        <Confirm style={{ width: '1.5rem' }} /> 
      </div>
    </div>
      )
    })}
    </>
  )
}