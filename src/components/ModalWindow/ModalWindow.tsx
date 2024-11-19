import { Dispatch, SetStateAction } from "react";
import "./ModalWindow.scss";
import { IDocument } from "../../helpers/document.interface";
import { Table } from "../Table/Table";
import { TableHead } from "../TableHead/TableHead";
import { TableRow } from "../TableRow/TableRow";
import { titlesInvoice } from "../../initial_data";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export interface IModalWindowProps {
    data: IDocument;
    changeVisible: Dispatch<SetStateAction<boolean>>;
}

export const ModalWindow = ({ data, changeVisible }: IModalWindowProps): JSX.Element => {
    const mapState: ymaps.IMapState = {
        center: [56.130317, 40.3906],
        zoom: 5
    };

    const getStatus = () => {
        return data.status == "Ждет отправления" ? "ВПути" : "Доставлена";
    };

    const changeStatus = async () => {
        const answer = await fetch("http://localhost/Hakaton/hs/data/post", {
            method: "POST",
            body: JSON.stringify({
                id: data.id,
                status: getStatus()
            })
        });
        console.log(answer.ok);
        window.location.reload();
    };

    return (
        <>
            <div className="modal-window__overlay">
                <div className="modal-window__wrapper">
                    <div className="modal-window__data">
                        <div className="modal-window__data-right">
                            <h2>Заявка на поставку</h2>
                            <p>Название проекта:</p>
                            <input type="text" value={data.project_name} disabled />
                            <p>Адрес проекта:</p>
                            <textarea value={data.project_address} disabled />
                            <p>Подрядчик:</p>
                            <input type="text" value={data.contractor} disabled />
                            <p>Статус заявки:</p>
                            <input type="text" value={data.status} disabled />
                        </div>
                        <div className="modal-window__map">
                            <YMaps>
                                <Map defaultState={mapState} height={300} width={500}>
                                    <Placemark geometry={[data.project_address_lat, data.project_address_lon]} />
                                    <Placemark
                                        geometry={[data.warehouse_address_lat, data.warehouse_address_lon]}
                                        options={{ iconColor: "#00979c" }}
                                    />
                                </Map>
                            </YMaps>
                        </div>
                    </div>
                    <Table>
                        <TableHead titles={titlesInvoice} />
                        {data.invoice.map(d => (
                            <TableRow info={d} key={d.invoice_nomenclature} />
                        ))}
                    </Table>
                    <div className="modal-window__action-wrapper">
                        <button onClick={changeStatus} className="modal-window__action">
                            {data.status == "Ждет отправления" ? "Начать доставку" : "Завершить доставку"}
                        </button>
                    </div>
                </div>
            </div>
            <button className="modal-window__close" onClick={() => changeVisible(false)}>
                <img src="/close.svg" alt="закрыть" />
            </button>
        </>
    );
};
