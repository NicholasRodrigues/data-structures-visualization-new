export interface ArrayItem{
    value: string;
    index: number;
}

export interface ArrayProps {
    dataArray: ArrayItem[];
    setRemovingIndices: React.Dispatch<React.SetStateAction<number[]>>;
    itemFoundAtIndex: number | null;
}
