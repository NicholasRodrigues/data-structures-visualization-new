import React, { memo } from 'react';
import { BinaryTreeProps } from './props';
import BinaryTreeNodeComponent from '../BinaryTreeNodeComponent';
import styles from './styles.module.css';

const BinaryTreeComponent: React.FC<BinaryTreeProps> = ({ root }) => {
  return (
    <div className={styles.treeContainer}>
      <BinaryTreeNodeComponent node={root} level={0} />
    </div>
  );
};

export default memo(BinaryTreeComponent);
