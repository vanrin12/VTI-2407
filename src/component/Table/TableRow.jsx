import Button from "../Button";
function TableRow({ rowItem }) {
    const renderRowItem = () => {
        return Object.keys(rowItem).map((key) => {
            return <td>{rowItem[key]}</td>;
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
