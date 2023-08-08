import styles from './Header.module.css';

export function Header(){
    return(
        <div className={styles.container}>
            <h1>Task Organizer 📝</h1>
        </div>
    )
}