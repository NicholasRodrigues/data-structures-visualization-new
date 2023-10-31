import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import { StackComponent } from '@/components/StackComponent';
import { ArrayItem } from '@/components/StackComponent/props';
import {toast} from 'react-hot-toast';
import { Button } from '@/components/Button';

// hooks next
// TODO: deixar o input salvo em um state
export default function StackPage() {
    const [dataArray, setDataArray] = useState<ArrayItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const sizeRef = useRef<HTMLInputElement>(null); // Reference to the size input field
    const [itemFoundAtIndex, setItemFoundAtIndex] = useState<number | null>(null);
    const [removingIndices, setRemovingIndices] = useState<number[]>([]);
    const [sidebarActive, setSidebarActive] = useState(false);
    const successToast = () => toast.success('Success!');
    const errorToast = () => toast.error('Error!');
    const [isInitialized, setIsInitialized] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const initializeStack = () => {
        const sizeInput = sizeRef.current;
        if (sizeInput) {
            const size = parseInt(sizeInput.value, 10);
            if (!isNaN(size) && size > 0) {
                const newArray: ArrayItem[] = Array.from({ length: size }, (_, index) => ({ value: '', index }));
                setDataArray(newArray);
                setIsInitialized(true);
            } else {
                toast.error('Please enter a valid stack size.');
            }
        } else {
            toast.error('Failed to access stack size input.');
        }
    };

    const addElement = () => {
        if (!isInitialized) {
            toast.error('Please initialize the stack first.');
            return;
        }
        const value = inputRef.current?.value;
        if (!value) {
            toast.error('Por favor, insira um valor.');
            return;
        }
    
        // Check for the last empty spot in the stack by iterating in reverse
        const emptyIndex = dataArray.slice().reverse().findIndex(item => item.value === '');
    
        const actualIndex = emptyIndex !== -1 ? dataArray.length - 1 - emptyIndex : -1; // Convert to the actual index from the reversed array's index
    
        if (actualIndex !== -1) {
            // Update the dataArray with the new value
            const newArray = [...dataArray];
            newArray[actualIndex].value = value;
            setDataArray(newArray);
            toast.success('Elemento adicionado com sucesso!');
        } else {
            // No empty spot found, stack is full
            toast.error('Stack is full.');
        }
    };
    
    


    const removeElementByIndex = () => {
        if (!isInitialized) {
            toast.error('Please initialize the stack first.');
            return;
        }
    
        // Find the index of the first non-empty value
        const nonEmptyIndex = dataArray.findIndex(item => item.value !== '');
    
        if (nonEmptyIndex !== -1) {
            const newArray = [...dataArray];
            newArray[nonEmptyIndex].value = ''; // Set the first non-empty value to be empty
            
            setDataArray(newArray);
            
            toast.success('Elemento removido com sucesso!');
        } else {
            toast.error('Stack is empty');
        }
    };
    


    const searchByValue = () => {
        const value = (document.getElementById("searchValueInput") as HTMLInputElement).value;
        const indices = dataArray.map((item, index) => item.value === value ? dataArray.length - 1 - index : -1).filter(index => index !== -1);
    
        if (indices.length > 0) {
            toast.success("Value found at index/indices: " + indices.join(", "));
        } else {
            toast.error("Value not found.");
        }
    };
    
    const searchByPosition = () => {
        const position = parseInt((document.getElementById("searchPositionInput") as HTMLInputElement).value, 10);
        const reversedPosition = dataArray.length - 1 - position;
        if (reversedPosition >= 0 && reversedPosition < dataArray.length) {
            let value = dataArray[reversedPosition].value;
            toast.success(`Value at position ${position} is ${value}.`);
        } else {
            toast.error(`Invalid position.`);
        }
    };
const clearStack = () => {
    setDataArray([]);
    toast.success('Stack cleared successfully!');
};

    return (
    <div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>

        <div className={styles.sidebar + (sidebarActive ? ` ${styles.active}` : '')}>
            <input className={styles.input} type="number" id="arraySizeInput" placeholder="Stack Size" ref={sizeRef} />
            <button className={styles.button} onClick={initializeStack}>Initialize Stack</button>
            <input className={styles.input} type="text" id="dataInput" placeholder="Enter value" ref={inputRef}/>
            <button className={styles.button} onClick={addElement}>Push</button>

            <Button description={"Pop"} onClick={removeElementByIndex} />

            <input className={styles.input} type="text" id="searchValueInput" placeholder="Search by value" />
            <button className={styles.button} onClick={searchByValue}>Search Value</button>

            <input className={styles.input} type="number" id="searchPositionInput" placeholder="Search by position" min="0" />
            <button className={styles.button} onClick={searchByPosition}>Search Position</button>

            <button className={styles.button} onClick={clearStack}>Clear</button>


        </div>
{/*
        <div className={styles.titleArray}>
            <div className={styles.texts}>
                <p className={styles.p}>Array</p>
                <p className={styles.p}>Array</p>
            </div>
            <div className={styles.texts}>
                <p className={styles.p}>Array</p>
                <p className={styles.p}>Array</p>
            </div>
            <div className={styles.texts}>
                <p className={styles.p}>Array</p>
                <p className={styles.p}>Array</p>
            </div>
            <div className={styles.texts}>
                <p className={styles.p}>Array</p>
                <p className={styles.p}>Array</p>
            </div>
            <div className={styles.texts}>
                <p className={styles.p}>Array</p>
                <p className={styles.p}>Array</p>
            </div>
        </div> */}
        {/*<h2 className={styles.h2}>Array</h2>*/}

        <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
        <h1 className={styles.h1}>Stack</h1>
        </div>
        </div>

            <div className={styles.mainContainer}>
                <StackComponent
                    dataArray={dataArray}
                    setRemovingIndices={setRemovingIndices}
                    removingIndices={removingIndices}
                    itemFoundAtIndex={itemFoundAtIndex}
                />
            </div>
        </div>
    );
}

