export interface LinkedListNode {
  value: string;
  next: LinkedListNode | null;
}

export interface LinkedListProps {
  linkedList: LinkedListNode[];
  // Adicione outras props, como funções para adicionar, remover, pesquisar, etc.
}

export interface DoublyLinkedListNode {
  value: string;
  next: DoublyLinkedListNode | null;
  prev: DoublyLinkedListNode | null;
}

export interface DoublyLinkedListProps {
  linkedList: DoublyLinkedListNode[];
  // Adicione outras props, como funções para adicionar, remover, pesquisar, etc.
}
