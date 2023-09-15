import React from 'react';
import styles from './styles.module.css';
import { ArrayProps } from './props';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const ArrayComponent: React.FC<ArrayProps> = ({ dataArray, setRemovingIndices, removingIndices, itemFoundAtIndex }) => {
    return (
        <TransitionGroup className="arrayContainer" component="div">
            {dataArray.map((item, index) => (
                <CSSTransition key={item.index} timeout={500} classNames="swap">
                    <span 
                        className={`
                            ${styles.array_item} 
                            ${removingIndices.includes(index) ? styles.array_item_marked : ''} 
                            ${itemFoundAtIndex === index ? styles.array_item_highlight : ''}
                        `}
                        onAnimationEnd={() => {
                            {
                                setRemovingIndices(prevIndices => prevIndices.filter(i => i !== index));
                            }
                        }}
                    >
                        {item.value}
                        [{item.index}]
                    </span>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}
