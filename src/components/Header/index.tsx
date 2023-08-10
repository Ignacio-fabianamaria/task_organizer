import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export function Header() {
  const [dateTime, setDateTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval)

  }, []);

  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  const formattedDTime = dateTime.toLocaleString(options).replace(',', ' -');



  return (
    <div className={styles.container}>
      <h1>Task Organizer 📝</h1>
      <div>
        <p>{formattedDTime} </p>
      </div>
    </div>
  )
}