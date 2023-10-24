import React from 'react';
import { LinkedListProps } from './props';
import styles from './styles.module.css';
import LinkedListNodeComponent from '../LinkedListNodeComponent/index'; 

const LinkedListComponent: React.FC<LinkedListProps> = ({ linkedList }) => {
  return (
    <div className={styles.linkedListContainer}>
      {linkedList.map((node, index) => (
        <LinkedListNodeComponent
          key={index}
          value={node.value}
          index={index}
          next={node.next ? node.next.value : null}
          isHead={index === 0}  // Passes true if it's the first node
          isTail={index === linkedList.length - 1}  // Passes true if it's the last node
        />
      ))}
    </div>
  );
};

export default LinkedListComponent;
