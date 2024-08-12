import { Component } from 'react';
import { Table as BsTable } from 'react-bootstrap';
import TableHead from './TableHead';
import TableRow from './TableRow';
class Table extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        const { listTableHead, accountList } = this.props;
        console.log('accountList', accountList);
        
        const renderTableRow = accountList && accountList.map((item) => {
            return <TableRow key={item.id} rowItem={item} />
        })
        return (
            <BsTable striped bordered hover>
                <thead>
                    <TableHead listTableHead={listTableHead} />
                </thead>
                <tbody>
                    {renderTableRow}
                </tbody>
            </BsTable>
        );
    }
}

export default Table;