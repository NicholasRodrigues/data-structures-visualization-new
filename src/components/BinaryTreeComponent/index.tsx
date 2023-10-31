import React, {memo} from 'react';
import { BinaryTreeProps } from './props';
import BinaryTreeNodeComponent from '../BinaryTreeNodeComponent';
import styles from './styles.module.css';

const BinaryTreeComponent: React.FC<BinaryTreeProps & { visitedNodes: number[]; targetNode: number | null }> = ({ root, visitedNodes, targetNode }) => {
  return (
    <div className={styles.treeContainer}>
        <BinaryTreeNodeComponent node={root} level={0} isRoot={true} visitedNodes={visitedNodes} targetNode={targetNode} x={0} y={0} nodeCount={0} distance={0}/>
    </div>
  );
};

export default memo(BinaryTreeComponent);
