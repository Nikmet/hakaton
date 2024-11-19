import { useEffect, useState } from "react";
import "./App.scss";
import { Table } from "./components/Table/Table";
import { TableHead } from "./components/TableHead/TableHead";
import { TableRow } from "./components/TableRow/TableRow";
import { titles } from "./initial_data";
import { IDocument } from "./helpers/document.interface";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";

function App() {
    const [documents, setDocuments] = useState<IDocument[]>([]);
    const [modalWindowIsOpened, setModalWindowIsOpened] = useState<boolean>(false);
    const [modalWindowData, setModalWindowData] = useState<IDocument>(documents[0]);
    const [transport, setTransport] = useState<string>("");

    const getDocuments = async (): Promise<IDocument[]> => {
        const data = await fetch("http://localhost/Hakaton/hs/data/diliverys", {
            method: "POST",
            body: JSON.stringify({
                transport: transport
            })
        });
        return await data.json();
    };

    const openModelWindow = (data: IDocument) => {
        setModalWindowData(data);
        setModalWindowIsOpened(true);
    };

    useEffect(() => {
        setDocuments([]);
        getDocuments().then(d => {
            console.log(d);
            setDocuments(d);
        });
    }, [transport]);

    return (
        <div className="app__wrapper">
            <h1 className="app__title">
                Заявки на поставку
                <div className="app__title-form">
                    <p>Номер автомобиля</p>
                    <input
                        type="text"
                        placeholder="A999AA33"
                        onChange={e => {
                            setTransport(e.target.value);
                        }}
                    />
                </div>
            </h1>
            <Table>
                <TableHead titles={titles} />
                {documents.map(d => (
                    <TableRow info={d} key={d.id} onClick={() => openModelWindow(d)} />
                ))}
            </Table>
            {modalWindowIsOpened && <ModalWindow changeVisible={setModalWindowIsOpened} data={modalWindowData} />}
        </div>
    );
}

export default App;
