import React, { useState } from 'react';
//@ts-ignore
import Tree from 'react-d3-tree';
import { BinaryTreeNode } from "@/components/BinaryTreeComponent/props";
import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { toast } from 'react-hot-toast';

const NodeLabel = ({ nodeData }: any) => (
  <div className={styles.nodeC}>
    {nodeData.name}
  </div>
);

const convertToD3TreeFormat = (node: BinaryTreeNode | null): any => {
  if (node === null) {
    return null;
  }
  const d3Node = {
    name: node.value.toString(),
    children: [] as any[],
  };
  if (node.left) {
    d3Node.children.push(convertToD3TreeFormat(node.left));
  }
  if (node.right) {
    d3Node.children.push(convertToD3TreeFormat(node.right));
  }
  return d3Node;
};

const BinaryTreeComponent: React.FC = () => {
    const [binaryTree, setBinaryTree] = useState<BinaryTreeNode | null>({ value: NaN, left: null, right: null });
    const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
    const [targetNode, setTargetNode] = useState<number | null>(null);
    const [searchResult, setSearchResult] = useState<number | null | number[]>(null);
    const [visitedPath, setVisitedPath] = useState<number[]>([]);
    const [inOrderPath, setInOrderPath] = useState<number[]>([]);
    const [preOrderPath, setPreOrderPath] = useState<number[]>([]);
    const [postOrderPath, setPostOrderPath] = useState<number[]>([]);
    const [sidebarActive, setSidebarActive] = useState(false);

const inOrderTraversal = (node: BinaryTreeNode | null) => {
  if (node === null) return;

  inOrderTraversal(node.left);

  setInOrderPath((prev) => [...prev, node.value]);

  setTimeout(() => {
    setInOrderPath((prev) => prev.filter((n) => n !== node.value));
  }, 5000);

  inOrderTraversal(node.right);
};

const preOrderTraversal = (node: BinaryTreeNode | null) => {
  if (node === null) return;

  // Adicionar à lista de nós visitados
  setPreOrderPath((prev) => [...prev, node.value]);

  // Fazer o nó desaparecer após 2 segundos
  setTimeout(() => {
    setPreOrderPath((prev) => prev.filter((n) => n !== node.value));
  }, 5000);

  preOrderTraversal(node.left);
  preOrderTraversal(node.right);
};

const postOrderTraversal = (node: BinaryTreeNode | null) => {
  if (node === null) return;

  postOrderTraversal(node.left);
  postOrderTraversal(node.right);

  // Adicionar à lista de nós visitados
  setPostOrderPath((prev) => [...prev, node.value]);

  // Fazer o nó desaparecer após 2 segundos
  setTimeout(() => {
    setPostOrderPath((prev) => prev.filter((n) => n !== node.value));
  }, 5000);
};

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

const search = (value: number, node: BinaryTreeNode | null): number | null => {
      if (node === null) return null;

      setVisitedPath((prev) => [...prev, node.value]);

      if (node.value === value) {
        // Encontrou o nó alvo
        setTimeout(() => {
          setVisitedPath([]);
        }, 5000);
        return value;
      }

      if (value < node.value) return search(value, node.left);
      if (value > node.value) return search(value, node.right);

      return null;
};

const DrawPath: React.FC<{ path: number[] }> = ({ path }) => {
  return (
    <div className={styles.pathContainer}>
      {path.map((node, index) => (
        <div key={index} className={styles.pathNode} style={{ left: `${index * 20}px` }}>
          {node}
        </div>
      ))}
    </div>
  );
};

const DrawSearchPath: React.FC<{ path: number[] }> = ({ path }) => {
  const lastIndex = path.length - 1;
  return (
    <div className={styles.pathContainer}>
      {path.map((node, index) => (
        <div
          key={index}
          className={`${styles.searchPathNode} ${index === lastIndex ? styles.lastSearchPathNode : ''}`}
          style={{ left: `${index * 20}px` }}
        >
          {node}
        </div>
      ))}
    </div>
  );
};

     const deepCopy = (node: BinaryTreeNode | null): BinaryTreeNode | null => {
        if (node === null) return null;
        const newNode: BinaryTreeNode = { value: node.value, left: null, right: null };
        newNode.left = deepCopy(node.left);
        newNode.right = deepCopy(node.right);
        return newNode;
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



const addNodeToTree = () => {
  const value = parseInt((document.getElementById('addNodeValue') as HTMLInputElement).value);

  if (isNaN(value)) {
    toast.error('Please enter a valid number');
    return;
  }

  if (isNaN(binaryTree!.value) ) {
    // Se o nó raiz atual tem valor 0, substituímos ele com o novo valor
    // e marcamos esse nó como a raiz.
    setBinaryTree({ value, left: null, right: null, isRoot: true });
  } else {
    // Caso contrário, adicionamos o novo valor à árvore existente
    const rootCopy = deepCopy(binaryTree); // Faz uma cópia profunda do estado atual
    const newRoot = addNode(value, rootCopy);
    // Se é a primeira inserção, marcar o novo nó como raiz
    if (newRoot && !newRoot.isRoot) {
      newRoot.isRoot = true;
    }
    setBinaryTree(newRoot); // Atualiza o estado com a nova árvore
  }
};

const removeNode = (value: number, node: BinaryTreeNode | null): BinaryTreeNode | null => {
  if (node === null) {
    return null;
  }

  // Navegar até o nó a ser removido
  if (value < node.value) {
    node.left = removeNode(value, node.left);
  } else if (value > node.value) {
    node.right = removeNode(value, node.right);
  } else {
    // Caso 1: O nó é uma folha
    if (!node.left && !node.right) {
      return null;
    }

    // Caso 2: O nó tem um filho (esquerdo ou direito)
    if (!node.left) {
      return node.right;
    } else if (!node.right) {
      return node.left;
    }

    // Caso 3: O nó tem dois filhos
    let current = node.right;
    while (current.left !== null) {
      current = current.left;
    }
    node.value = current.value;
    node.right = removeNode(current.value, node.right);
  }
  return node;
};

const removeNodeFromTree = () => {
  const value = parseInt((document.getElementById('removeNodeValue') as HTMLInputElement).value);
  if (binaryTree === null) {
    toast.error('Tree is empty');
    return;
  }
  if (isNaN(value)) {
    toast.error('Please enter a valid number');
    return;
  }
  const rootCopy = deepCopy(binaryTree); // Faz uma cópia profunda do estado atual
  const newRoot = removeNode(value, rootCopy);
  setBinaryTree(newRoot); // Atualiza o estado com a nova árvore
};


  const d3TreeData = convertToD3TreeFormat(binaryTree);

  const searchNode = () => {
    const value = parseInt((document.getElementById('searchNodeValue') as HTMLInputElement).value);
    if (!isNaN(value)) {
      const result = search(value, binaryTree);
      setSearchResult(result);
    }
  };

  const clearTree = () => {
    setBinaryTree({ value: NaN, left: null, right: null });
  };

 const getCustomNodeShape = (nodeData: any) => {
    if (visitedNodes.includes(parseInt(nodeData.name))) {
      return {
        shape: 'circle',
        shapeProps: {
          r: 10,
          fill: 'blue',
        },
      };
    }
    if (targetNode === parseInt(nodeData.name)) {
      return {
        shape: 'circle',
        shapeProps: {
          r: 10,
          fill: 'green',
        },
      };
    }
    return {
      shape: 'circle',
      shapeProps: {
        r: 10,
        fill: 'gray',
      },
    };
  };

  return (
    <div>
            <button className={styles.sidebarToggle} onClick={toggleSidebar}>☰</button>
            <div className={styles.sidebar + (sidebarActive ? ` ${styles.active}` : '')}>
            <input type="number" id="addNodeValue" placeholder="Add Node Value" className={styles.input} />
            <Button description={"Add Node"} onClick={addNodeToTree} />
            <input type="number" id="removeNodeValue" placeholder="Remove Node Value" className={styles.input} />
            <Button description={"Remove Node"} onClick={removeNodeFromTree} />
            <input type="number" id="searchNodeValue" placeholder="Search Node Value" className={styles.input} />
            <Button description={"Search Node"} onClick={searchNode} />
            <Button description={"In Order Traversal"} onClick={() => inOrderTraversal(binaryTree)} />
            <Button description={"Pre Order Traversal"} onClick={() => preOrderTraversal(binaryTree)} />
            <Button description={"Post Order Traversal"} onClick={() => postOrderTraversal(binaryTree)} />
            <Button description={"Clear Tree"} onClick={clearTree} />
            </div>

            <div className={styles.titleContainer}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.h1}>Binary Tree</h1>
                </div>
            </div>
            {visitedPath.length > 0 && <DrawSearchPath path={visitedPath} ></DrawSearchPath>}
            {inOrderPath.length > 0 && <DrawPath path={inOrderPath} />}
            {preOrderPath.length > 0 && <DrawPath path={preOrderPath} />}
            {postOrderPath.length > 0 && <DrawPath path={postOrderPath} />}
            <div className={styles.treeWrapper} style={{ width: '1000000px', height: '2000px' }}>
                <Tree className={styles.tree}
                    rootNodeClassName={styles.node__root}
                      branchNodeClassName={styles.node__branch}
                      // leafNodeClassName={styles.node__leaf}
                      data={d3TreeData ? [d3TreeData] : []}
                      orientation="vertical"
                      translate={{ x: 850, y: 200 }} nodeLabelComponent={{
                    render: <NodeLabel />,
                    foreignObjectWrapper: {
                        y: 24,
                    },
                  

                }}
                nodeSvgShape={getCustomNodeShape}
                />
            </div>

        </div>
  );
};

export default BinaryTreeComponent;
