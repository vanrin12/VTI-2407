import { Component } from 'react'
import Button from '../component/Button';
import { listTableHead } from '../constants/index.js';
import Table from '../component/Table';
class AccountListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountList: []
        }
    }

    getAccountList = () => {
        const username = 'admin';
        const password = '123456';
        const credentials = btoa(`${username}:${password}`);
        fetch('http://localhost:8080/api/v1/accounts', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                const accountFormatted = res.map(item => {
                    return {
                        id: item.id,
                        email: item.email,
                        username: item.username,
                        fullname: item.fullname,
                        address: item.address,
                        imageName: item.avatarImageName,
                        createDate: item.createDate
                    }
                })
                
                if (res) {
                    this.setState({
                        accountList: accountFormatted
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.getAccountList();
    }
    render() {
        return (
            <>
                <div className='col-md-3 mt-3'>
                    <Button variant="primary" onClick={() => { }}>Create New Account</Button>
                </div>
                <div className='col-md-12 mt-5'>
                    <Table listTableHead={listTableHead} accountList={this.state.accountList} />
                </div>
            </>
        );
    }
}

export default AccountListContainer;