import { ReactComponent as Confirm } from '../../assets/check.svg'
import { ReactComponent as Edit } from '../../assets/editar.svg'
import { ReactComponent as Delete } from '../../assets/trash.svg'
import { ReactComponent as DeleteDone } from '../../assets/delete.svg'

import { ITaskList } from '../../pages/Home'
import style from './List.module.css'
import { 
  ChangeEvent,
  ForwardRefRenderFunction,
  createRef,
  forwardRef,
  useImperativeHandle,
  useMemo 
} from 'react'

interface IProps {
  tasks: ITaskList[],
  deleteTask: (id: string) => void,
  taskDone: (id: string) => void,
  editTask:(event:ChangeEvent<HTMLInputElement>, id:string)=> void,
}

interface IListRef{
  focus:(index:number)=>void
}

const ListBase: ForwardRefRenderFunction<IListRef, IProps> = ({
  tasks,
  deleteTask,
  taskDone,
  editTask,
}, ref) => {

  const inputRefs = useMemo(()=>
    Array(tasks.length)
    .fill(0)
    .map(()=> createRef<HTMLInputElement>())
  ,[tasks.length]);

  useImperativeHandle(ref, ()=>({
    focus:(index:number)=>{
      inputRefs[index].current?.focus()
    }
  }));

  const handleTaskBlur = (index:number)=> {
    inputRefs[index].current?.focus()
  };


  return(
    <>
      {tasks.map((e, index) => (
        <div className={`${style.card} ${e.completed ? style.completedCard : ''}`} key={index}>
          {e.completed ? (
            <>
              <input type='text' value={e.description} className={style.taskDone} />
              <div>
                <DeleteDone style={{ width: '1.5rem' }} onClick={() => deleteTask(e.id)} />
              </div>
            </>
          ) : (
            <>
              <input
              type='text'
              value={e.description}
              ref={inputRefs[index]} 
              onChange={(event)=>editTask(event, e.id)}
              />
              <div className={style.icon}>
                <Delete
                  style={{ width: '1rem' }}
                  onClick={() => deleteTask(e.id)}
                />
                <Edit
                  style={{ width: '1.3rem' }}
                  onClick={()=>handleTaskBlur(index)}
                />
                <Confirm
                  style={{ width: '1.5rem' }}
                  onClick={() => taskDone(e.id)}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </>
  )
          }
      
export const List = forwardRef(ListBase);

