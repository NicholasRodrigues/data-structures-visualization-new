export interface BinaryTreeNode {
  value: number;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
}

export interface BinaryTreeProps {
  root: BinaryTreeNode | null;
}
