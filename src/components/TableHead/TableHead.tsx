import "./Tablehead.scss";

export interface ITableHeadProps {
    titles: string[];
}

export const TableHead = ({ titles }: ITableHeadProps): JSX.Element => {
    return (
        <div className="table__head">
            {titles.map(t => (
                <div className="table__head-item" key={t}>
                    {t}
                </div>
            ))}
        </div>
    );
};
