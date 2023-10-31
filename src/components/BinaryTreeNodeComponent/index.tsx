import React from 'react';
import { BinaryTreeNodeProps } from './props';
import styles from './styles.module.css';
import { memo } from "react";

const BinaryTreeNodeComponent: React.FC<BinaryTreeNodeProps & { visitedNodes: number[]; targetNode: number | null; isRoot?: boolean; x: number; y: number; nodeCount: number, distance: number }> = ({ node, level, visitedNodes, targetNode, isRoot, x, y, nodeCount, distance }) => {
    const isVisited = visitedNodes.includes(node?.value || 0);
    const isTarget = node?.value === targetNode;

    const childY = y + 160;
    const offset = Math.pow(1.5, level) * 20;
    const newX = x + (nodeCount * offset);
    const newDistance = distance / 1.5;

    const dynamicHeight = 110 + (level * 50);

    // Calculate the angle based on the level and distance
    //the angle should be wider for nodes that are further away from the root
    //and narrower for nodes that are closer to the root
    const minTheta = 15;  // Minimum angle in degrees
    const maxTheta = 120;  // Maximum angle in degrees

    const theta = minTheta + (maxTheta - minTheta) * ((level + 1) / 10);
    return (
        <div className={styles.nodeContainer} style={{ position: 'relative' }}>
            {node && (
                <div className={`${styles.valueContainer} ${isVisited ? styles.visited : ''} ${isTarget ? styles.target : ''} ${isRoot ? styles.root : ''}`}
                    style={{ left: `${newX}px`, top: `${y}px` }}>
                    {node.value}
                </div>
            )}
            <svg height={dynamicHeight} width='100%'
                 className={styles.line}
                 style={{ position: 'absolute', top: `${y + 50}px`, left: `${newX +10}px`, transform:`rotate(${theta}deg)`, border: '1px solid black'}}>
                {node?.left && <line x1="0" y1="0" x2="-200" y2="160" stroke="black" />}
            </svg>
            <svg height={dynamicHeight} width='100%'
                 className={styles.line}
                 style={{ position: 'absolute', top: `${y + 50}px`, left: `${newX +40}px`, transform:`rotate(-${theta}deg)`, border: '1px solid black'}}>
                {node?.right && <line x1="0" y1="0" x2="200" y2="160" stroke="black" />}
            </svg>

            {node?.left && <BinaryTreeNodeComponent node={node.left} level={level + 1} visitedNodes={visitedNodes} targetNode={targetNode} x={newX - offset} y={childY} nodeCount={nodeCount - 1} distance={newDistance} />}
            {node?.right && <BinaryTreeNodeComponent node={node.right} level={level + 1} visitedNodes={visitedNodes} targetNode={targetNode} x={newX + offset} y={childY} nodeCount={nodeCount + 1} distance={newDistance} />}
        </div>
    );
};

export default memo(BinaryTreeNodeComponent);
