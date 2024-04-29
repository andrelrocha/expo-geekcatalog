import { DropdownData } from "../../../types/utils/dropDownDTO";

type OriginalItem<T> = {
    [key: string]: any;
};

export const convertArrayToDropdown = <T>(data: OriginalItem<T>[], label: string, value: string): DropdownData[] => {
    return data.map(item => ({
        value: item[value],
        label: item[label]
    }));
};