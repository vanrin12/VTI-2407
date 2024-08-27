import Button from "../Button";

interface TableRowProps {
    rowItem: any;
}
function TableRow({ rowItem }: TableRowProps) {
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
                <Button variant="danger" onClick={() => { }}>Delete</Button>
            </td>
        </tr>
    );
}

export default TableRow;
