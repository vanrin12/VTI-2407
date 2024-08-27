import { Table as BsTable } from 'react-bootstrap';
import Thead from './Thead';
import Trow from './Trow';

import { AccountHeadTable } from '../../constants/index';
interface TableColmun {
    header: string;
    id: string;
  }
interface TableProps {
    data: any[];
    colums: TableColmun[];
}
const Table = ({ data }: TableProps) => {
    const renderTableRows = data?.map((rowItem) => <Trow rowItem={rowItem} key={rowItem.id} />);
    return ( <BsTable>
        <thead>
            <Thead colums={AccountHeadTable} />
        </thead>
        <tbody>
           {renderTableRows} 
        </tbody>
    </BsTable> );
}

export default Table;