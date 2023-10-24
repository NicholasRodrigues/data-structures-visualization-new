import React from 'react';
import { BinaryTreeNodeProps } from './props';
import styles from './styles.module.css';
import {memo} from "react";

const BinaryTreeNodeComponent: React.FC<BinaryTreeNodeProps> = ({ node, level }) => {
  const width = 500 / (level + 1);
  return (
    <div className={styles.nodeContainer} style={{ width: `${width}px` }}>
      {node ? (
        <>
          <div className={styles.valueContainer}>
            <div>{node.value}</div>
            <div className={`${styles.line} ${styles.vertical}`}></div>
          </div>
          <div className={styles.childrenContainer}>
            {node.left || node.right ? (
              <>
                <div className={`${styles.line} ${styles.horizontal} ${styles.left}`}></div>
                <div className={`${styles.line} ${styles.horizontal} ${styles.right}`}></div>
              </>
            ) : null}
            <BinaryTreeNodeComponent node={node.left} level={level + 1} />
            <BinaryTreeNodeComponent node={node.right} level={level + 1} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default memo(BinaryTreeNodeComponent);