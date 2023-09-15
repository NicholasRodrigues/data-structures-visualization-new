import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import { ArrayComponent } from '../../components/ArrayComponent';
import { ArrayItem } from '../../components/ArrayComponent/props';

// hooks next
// TODO: deixar o input salvo em um state
export default function ArrayPage() {
    const [dataArray, setDataArray] = useState<ArrayItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [itemFoundAtIndex, setItemFoundAtIndex] = useState<number | null>(null);
    const [removingIndices, setRemovingIndices] = useState<number[]>([]);
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };



    const addElement = () => {
        const value = inputRef.current?.value;
        if (value) {
            setDataArray(prevArray => [...prevArray, { value: value, index: prevArray.length }]);
            (document.getElementById("dataInput") as HTMLInputElement).value = '';  // Limpar o campo de entrada
        } else {
            alert("Please enter a value.");
        }
    };

    const addAtIndex = () => {
        const value = inputRef.current?.value;
        const indexInput = document.getElementById("swapIndex1") as HTMLInputElement;
        const index = parseInt(indexInput.value, 10);
    
        if (!value || isNaN(index)) return;
    
        const newArray: ArrayItem[] = [
        ...dataArray.slice(0, index),
        { value: value, index: index },
        ...dataArray.slice(index).map((item, idx) => ({ value: item.value, index: idx + index + 1 }))
        ];

    setDataArray(newArray);

    
        if (inputRef.current) inputRef.current.value = '';
        indexInput.value = '';
    };
    

    const removeElement = () => {
        const value = (document.getElementById("dataInput") as HTMLInputElement).value;
        const index = dataArray.findIndex(item => item.value === value);
        if (index !== -1) {
            setRemovingIndices([...removingIndices, index]);
            setTimeout(() => {
                const newArray = dataArray.filter((item, idx) => idx !== index);
                setDataArray(newArray);
                setRemovingIndices(prevIndices => prevIndices.filter(i => i !== index));
            }, 1500);  // Espera 1.5 segundos (1 segundo para ficar vermelho + 0.5 segundos para a animação de fade-out)
        } else {
            alert("Value not found.");
        }
};


    const searchByValue = () => {
        const value = (document.getElementById("searchValueInput") as HTMLInputElement).value;
        const index = dataArray.findIndex(item => item.value === value);
        if (index !== -1) {
            setItemFoundAtIndex(index);
            setTimeout(() => {
                setItemFoundAtIndex(-1);  // Remover o highlight após 2 segundos
            }, 2000);
        } else {
            alert("Value not found.");
        }
};


    const searchByPosition = () => {
        const position = parseInt((document.getElementById("searchPositionInput") as HTMLInputElement).value, 10);
        if (position >= 0 && position < dataArray.length) {
            alert(`Value at position ${position} is ${dataArray[position]}.`);
        } else {
            alert(`Invalid position.`);
        }
    };

    const swapElements = () => {
        const index1 = parseInt((document.getElementById("swapIndex1") as HTMLInputElement).value);
        const index2 = parseInt((document.getElementById("swapIndex2") as HTMLInputElement).value);
        
        if (!isNaN(index1) && !isNaN(index2) && index1 !== index2) {
            const newArray = [...dataArray];
            const temp = newArray[index1];
            newArray[index1] = newArray[index2];
            newArray[index2] = temp;
            setDataArray(newArray);
        } else {
            alert("Please provide valid indices to swap.");
        }
};

    return (
    <div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>

        <div className={styles.sidebar + (sidebarActive ? ` ${styles.active}` : '')}>
            <input className={styles.input} type="text" id="dataInput" placeholder="Enter value" ref={inputRef}/>
            <button className={styles.button} onClick={addElement}>Add</button>
            <button className={styles.button} onClick={addAtIndex}>Add At Idx</button>
            <button className={styles.button} onClick={removeElement}>Remove</button>

            <input className={styles.input} type="text" id="searchValueInput" placeholder="Search by value" />
            <button className={styles.button} onClick={searchByValue}>Search Value</button>

            <input className={styles.input} type="number" id="searchPositionInput" placeholder="Search by position" min="0" />
            <button className={styles.button} onClick={searchByPosition}>Search Position</button>

            <input className={styles.input} type="number" id="swapIndex1" placeholder="Index 1" min="0" />
            <input className={styles.input} type="number" id="swapIndex2" placeholder="Index 2" min="0" />
            <button className={styles.button} onClick={swapElements}>Swap</button>
        </div>

        <h2 className={styles.h2}>Array (Lista Sequencial)</h2>

            <div className={styles.mainContainer}>
                <ArrayComponent 
                    dataArray={dataArray} 
                    setRemovingIndices={setRemovingIndices}
                    removingIndices={removingIndices}
                    itemFoundAtIndex={itemFoundAtIndex} 
                />
            </div>
        </div>
    );
}

