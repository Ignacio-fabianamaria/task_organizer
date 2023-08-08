import { Header } from "../../components/Header";
import styles from './Home.module.css'

export function Home(){
    return(
        <div>
            <Header />
            <div className={styles.createTask}>
                <input type="text" />
                <button>Adicionar</button>
            </div>
            <div className={styles.filter}>
                <span className={styles.finish}>Finalizados: 5 tarefas</span>
                <span className={styles.progress}>Em progresso: 5 tarefas</span>
            </div>
        </div>
    )
}