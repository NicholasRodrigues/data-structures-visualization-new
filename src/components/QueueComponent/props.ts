import React from "react";

export interface ArrayItem{
    value: string;
    index: number;
}

export interface ArrayProps {
    dataArray: ArrayItem[];
    setRemovingIndices: React.Dispatch<React.SetStateAction<number[]>>;
    removingIndices: number[];
    itemFoundAtIndex: number | null;
    front: number;
    rear: number;
}
