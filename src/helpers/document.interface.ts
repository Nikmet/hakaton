export enum StatusDocument {
    Wait = "Ожидает отправления",
    OnRoad = "В пути"
}

export interface IDocument {
    id: string;
    project_name: string;
    project_address: string;
    project_address_lat: number;
    project_address_lon: number;
    warehouse_address: string;
    warehouse_address_lat: number;
    warehouse_address_lon: number;
    contractor: string;
    status: string;
    invoice: IInvoice[];
}

export interface IInvoice {
    invoice_nomenclature: string;
    invoice_count: number;
    invoice_unit: string;
    invoice_price: number;
    invoice_sum: number;
}
