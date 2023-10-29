import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import { QueueComponent } from '@/components/QueueComponent';
import { ArrayItem } from '@/components/QueueComponent/props';
import {toast} from 'react-hot-toast';
import { Button } from '@/components/Button';

// hooks next
// TODO: deixar o input salvo em um state
export default function QueuePage() {
    const [dataArray, setDataArray] = useState<ArrayItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const sizeRef = useRef<HTMLInputElement>(null); // Reference to the size input field
    const [itemFoundAtIndex, setItemFoundAtIndex] = useState<number | null>(null);
    const [removingIndices, setRemovingIndices] = useState<number[]>([]);
    const [sidebarActive, setSidebarActive] = useState(false);
    const successToast = () => toast.success('Success!');
    const errorToast = () => toast.error('Error!');

    const [front, setFront] = useState(-1); // Initialize to -1 since there's no element yet.
    const [rear, setRear] = useState(-1);
    const [isInitialized, setIsInitialized] = useState(false);


    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const initializeQueue = () => {
        const sizeInput = sizeRef.current;
        if (sizeInput) {
            const size = parseInt(sizeInput.value, 10);
            if (!isNaN(size) && size > 0) {
                const newArray: ArrayItem[] = Array.from({ length: size }, (_, index) => ({ value: '', index }));
                setDataArray(newArray);
                setIsInitialized(true);
                setFront(-1);
                setRear(-1);
            } else {
                toast.error('Please enter a valid queue size.');
            }
        } else {
            toast.error('Failed to access queue size input.');
        }
    };
    

    const addElement = () => {
        if (!isInitialized) {
            toast.error('Please initialize the queue first.');
            return;
        }
        const value = inputRef.current?.value;
    
        if (!value) {
            toast.error('Please enter a value.');
            return;
        }
    
        const nextRear = (rear + 1) % dataArray.length;
        if (nextRear === front) {
            toast.error('Cannot add more elements. Queue is full.');
            return;
        }
    
        if (front === -1) {
            setFront(0);
        }
    
        const newArray = [...dataArray];
        newArray[nextRear] = { value, index: nextRear }; // Enqueue to the next rear
        setDataArray(newArray);
        setRear(nextRear); // Update rear after setting value in array
    
        (document.getElementById("dataInput") as HTMLInputElement).value = '';
        toast.success('Elemento adicionado com sucesso!');
    };
    

    const removeElementByIndex = () => {
        if (!isInitialized) {
            toast.error('Please initialize the queue first.');
            return;
        }
        if (front === -1) {
            toast.error('Pilha vazia.');
            return;
        }

        const newArray = [...dataArray];
        newArray[front] = { value: '', index: front }; // Dequeue from the front
        setDataArray(newArray);

        if (front === rear) {
            setFront(-1);
            setRear(-1);
        } else {
            setFront((front + 1) % dataArray.length);
        }

        toast.success('Elemento removido com sucesso!');
    };
    

const searchByValue = () => {
    const value = (document.getElementById("searchValueInput") as HTMLInputElement).value;
    const indices = dataArray.map((item, index) => item.value === value ? index : -1).filter(index => index !== -1);

    if (indices.length > 0) {
    toast.success("Value found at index/indices: " + indices.join(", "));
    } else {
    toast.error("Value not found.");
    }
};

const searchByPosition = () => {
    const position = parseInt((document.getElementById("searchPositionInput") as HTMLInputElement).value, 10);
    if (position >= 0 && position < dataArray.length) {
        let value = dataArray[position].value;
        toast.success(`Value at position ${position} is ${value}.`);
    } else {
        toast.error(`Invalid position.`);
    }
};
const clearStack = () => {
    setDataArray([]);
    toast.success('Queue cleared successfully!');
};

    return (
    <div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>

        <div className={styles.sidebar + (sidebarActive ? ` ${styles.active}` : '')}>
            <input className={styles.input} type="number" id="arraySizeInput" placeholder="Queue Size" ref={sizeRef} />
            <button className={styles.button} onClick={initializeQueue}>Initialize Queue</button>

            <input className={styles.input} type="text" id="dataInput" placeholder="Enter value" ref={inputRef}/>
            <button className={styles.button} onClick={addElement}>Add</button>

            <Button description={"Remove"} onClick={removeElementByIndex} />

            <input className={styles.input} type="text" id="searchValueInput" placeholder="Search by value" />
            <button className={styles.button} onClick={searchByValue}>Search Value</button>

            <input className={styles.input} type="number" id="searchPositionInput" placeholder="Search by position" min="0" />
            <button className={styles.button} onClick={searchByPosition}>Search Position</button>

            <button className={styles.button} onClick={clearStack}>Clear</button>


        </div>

        <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
        <h1 className={styles.h1}>Queue</h1>
        </div>
        </div>

            <div className={styles.mainContainer}>
                <QueueComponent
                dataArray={dataArray}
                front={front}
                rear={rear}
                setRemovingIndices={setRemovingIndices}
                removingIndices={removingIndices}
                itemFoundAtIndex={itemFoundAtIndex}
                />
            </div>
        </div>
    );
}

