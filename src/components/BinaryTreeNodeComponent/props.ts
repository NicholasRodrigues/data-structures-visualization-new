// props.ts for BinaryTreeNodeComponent

export interface BinaryTreeNode {
  value: number;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
}

export interface BinaryTreeNodeProps {
  node: BinaryTreeNode | null;
  level: number;
  target?: boolean;
}
