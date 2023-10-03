import React, { useState } from 'react';
import styles from './styles.module.css';
import { Button } from '@/components/Button';
import DoublyLinkedListComponent from '@/components/DoublyLinkedListComponent';
import { DoublyLinkedListNode } from "@/components/DoublyLinkedListComponent/props";
import {toast} from 'react-hot-toast'

export default function DoublyLinkedListPage() {
  const [linkedList, setLinkedList] = useState<DoublyLinkedListNode[]>([]);
  const [searchResult, setSearchResult] = useState<number | null | number[]>(null);
  const [sidebarActive, setSidebarActive] = useState(false);


  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const addNode = (value: string) => {
    if(!value){
      toast.error('Por favor, insira um valor.');
      return;
    }
    const newNode: DoublyLinkedListNode = { value, next: null, prev: null };
    if (linkedList.length === 0) {
      setLinkedList([newNode]);
    } else {
      const lastNode = linkedList[linkedList.length - 1];
      lastNode.next = newNode;
      newNode.prev = lastNode;
      setLinkedList([...linkedList, newNode]);
    }
    toast.success('Elemento adicionado com sucesso!');
  };

  const addNodeByIndex = () => {
    const value = (document.getElementById('addNode') as HTMLInputElement).value;
    const indexInput = document.getElementById('addNodeIndex') as HTMLInputElement;
    const index = parseInt(indexInput.value, 10);

    if (isNaN(index)) {
      toast.error('Por favor, insira um valor.');
      return;
    }

    if (index < 0 || index > linkedList.length) {
      toast.error('Index inválido.');
      return;
    }

    let newLinkedList = [...linkedList];

    const newNode: DoublyLinkedListNode = { value, next: null, prev: null };

    if (index === 0) {
      newNode.next = linkedList[0] || null;
      newLinkedList = [newNode, ...linkedList];
    } else {
      const prevNode = newLinkedList[index - 1];
      newNode.next = prevNode.next;
      newNode.prev = prevNode;
      prevNode.next = newNode;

      newLinkedList = [...newLinkedList.slice(0, index), newNode, ...newLinkedList.slice(index)];

    }
    setLinkedList(newLinkedList);

    toast.success('Elemento adicionado com sucesso!');
    indexInput.value = '';
  }

  const updateValue = () => {
    const indexInput = document.getElementById('updateValueInputIndex') as HTMLInputElement;
    const index = parseInt(indexInput.value, 10);

    if (isNaN(index) || index < 0 || index >= linkedList.length) {
      toast.error('Index inválido.');
      return;
    }

    const newValue = (document.getElementById('updateValueInput') as HTMLInputElement).value;

    if (!newValue) {
      toast.error('Por favor, insira um novo valor.');
      return;
    }

    let newLinkedList = [...linkedList];

    let currentNode = newLinkedList[0];
    let currentIndex = 0;

    while (currentNode !== null) {
      if (currentIndex === index) {
        currentNode.value = newValue;

        if (currentNode.prev) {
          // Update the next node's prev pointer
          currentNode.prev.next = currentNode;
        }

        if (currentNode.next) {
          // Update the previous node's next pointer
          currentNode.next.prev = currentNode;
        }

        setLinkedList(newLinkedList);
        toast.success(`Valor no índice ${index} atualizado com sucesso.`);
        indexInput.value = '';
        (document.getElementById('updateValueInput') as HTMLInputElement).value = ''; // Clear the input field
        return;
      }

      if (currentNode.next) {
        currentNode = currentNode.next;
        currentIndex++;
      } else {
        break;
      }
    }
  };


const removeNode = () => {
  const value = (document.getElementById('removeNode') as HTMLInputElement).value;
  let newLinkedList = [...linkedList];

  if(!value){
    toast.error('Por favor, insira um valor.');
    return;
  }

  if (newLinkedList[0]?.value === value) {
    newLinkedList = newLinkedList.slice(1);
    if (newLinkedList[0]) {
      newLinkedList[0].prev = null;
    }
  } else {
    for (let i = 1; i < newLinkedList.length; i++) {
      if (newLinkedList[i]?.value === value) {
        newLinkedList[i - 1].next = newLinkedList[i].next;
        if (newLinkedList[i].next) {
          // @ts-ignore
            newLinkedList[i].next.prev = newLinkedList[i - 1];
        }
        newLinkedList.splice(i, 1);
        break;
      }
    }
  }
  setLinkedList(newLinkedList);
  toast.success('Elemento removido com sucesso!');
};

const removeNodeByIndex = (targetIndex: number) => {
    let newLinkedList = [...linkedList];
    if(!targetIndex){
      toast.error('Por favor, insira um valor.');
      return;
    }
    if (targetIndex === 0) {
        newLinkedList = newLinkedList.slice(1);
        if (newLinkedList[0]) {
            newLinkedList[0].prev = null;
        }
    } else if (targetIndex < newLinkedList.length) {
        if (newLinkedList[targetIndex - 1]) {
            newLinkedList[targetIndex - 1].next = newLinkedList[targetIndex].next;
        }
        if (newLinkedList[targetIndex].next) {
            // @ts-ignore
          newLinkedList[targetIndex].next.prev = newLinkedList[targetIndex - 1];
        }
        newLinkedList.splice(targetIndex, 1);
    }
    setLinkedList(newLinkedList);
    toast.success('Elemento removido com sucesso!');
};



  const searchNode = () => {
      const value = (document.getElementById('searchNode') as HTMLInputElement).value;
      if (!value) {
          toast.error('Por favor, insira um valor.');
          return;
      }

      const indices = linkedList.reduce((acc, node, index) => {
          if (node.value === value) {
              acc.push(index);
          }
          return acc;
      }, [] as number[]);

      if (indices.length > 0) {
          toast.success(`Elemento encontrado nos índices: ${indices.join(', ')}`);
          setSearchResult(indices);  // Ajuste o setSearchResult para lidar com um array de números, se necessário
      } else {
          toast.error('Elemento não encontrado.');
          setSearchResult(null);
      }
};


const searchNodeByIndex = (targetIndex: number) => {
  let currentNode = linkedList[0];
  let currentIndex = 0;

  if(!targetIndex){
    toast.error('Por favor, insira um valor.');
    return;
  }

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
        <input type="number" id="addNodeIndex" placeholder="Add Node Index" className={styles.input} />
        <Button description={"Add Node"} onClick={() => addNode((document.getElementById('addNode') as HTMLInputElement).value)} />
        <Button description={"Add Node(index)"} onClick={addNodeByIndex} />

        <input className={styles.input} type="text" id="updateValueInput" placeholder="Value to Update" />
        <input className={styles.input} type="text" id="updateValueInputIndex" placeholder="Update index" />
        <Button description={"Update Value"} onClick={updateValue} />


        <input type="text" id="removeNode" placeholder="Remove Node" className={styles.input} />
        <Button description={"Remove Node(value)"} onClick={removeNode} />

        <input type="number" id="removeNodeByIndex" placeholder="Remove Node By Index" className={styles.input} />
        <Button description={"Remove Node(Idx)"} onClick={() => removeNodeByIndex(parseInt((document.getElementById('removeNodeByIndex') as HTMLInputElement).value))} />

        <input type="text" id="searchNode" placeholder="Search Node" className={styles.input} />
        <Button description={"Search Node"} onClick={searchNode} />

        <input type="number" id="searchIndex" placeholder="Search by Index" className={styles.input} />
        <Button description={"Search by Index"} onClick={() => searchNodeByIndex(Number((document.getElementById('searchIndex') as HTMLInputElement).value))} />

      </div>

      <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.h1}>Doubly Linked List</h1>
        </div>
      </div>

      <div className={styles.container}>
        <DoublyLinkedListComponent linkedList={linkedList} />
        {searchResult !== null && <div className={styles.searchResult}></div>}
      </div>
    </div>
  );
}
