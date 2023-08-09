import { ReactComponent as Confirm } from '../../assets/check.svg'
import { ReactComponent as Edit } from '../../assets/editar.svg'
import { ReactComponent as Delete } from '../../assets/trash.svg'
import style from './List.module.css'


export function List() {
  return (
    <div className={style.card}>
      <input type='text' value={'Apernder JavaScript'} />
      <div className={style.icon}>
        <Delete style={{ width: '17px' }} />
        <Edit style={{ width: '20px' }} />
        <Confirm style={{ width: '22px' }} /> 
      </div>
    </div>
  )
}