import React, { useState } from 'react';
import styles from './styles.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LinkedListNodeComponent from '../../components/LinkedListNodeComponent';
import { Button } from '@/components/Button';
import LinkedListComponent from '@/components/LinkedListComponent';
import {LinkedListNode} from "@/components/LinkedListComponent/props";
import {toast} from "react-hot-toast";

export default function LinkedListPage() {
    const [linkedList, setLinkedList] = useState<LinkedListNode[]>([]);
    const [searchResult, setSearchResult] = useState<number | null>(null);
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const addNode = (value: string) => {
    const newNode: LinkedListNode = { value, next: null };
    if (linkedList.length === 0) {
    setLinkedList([newNode]);
    } else {
    const lastNode = linkedList[linkedList.length - 1];
    lastNode.next = newNode;
    setLinkedList([...linkedList, newNode]);
    }
};



    const removeNode = () => {
    const value = (document.getElementById('removeNode') as HTMLInputElement).value;
    let newLinkedList = [...linkedList];
    if (newLinkedList[0].value === value) {
    newLinkedList = newLinkedList.slice(1);
    } else {
    for (let i = 1; i < newLinkedList.length; i++) {
        if (newLinkedList[i].value === value) {
        newLinkedList[i - 1].next = newLinkedList[i].next;
        newLinkedList.splice(i, 1);
        break;
        }
    }
    }
    setLinkedList(newLinkedList);
};

    const removeNodeByIndex = (targetIndex: number) => {

    let newLinkedList = [...linkedList];
    if (targetIndex === 0) {
        // Removendo o primeiro nó
        newLinkedList = newLinkedList.slice(1);
    } else if (targetIndex < newLinkedList.length) {
        // Removendo um nó no meio ou no final
        if (newLinkedList[targetIndex - 1]) {
            newLinkedList[targetIndex - 1].next = newLinkedList[targetIndex].next;
        }
        newLinkedList.splice(targetIndex, 1);
    }
    setLinkedList(newLinkedList);
};


    const searchNode = () => {
        const value = (document.getElementById('searchNode') as HTMLInputElement).value;
        const index = linkedList.findIndex(node => node.value === value);
        const out = parseInt(index.toString(), 10);
        toast.success(`Elemento encontrado no index: ${out}`);
        setSearchResult(index);
};

    const searchNodeByIndex = (targetIndex: number) => {
        let currentNode = linkedList[0];
        let currentIndex = 0;

        while (currentNode !== null) {
            if (currentIndex === targetIndex) {
            const value = currentNode.value.toString();
            toast.success(`Elemento encontrado com o valor de: ${value}`);
            return;
        }
        if(currentNode.next ) {
        currentNode = currentNode.next;
        currentIndex++;
        } else {
            break;
        }
        }
};
    return (
    <div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>

        <div className={styles.sidebar + (sidebarActive ? ` ${styles.active}` : '')}>
        <input type="text" id="addNode" placeholder="Add Node" className={styles.input} />
        <Button description={"Add Node"} onClick={() => addNode((document.getElementById('addNode') as HTMLInputElement).value)} />

            <input type="number" id="removeNodeByIndex" placeholder="Remove Node By Index" className={styles.input} />
        <Button description={"Remove Node(Idx)"} onClick={() => removeNodeByIndex(parseInt((document.getElementById('removeNodeByIndex') as HTMLInputElement).value))} />


        <input type="text" id="removeNode" placeholder="Remove Node" className={styles.input} />
        <Button description={"Remove Node"} onClick={removeNodeByIndex} />

        <input type="text" id="searchNode" placeholder="Search Node" className={styles.input} />
        <Button description={"Search Node"} onClick={searchNode} />

        <input type="number" id="searchIndex" placeholder="Search by Index" className={styles.input} />
        <Button description={"Search by Index"} onClick={() => searchNodeByIndex(Number((document.getElementById('searchIndex') as HTMLInputElement).value))} />

        </div>
        <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
            <h1 className={styles.h1}>Linked List</h1>
        </div>
        </div>


        <div className={styles.container}>




        <LinkedListComponent linkedList={linkedList} />

    </div>
        </div>
    );
}
