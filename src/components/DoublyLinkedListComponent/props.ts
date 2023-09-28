export interface DoublyLinkedListNode {
    value: string;
    next: DoublyLinkedListNode | null;
    prev: DoublyLinkedListNode | null;
}

export interface DoublyLinkedListProps {
    linkedList: DoublyLinkedListNode[];
}
