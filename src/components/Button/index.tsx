import { Props } from "./props";
import styles from './styles.module.css';

export function Button({ description, onClick }: Props) {
    return (
    <button className={styles.button} onClick={() => onClick()}>{description}</button>
    );
}