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
        fetch(process.env.REACT_APP_API_URL, {
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
        const {name, value, type} = e.target;
        if (type === 'file') {
            const file = e.target.files[0];
            this.setState({
                account: {
                    ...this.state.account,
                    [name]: file
                }
            })
        } else {
            this.setState({
                account: {
                    ...this.state.account,
                    [name]: value
                }
            })
        }
    }
    render() {
        
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
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type='text' name="username" onChange={this.handleOnChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type='text' name="fullname" onChange={this.handleOnChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Image Name</Form.Label>
                            <Form.Control type='file' name="imageName" onChange={this.handleOnChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" name="address" onChange={this.handleOnChange} cols={3}/>
                        </Form.Group>
                    </Form>
                </ModalCustom>
            </>
        );
    }
}

export default AccountListContainer;