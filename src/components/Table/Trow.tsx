import Button from "../Button";

interface TableRowProps {
    rowItem: any;
    onClickDelete: (id: string) => void;
}
function TableRow({ rowItem, onClickDelete }: TableRowProps) {
    const renderRowItem = () => {
        return Object.keys(rowItem).map((key) => {
            return <td key={key}>{rowItem[key]}</td>;
        });
    };
    return (
        <tr>
            {renderRowItem()}
            <td>
                <Button variant="warning" onClick={() => { }}>Edit</Button>
            </td>
            <td>
                <Button variant="danger" onClick={() => onClickDelete(rowItem.id)}>Delete</Button>
            </td>
        </tr>
    );
}

export default TableRow;
