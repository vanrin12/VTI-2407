import { Component } from 'react'
import Button from '../component/Button';
import {listTableHead} from '../constants/index.js';
import Table from '../component/Table';
class AccountListContainer extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <>  
                <div className='col-md-3 mt-3'>
                    <Button variant="primary" onClick={() => {}}>Create New Account</Button>
                </div>
                <div className='col-md-12 mt-5'>
                    <Table listTableHead={listTableHead} />
                </div>
            </>
        );
    }
}
 
export default AccountListContainer;