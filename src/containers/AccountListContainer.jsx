import { Component } from 'react'
import Button from '../component/Button';
import { listTableHead } from '../constants/index.js';
import Table from '../component/Table';
import ModalCustom from '../component/Modal';
import { Form } from 'react-bootstrap';
class AccountListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountList: [],
            isShowModal: false,
            account: {
                email: '',
                username: '',
                fullname: '',
                address: '',
                imageName: ''
            }
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
    handleOnChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            account: {
                ...this.state.account,
                [name]: value
            }
        })
    }
    render() {
        console.log('state', this.state.account);
        
        return (
            <>
                <div className='col-md-3 mt-3'>
                    <Button variant="primary" onClick={() => { this.setState({ isShowModal: true }) }}>Create New Account</Button>
                </div>
                <div className='col-md-12 mt-5'>
                    <Table listTableHead={listTableHead} accountList={this.state.accountList} />
                </div>
                <ModalCustom title="Create New Account" handleClose={() => { this.setState({ isShowModal: false }) }} show={this.state.isShowModal}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="name@example.com" onChange={this.handleOnChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </ModalCustom>
            </>
        );
    }
}

export default AccountListContainer;