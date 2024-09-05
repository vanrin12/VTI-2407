import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { AccountHeadTable } from "../../constants/index";
import { AccountItem } from "./types";
import ModalCustom from "../../components/Modal";
import Form from "react-bootstrap/Form";
import { apiCall } from "../../helpers/apiHelpers";
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
  const [isShowModalConfirmDeleteAcc, setIsShowModalConfirmDeleteAcc] =
    useState(false);
  const [accIdDeleting, setAccIdDeleting] = useState("");

  const [errors, setErrors] = useState({ email: "", mobile: "" });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneNumberRegex = /^[0-9]{10}$/;

  const validateInputs = (name: string, vallue: any) => {
    switch (name) {
      case "email":
        setErrors((prev) => ({
          ...prev,
          email: emailRegex.test(vallue) ? "" : "Invalid Email",
        }));
        break;
      case "mobile":
        setErrors((prev) => ({
          ...prev,
          mobile: phoneNumberRegex.test(vallue) ? "" : "Invalid Mobile Number",
        }));
        break;
      default:
        break;
    }
  };
  const fetchAccountdata = async () => {
    try {
      const data = await apiCall("/accounts", "GET");

      if (data) {
        const dataFormat = data.map((item: AccountItem) => {
          return {
            id: item.id,
            email: item.email,
            username: item.username,
            fullname: item.fullname,
            mobile: item.mobile,
            address: item.address,
            status: item.status,
          };
        });

        setAccountList(dataFormat);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAccountdata();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setAccount({
          ...account,
          [name]: file.name,
        });
      }
    } else {
      setAccount({
        ...account,
        [name]: value,
      });
    }

    validateInputs(name, value);
  };

  const createUser = async (e: any) => {
    e.preventDefault();
    try {
      if (errors.email) {
        return;
      }
      const data = await apiCall("/accounts", "POST", {
        ...account,
        createDate: new Date(),
        status: "",
        password: "abcd@1234",
        id: accountList.length + 1,
      });

      if (data) {
        setIsShowModal(false);
        fetchAccountdata();
      }
    } catch (error) {}
  };

  const handleDeleteAccount = async () => {
    try {
      const data = await apiCall(`/accounts/${accIdDeleting}`, "DELETE");
      if (data) {
        setIsShowModalConfirmDeleteAcc(false);
        fetchAccountdata();
      }
    } catch (error) {}
  };

  const handleClickDelete = (id: string) => {
    setIsShowModalConfirmDeleteAcc(true);
    setAccIdDeleting(id);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-start mt-4">
          <Button
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            Create New Account
          </Button>
        </div>
        <div className="col-12 mt-5">
          <Table
            colums={AccountHeadTable}
            data={accountList}
            onClickDelete={handleClickDelete}
          />
        </div>
        <ModalCustom
          title="Create New Account"
          handleClose={() => {
            setIsShowModal(false);
          }}
          show={isShowModal}
          handleSave={createUser}
        >
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
              />
              {errors?.email && (
                <Form.Text className="text-muted">{errors.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" name="mobile" onChange={handleChange} />
              {errors?.mobile && (
                <Form.Text className="text-muted">{errors.mobile}</Form.Text>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Image Name</Form.Label>
              <Form.Control
                type="file"
                name="avatarImageName"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                cols={3}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </ModalCustom>
        <ModalCustom
          show={isShowModalConfirmDeleteAcc}
          handleClose={() => setIsShowModalConfirmDeleteAcc(false)}
          handleSave={handleDeleteAccount}
          title="Confirm Delete"
        >
          Are you sure you want to delete this account?
        </ModalCustom>
      </div>
    </div>
  );
};

export default AccountListContainer;
