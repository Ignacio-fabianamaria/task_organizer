import { ReactComponent as Confirm } from '../../assets/check.svg'
import { ReactComponent as Edit } from '../../assets/editar.svg'
import { ReactComponent as Delete } from '../../assets/trash.svg'
import { ReactComponent as DeleteDone } from '../../assets/delete.svg'

import { ITaskList } from '../../pages/Home'
import style from './List.module.css'

interface IProps {
  tasks: ITaskList[],
  deleteTask: (id: string) => void,
  taskDone: (id: string) => void
}

export function List({ tasks, deleteTask, taskDone }: IProps) {
  return (
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
              <input type='text' value={e.description} />
              <div className={style.icon}>
                <Delete
                  style={{ width: '1rem' }}
                  onClick={() => deleteTask(e.id)}
                />
                <Edit
                  style={{ width: '1.3rem' }}
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
  );
}