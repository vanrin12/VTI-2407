import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { AccountHeadTable } from "../../constants/index";
import { AccountItem } from './types';
import ModalCustom from '../../components/Modal';
import Form from 'react-bootstrap/Form';

const AccountListContainer = () => {

    const [accountList, setAccountList] = useState<AccountItem[]>([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [account, setAccount] = useState({
        id: null,
        email: "",
        username: "",
        fullname: "",
        avatarImageName: "",
        mobile: "",
        address: "",
        createDate: "",
    });
    const fetchAccountdata = async () => {
        try {
            const username = 'admin';
            const password = '123456';
            const credentials = btoa(`${username}:${password}`);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/accounts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json',
                },
            })
            if (res.ok) {
                const data = await res.json();
                const dataFormat = data.map((item: AccountItem) => {
                    return {
                        id: item.id,
                        email: item.email,
                        username: item.username,
                        fullname: item.fullname,
                        mobile: item.mobile,
                        address: item.address,
                        status: item.status
                    }
                })
                
                setAccountList(dataFormat);
            }
            
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchAccountdata();
    }, []);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 text-start mt-4">
                    <Button onClick={() => { setIsShowModal(true) }}>Create New Account</Button>
                </div>
                <div className="col-12 mt-5">
                    <Table colums={AccountHeadTable} data={accountList} />
                </div>
                <ModalCustom title="Create New Account" handleClose={() => { setIsShowModal(false) }} show={isShowModal}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="name@example.com" onChange={() => {}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type='text' name="username"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type='text' name="fullname"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Image Name</Form.Label>
                            <Form.Control type='file' name="imageName"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" name="address" cols={3}/>
                        </Form.Group>
                    </Form>
                </ModalCustom>
            </div>
        </div>
    );
}

export default AccountListContainer;