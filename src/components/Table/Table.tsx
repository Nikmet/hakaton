import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import "./Table.scss";

export interface ITableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}

export const Table = ({ children }: ITableProps): JSX.Element => {
    return <div className="table">{children}</div>;
};
