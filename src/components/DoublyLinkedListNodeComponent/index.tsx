import React from 'react';
import { DoublyLinkedListNodeProps } from './props';
import styles from './styles.module.css';

const DoublyLinkedListNodeComponent: React.FC<DoublyLinkedListNodeProps> = ({ node, index }) => {
    return (
    <div className={styles.nodeContainer}>
        { node.prev !== null && (
        <span className={styles.pointer}>
            &larr;
        </span>
        )}
        
        {node.prev !== null ? (
            <span className={styles.block}>
            Prev: {node.prev ? `[${node.prev.value}]` : 'null'}
            </span>
        ) : (
            <span className={styles.block}>
                HEAD
            </span>
        )}

        <span className={styles.node}>
        {node.value} [{index}]
        </span>
        

        {node.next !== null ? (
            <span className={styles.block}>
            Next: {node.next ? `[${node.next.value}]` : 'null'}
            </span>
        ) : (
            <span className={styles.block}>
                TAIL
            </span>
        )}

        
        { node.next !== null && (
        <span className={styles.pointer}>
            &rarr;
        </span>
        )}

    </div>
    );
};

export default DoublyLinkedListNodeComponent;
