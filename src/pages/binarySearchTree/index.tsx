import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import BinaryTreeComponent from '@/components/BinaryTreeComponent';
import { BinaryTreeNode } from "@/components/BinaryTreeComponent/props";
import { Button } from '@/components/Button';
import { toast } from 'react-hot-toast';
// @ts-ignore
import Tree from 'react-d3-tree';

export default function BinaryTreePage() {
    const [binaryTree, setBinaryTree] = useState<BinaryTreeNode | null>(null);
    const [searchResult, setSearchResult] = useState<number | null | number[]>(null);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [renderCount, setRenderCount] = useState(0);
    const [traversalResult, setTraversalResult] = useState<number[]>([]);
    const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
    const [targetNode, setTargetNode] = useState<number | null>(null);

interface D3Node {
  name: string;
  children?: D3Node[];
}
// @ts-ignore
const convertToD3TreeFormat = (node: BinaryTreeNode | null): D3Node | null => {
  if (!node) return null;
  return {
    name: node.value.toString(),
    children: [
      convertToD3TreeFormat(node.left),
      convertToD3TreeFormat(node.right),
    ].filter((n) => n) as D3Node[],
  };
};
    const [d3TreeData, setD3TreeData] = useState<D3Node[] | null>(null);

    useEffect(() => {
    const newD3TreeData = convertToD3TreeFormat(binaryTree);
    if(!newD3TreeData) return;
    setD3TreeData([newD3TreeData]);
  }, [binaryTree]);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const addNode = (value: number, node: BinaryTreeNode | null): BinaryTreeNode => {
      if (node === null) {
        return { value, left: null, right: null };
      }

      if (value < node.value) {
        node.left = addNode(value, node.left);
      } else if (value > node.value) {
        node.right = addNode(value, node.right);
      }

      return node;
};




    const removeNode = (value: number, node: BinaryTreeNode | null): BinaryTreeNode | null => {
  if (node === null) return null;

  // Navegar até o nó
  if (value < node.value) {
    node.left = removeNode(value, node.left);
  } else if (value > node.value) {
    node.right = removeNode(value, node.right);
  } else {
    // Nó encontrado, vamos removê-lo
    if (node.left === null && node.right === null) {
      return null;
    }
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    // Nó com dois filhos, encontrar o menor valor à direita
    let minValue = findMinValue(node.right);
    node.value = minValue;
    node.right = removeNode(minValue, node.right);
  }

  return node;
};

const findMinValue = (node: BinaryTreeNode | null): number => {
    if (node === null) return -1;
    let current = node;
    while (current.left !== null) {
    current = current.left;
    }
    return current.value;
};

const inOrderTraversal = (node: BinaryTreeNode | null, result: number[] = []): number[] => {
    if (node === null) return result;
    inOrderTraversal(node.left, result);
    result.push(node.value);
    inOrderTraversal(node.right, result);
    return result;
};

const preOrderTraversal = (node: BinaryTreeNode | null, result: number[] = []): number[] => {
    if (node === null) return result;
    result.push(node.value);
    preOrderTraversal(node.left, result);
    preOrderTraversal(node.right, result);
    return result;
};

const postOrderTraversal = (node: BinaryTreeNode | null, result: number[] = []): number[] => {
    if (node === null) return result;
    postOrderTraversal(node.left, result);
    postOrderTraversal(node.right, result);
    result.push(node.value);
    return result;
};

    const handleInOrder = () => {
  const result = inOrderTraversal(binaryTree);
  setTraversalResult(result);
};

const handlePreOrder = () => {
  const result = preOrderTraversal(binaryTree);
  setTraversalResult(result);
};

const handlePostOrder = () => {
  const result = postOrderTraversal(binaryTree);
  setTraversalResult(result);
};


    const addNodeToTree = () => {
    const value = parseInt((document.getElementById('addNodeValue') as HTMLInputElement).value);
    if (!isNaN(value)) {
        setBinaryTree(prevTree => {
            console.log("Previous Tree: ", prevTree);  // Debug
            const newTree = addNode(value, prevTree);
            console.log("New Tree: ", newTree);  // Debug
            return newTree;
        });
    }
    setRenderCount(prevCount => prevCount + 1);
};

    const removeNodeFromTree = () => {
        const value = parseInt((document.getElementById('removeNodeValue') as HTMLInputElement).value);
        if (!isNaN(value)) {
            setBinaryTree(prevTree => removeNode(value, prevTree));
        }
        setRenderCount(prevCount => prevCount + 1);
    };

//binary search algorithm
    const searchNode = () => {
        const value = parseInt((document.getElementById('searchNodeValue') as HTMLInputElement).value);
        if (!isNaN(value)) {
            const result = search(value, binaryTree);
            setSearchResult(result);
        }
    }

const search = (value: number, node: BinaryTreeNode | null): number | null | number[] => {
    if (node === null) return null;

    // Marcar como visitado
    setVisitedNodes((prev) => [...prev, node.value]);

    if (node.value === value) {
        // Encontrou o nó alvo
        setTargetNode(node.value);

        // Reverter cor do nó alvo após 2 segundos
        setTimeout(() => {
            setTargetNode(null);

            // Limpar nós visitados
            setVisitedNodes([]);

            // Limpar resultado da busca
            setSearchResult(null);
        }, 2000);

        return value;
    }

    // Reverter cor do nó visitado após 2 segundos
    setTimeout(() => {
        setVisitedNodes((prev) => prev.filter((n) => n !== node.value));
    }, 2000);

    if (value < node.value) return search(value, node.left);
    if (value > node.value) return search(value, node.right);

    return null;
};



    return (
        <div>
            <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>
            <div className={styles.sidebar + (sidebarActive ? ` ${styles.active}` : '')}>
                <input type="number" id="addNodeValue" placeholder="Add Node Value" className={styles.input} />
                <Button description={"Add Node"} onClick={addNodeToTree} />

                <input type="number" id="removeNodeValue" placeholder="Remove Node Value" className={styles.input} />
                <Button description={"Remove Node"} onClick={removeNodeFromTree} />

                <Button description={"In-Order"} onClick={handleInOrder} />
                <Button description={"Pre-Order"} onClick={handlePreOrder} />
                <Button description={"Post-Order"} onClick={handlePostOrder} />

                <input type="number" id="searchNodeValue" placeholder="Search Node Value" className={styles.input} />
                <Button description={"Search Node"} onClick={searchNode} />


            </div>
            <div className={styles.traversalResultContainer}>]
                {traversalResult.map((value, index) => (
                    <div key={index} className={styles.valueContainer}>{value}
                    </div>
                ))}
            </div>

            <div className={styles.titleContainer}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.h1}>Binary Tree</h1>
                </div>
            </div>
            <div className={styles.treeContainer}>
        {d3TreeData && (
          <Tree data={d3TreeData} />
        )}
      </div>
        </div>
    );
}

