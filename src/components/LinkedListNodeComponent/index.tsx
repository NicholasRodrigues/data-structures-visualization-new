import React from 'react';
import styles from './styles.module.css';

const LinkedListNodeComponent: React.FC<{ value: string, index: number, next: string | null, isHead: boolean, isTail: boolean }> = ({ value, index, next, isHead, isTail }) => {
    return (
    <div className={styles.nodeContainer}>
        
        {isHead && isTail && <span className={styles.block}>HEAD & TAIL </span>}
        {isHead && !isTail && <span className={styles.block}>HEAD </span>}
        {isTail && !isHead && <span className={styles.block}>TAIL </span>}

        <span className={styles.node}>
            {value} [{index}]
        </span>

        <span className={styles.block}>
            Next: {next !== null ? `[${next}]` : 'null'}
        </span>

        {next !== null && (
        <span className={styles.pointer}>
            &rarr;
        </span>
        )}
    </div>
    );
};

export default LinkedListNodeComponent;
