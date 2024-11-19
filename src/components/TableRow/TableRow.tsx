import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { IDocument, IInvoice } from "../../helpers/document.interface";
import "./TableRow.scss";

export interface ITableRowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    info: IDocument | IInvoice;
}

export const TableRow = ({ info, onClick }: ITableRowProps): JSX.Element => {
    function isDocument(doc: IDocument | IInvoice): doc is IDocument {
        return (doc as IDocument).id != undefined;
    }

    useEffect(() => {
        console.log();
    }, []);

    return (
        <div className="table__row" onClick={onClick}>
            {isDocument(info) && (
                <>
                    <div className="table__row-item">{info.project_name}</div>
                    <div className="table__row-item">{info.project_address}</div>
                    <div className="table__row-item">{info.contractor}</div>
                    <div className="table__row-item">{info.status}</div>
                </>
            )}
            {!isDocument(info) && (
                <>
                    <div className="table__row-item">{info.invoice_nomenclature}</div>
                    <div className="table__row-item">{info.invoice_count}</div>
                    <div className="table__row-item">{info.invoice_unit}</div>
                    <div className="table__row-item">{info.invoice_price}</div>
                    <div className="table__row-item">{info.invoice_sum}</div>
                </>
            )}
        </div>
    );
};
