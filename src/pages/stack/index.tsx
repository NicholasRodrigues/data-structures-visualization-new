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
    const [itemFoundAtIndex, setItemFoundAtIndex] = useState<number | null>(null);
    const [removingIndices, setRemovingIndices] = useState<number[]>([]);
    const [sidebarActive, setSidebarActive] = useState(false);
    const successToast = () => toast.success('Success!');
    const errorToast = () => toast.error('Error!');

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };



    const addElement = () => {
        const value = inputRef.current?.value;
        if (value) {
            setDataArray(prevArray => [...prevArray, { value: value, index: prevArray.length }]);
            (document.getElementById("dataInput") as HTMLInputElement).value = '';  // Limpar o campo de entrada
            toast.success('Elemento adicionado com sucesso!');
        } else {
            toast.error('Por favor, insira um valor.');
        }
    };

    const removeElementByIndex = () => {

    const index = dataArray.length-1;

    if (index >= 0 && index < dataArray.length) {
        setRemovingIndices([...removingIndices, index]);
        setTimeout(() => {
            const newArray = dataArray.filter((item, idx) => idx !== index);
            setDataArray(newArray.map((item, idx) => ({ ...item, index: idx })));
            setRemovingIndices(prevIndices => prevIndices.filter(i => i !== index));
            toast.success('Elemento removido com sucesso!');
        }, 1500);
    } else {
        toast.error('Pilha vazia.');
    }
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
    toast.success('Stack cleared successfully!');
};

    return (
    <div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>

        <div className={styles.sidebar + (sidebarActive ? ` ${styles.active}` : '')}>
            <input className={styles.input} type="text" id="dataInput" placeholder="Enter value" ref={inputRef}/>
            <button className={styles.button} onClick={addElement}>Add</button>

            <Button description={"Remove"} onClick={removeElementByIndex} />

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
