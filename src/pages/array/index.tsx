import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import { ArrayComponent } from '@/components/ArrayComponent';
import { ArrayItem } from '@/components/ArrayComponent/props';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/Button';

export default function ArrayPage() {
    const [dataArray, setDataArray] = useState<ArrayItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const sizeRef = useRef<HTMLInputElement>(null); // Reference to the size input field
    const [itemFoundAtIndex, setItemFoundAtIndex] = useState<number | null>(null);
    const [removingIndices, setRemovingIndices] = useState<number[]>([]);
    const [sidebarActive, setSidebarActive] = useState(false);

    const successToast = () => toast.success('Success!');
    const errorToast = () => toast.error('Error!');

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const initializeArray = () => {
        const sizeInput = sizeRef.current;
        if (sizeInput) {
            const size = parseInt(sizeInput.value, 10);
            if (!isNaN(size) && size > 0) {
                // Initialize the array with the specified size
                const newArray: ArrayItem[] = Array.from({ length: size }, (_, index) => ({ value: '', index }));
                setDataArray(newArray);
            } else {
                toast.error('Please enter a valid array size.');
            }
        } else {
            toast.error('Failed to access array size input.');
        }
    };


    const addElement = () => {
        const value = inputRef.current?.value;
        const emptyIndex = dataArray.findIndex(item => item.value === '');
    
        if (!value) {
            toast.error('Please enter a value.');
            return;
        }
    
        if (emptyIndex !== -1) {
            // If there is an empty position, fill it with the new value
            const updatedArray = [...dataArray];
            updatedArray[emptyIndex] = { value: value, index: emptyIndex };
            setDataArray(updatedArray);
            (inputRef.current as HTMLInputElement).value = ''; // Clear the input field
            toast.success(`Element added successfully at index ${emptyIndex}.`);
        } else {
            // If there are no empty positions, show an error message
            toast.error('Cannot add more elements. Array is already full.');
        }
    };

    const addAtIndex = () => {
        const value = inputRef.current?.value;
        const indexInput = document.getElementById("swapIndex1") as HTMLInputElement;
        const index = parseInt(indexInput.value, 10);
    
        if (!value || isNaN(index)) return;
    
        if (index >= 0 && index < dataArray.length) {
            // Replace the existing element at the specified index
            const newArray = [...dataArray];
            newArray[index] = { value: value, index: index };
            setDataArray(newArray);
            (inputRef.current as HTMLInputElement).value = ''; // Clear the input field
            indexInput.value = ''; // Clear the index input field
            toast.success(`Element replaced successfully at index ${index}.`);
        } else if (index === dataArray.length) {
            // Add a new element at the end of the array
            setDataArray(prevArray => [...prevArray, { value: value, index: index }]);
            (inputRef.current as HTMLInputElement).value = ''; // Clear the input field
            indexInput.value = ''; // Clear the index input field
            toast.success(`Element added successfully at index ${index}.`);
        } else {
            toast.error('Invalid index.');
        }
    };

    const removeElement = () => {
        const value = (document.getElementById("dataInput") as HTMLInputElement).value;
        const index = dataArray.findIndex(item => item.value === value);
        if (index !== -1) {
            setRemovingIndices([...removingIndices, index]);
            setTimeout(() => {
                const newArray = dataArray.filter((item, idx) => idx !== index);
                setDataArray(newArray.map((item, idx) => ({ ...item, index: idx })));
                setRemovingIndices(prevIndices => prevIndices.filter(i => i !== index));
                toast.success('Elemento removido com sucesso!');
            }, 1500);
        } else {
            toast.error('Por favor, insira um valor.');
        }
};
    const removeElementByIndex = () => {
    const indexStr = (document.getElementById("indexInput") as HTMLInputElement).value;
    const index = parseInt(indexStr);

    if (index >= 0 && index < dataArray.length) {
        setRemovingIndices([...removingIndices, index]);
        setTimeout(() => {
            const newArray = dataArray.filter((item, idx) => idx !== index);
            setDataArray(newArray.map((item, idx) => ({ ...item, index: idx })));
            setRemovingIndices(prevIndices => prevIndices.filter(i => i !== index));
            toast.success('Elemento removido com sucesso!');
        }, 1500);
    } else {
        toast.error('Índice inválido.');
    }
};

  const updateValue = () => {
    const newValue = (document.getElementById("updateValueInput") as HTMLInputElement).value;
    const indexToUpdate = parseInt((document.getElementById("updateValueInputIndex") as HTMLInputElement).value);

    if (!newValue || isNaN(indexToUpdate)) {
      toast.error('Please provide both a new value and a valid index.');
      return;
    }

    if (indexToUpdate < 0 || indexToUpdate >= dataArray.length) {
      toast.error('Invalid index.');
      return;
    }

    const updatedArray = [...dataArray];
    updatedArray[indexToUpdate] = { ...updatedArray[indexToUpdate], value: newValue };
    setDataArray(updatedArray);

    toast.success(`Value at index ${indexToUpdate} updated successfully.`);
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


    const swapElements = () => {
        const index1 = parseInt((document.getElementById("swapIndex1") as HTMLInputElement).value);
        const index2 = parseInt((document.getElementById("swapIndex2") as HTMLInputElement).value);

        if (!isNaN(index1) && !isNaN(index2) && index1 !== index2 &&
            index1 >= 0 && index1 < dataArray.length &&
            index2 >= 0 && index2 < dataArray.length) {

            setItemFoundAtIndex(index1);

            setTimeout(() => {
                setItemFoundAtIndex(index2);

                setTimeout(() => {
                    const newArray = [...dataArray];
                    const temp = newArray[index1];
                    newArray[index1] = newArray[index2];
                    newArray[index2] = temp;


                    newArray[index1].index = index1;
                    newArray[index2].index = index2;

                    setDataArray(newArray);


                    setItemFoundAtIndex(-1);
                }, 500);
            }, 500);
        } else {
            alert("Please provide valid indices to swap.");
        }
    };

    return (
    <div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>

        <div className={styles.sidebar + (sidebarActive ? ` ${styles.active}` : '')}>
            <input className={styles.input} type="number" id="arraySizeInput" placeholder="Array Size" ref={sizeRef} />
            <button className={styles.button} onClick={initializeArray}>Initialize Array</button>

            <input className={styles.input} type="text" id="dataInput" placeholder="Enter value" ref={inputRef}/>
            <button className={styles.button} onClick={addElement}>Add</button>
            <button className={styles.button} onClick={addAtIndex}>Add At Idx</button>
            <button className={styles.button} onClick={removeElement}>Remove</button>

            <input className={styles.input} type="text" id="updateValueInput" placeholder="Value to update" />
            <input className={styles.input} type="text" id="updateValueInputIndex" placeholder="Index" />
            <button className={styles.button} onClick={updateValue}>Update Value</button>

            <input className={styles.input} type="text" id="searchValueInput" placeholder="Search by value" />
            <button className={styles.button} onClick={searchByValue}>Search Value</button>

            <input className={styles.input} type="number" id="searchPositionInput" placeholder="Search by position" min="0" />
            <button className={styles.button} onClick={searchByPosition}>Search Position</button>

            <input className={styles.input} type="number" id="swapIndex1" placeholder="Index 1" min="0" />
            <input className={styles.input} type="number" id="swapIndex2" placeholder="Index 2" min="0" />
            <button className={styles.button} onClick={swapElements}>Swap</button>

            <input className = {styles.input} type="number" id="indexInput" placeholder="Remove By Index" />
            <Button description={"Remove By Index"} onClick={removeElementByIndex} />

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
        <h1 className={styles.h1}>Array</h1>
        </div>
        </div>

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

