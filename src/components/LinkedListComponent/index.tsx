import React from 'react';
import { LinkedListProps } from './props';
import styles from './styles.module.css';
import LinkedListNodeComponent from '../LinkedListNodeComponent/index'; // Importe este componente

const LinkedListComponent: React.FC<LinkedListProps> = ({ linkedList }) => {
  return (
    <div className={styles.linkedListContainer}>
      {linkedList.map((node, index) => (
        <LinkedListNodeComponent
          key={index}
          value={node.value}
          index={index}
          next={node.next ? node.next.value : null}
        />
      ))}
    </div>
  );
};



export default LinkedListComponent;
