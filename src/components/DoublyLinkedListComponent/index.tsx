import React from 'react';
import { DoublyLinkedListProps } from './props';
import styles from './styles.module.css';
import DoublyLinkedListNodeComponent from '../DoublyLinkedListNodeComponent/index';

const DoublyLinkedListComponent: React.FC<DoublyLinkedListProps> = ({ linkedList }) => {
    return (
    <div className={styles.linkedListContainer}>
        {linkedList.map((node, index) => (
        <DoublyLinkedListNodeComponent
            key={index}
            node={node}
            index={index}
        />
        ))}
    </div>
    );
};

export default DoublyLinkedListComponent;
