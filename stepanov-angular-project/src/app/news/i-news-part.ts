// абстракция новостного элемента
export interface INewsPart {
    id: number | null;
    date: Date;
    title: string;
    text: string;
    isChecked: boolean;
}