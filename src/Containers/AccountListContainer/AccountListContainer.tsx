import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { AccountHeadTable } from "../../constants/index";
import { AccountItem } from './types';
const AccountListContainer = () => {

    const [accountList, setAccountList] = useState<AccountItem[]>([]);
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
                    <Button>Create New Account</Button>
                </div>
                <div className="col-12 mt-5">
                    <Table colums={AccountHeadTable} data={accountList} />
                </div>
            </div>
        </div>
    );
}

export default AccountListContainer;