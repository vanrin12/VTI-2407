import { Component } from 'react';
import { Table as BsTable } from 'react-bootstrap';
import TableHead from './TableHead';

class Table extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        const { listTableHead } = this.props;
        return (
            <BsTable striped bordered hover>
                <thead>
                    <TableHead listTableHead={listTableHead} />
                </thead>
            </BsTable>
        );
    }
}

export default Table;