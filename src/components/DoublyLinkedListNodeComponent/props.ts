export interface DoublyLinkedListNode {
    value: string;
    next: DoublyLinkedListNode | null;
    prev: DoublyLinkedListNode | null;
}

export interface DoublyLinkedListNodeProps {
    node: DoublyLinkedListNode;
    index: number;
}
