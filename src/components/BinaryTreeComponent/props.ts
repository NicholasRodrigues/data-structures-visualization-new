export interface BinaryTreeNode {
  value: number;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
  isRoot?: boolean;
}

export interface BinaryTreeProps {
  root: BinaryTreeNode | null;
}
