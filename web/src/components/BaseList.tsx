import { ReactElement, ReactNode } from "react";

interface IList<T> {
    list: T[];
    children: (list: T[]) => ReactElement;
    customLoading?: ReactElement;
    customEmpty?: ReactElement;
}

function BaseList<T>(props: IList<T>): ReactElement {
    if (props.list == undefined) 
        return props.customLoading ? props.customLoading : <>Carregando...</>;
    
    if (props.list.length === 0) 
        return props.customEmpty ? props.customEmpty : <>Vazio</>;

    return props.children(props.list);
}

export default BaseList;