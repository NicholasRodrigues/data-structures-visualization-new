import React from 'react';
import styles from './styles.module.css';
import { ArrayProps } from './props';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const QueueComponent: React.FC<ArrayProps> = 
    ({ dataArray, setRemovingIndices, removingIndices, itemFoundAtIndex, front, rear }) => {
    
    return (
        <TransitionGroup className="arrayContainer" component="div">
            {dataArray.map((item, index) => (
                <CSSTransition key={item.index} timeout={500} classNames="swap">
                    <div className={styles.queueItemContainer}>
                        {index === front && <div className={styles.frontIndicator}></div>}
                        
                        <span 
                            className={`
                                ${styles.array_item} 
                                ${item.value !== '' ? styles.nonEmptyValue : ''}
                                ${removingIndices.includes(index) ? styles.array_item_marked : ''} 
                                ${itemFoundAtIndex === index ? styles.array_item_highlight : ''}
                            `}
                            onAnimationEnd={() => {
                                setRemovingIndices(prevIndices => prevIndices.filter(i => i !== index));
                            }}
                        >
                            {item.value}
                            [{item.index}]
                        </span>

                        {index === rear && <div className={styles.rearIndicator}></div>}
                    </div>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}

