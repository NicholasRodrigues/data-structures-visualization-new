import React from 'react';
import { NodeProps } from './props';
import styles from './styles.module.css';


const LinkedListNodeComponent: React.FC<{ value: string, index: number, next: string | null }> = ({ value, index, next }) => {
    return (
    <div className={styles.nodeContainer}>
        <span className={styles.node}>
        {value} [{index}]
        </span>
        <span className={styles.block}>
        Next: {next !== null ? `[${next}]` : 'null'}
        </span>
        { next !== null && (
        <span className={styles.pointer}>
            &rarr;
        </span>
        )}
    </div>
    );
};


export default LinkedListNodeComponent;





