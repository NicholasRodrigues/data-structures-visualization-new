import React from 'react';
import { BinaryTreeNodeProps } from './props';
import styles from './styles.module.css';
import { memo } from "react";

const BinaryTreeNodeComponent: React.FC<BinaryTreeNodeProps & { visitedNodes: number[]; targetNode: number | null; isRoot?: boolean }> = ({ node, level, visitedNodes, targetNode, isRoot }) => {
  const width = 500 / (level + 1);

  const isVisited = visitedNodes.includes(node?.value || 0);
  const isTarget = node?.value === targetNode;

  return (
    <div className={styles.nodeContainer} style={{ width: `${width}px` }}>
      {node ? (
        <>
          <div className={styles.valueContainer} style={{ backgroundColor: isVisited ? '#F4D341' : isTarget ? '#41F45D' : isRoot ? '#F44242' : '#4285f4' }}>
            <div>{node.value}</div>
          </div>
          <div className={styles.childrenContainer}>
            <BinaryTreeNodeComponent node={node.left} level={level + 1} visitedNodes={visitedNodes} targetNode={targetNode} />
            <BinaryTreeNodeComponent node={node.right} level={level + 1} visitedNodes={visitedNodes} targetNode={targetNode} />
          </div>
        </>
      ) : null}
    </div>
  );
};



export default memo(BinaryTreeNodeComponent);
