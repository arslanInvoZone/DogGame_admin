import List from "./List";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [saveBtn, setSaveBtn] = useState(true);
  const [userId, setUserId] = useState("");
  const [show2, setShow2] = useState(false);
  const fetchData = async () => {
    await axios.get(process.env.REACT_APP_BASE_URL + "users/").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchData();
    if (walletAddress !== "") {
      setSaveBtn(false);
    }
  }, [walletAddress]);

  const notify = (message, color) =>
    toast(message, {
      position: "top-right",
      type: color,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const getWalletAddress = (e) => {
    const address = e.target.value;
    if (!address) {
      return;
    }
    if (address.length !== 42) {
      setError("Invalid Address");
      setSaveBtn(true);
      return;
    }
    setWalletAddress(address);
    setError("");
    setSaveBtn(false);
  };
  const addUser = async () => {
    await axios
      .post(process.env.REACT_APP_BASE_URL + "users/adduser", { walletAddress })
      .then((res) => {
        notify(res.data.message, "success");
        fetchData();
        setWalletAddress("");
        setSaveBtn(true);
      })
      .catch((error) => {
        notify(error.response.data.message, "error");
      });
    handleClose();
  };
  const handleShow = async () => setShow(true);
  const handleClose = async () => {
    setShow(false);
    setWalletAddress("");
    setSaveBtn(true);
  };
  const handleShow2 = async () => setShow2(true);
  const handleClose2 = async () => setShow2(false);
  const deleteHandler = async () => {
    await axios
      .post(process.env.REACT_APP_BASE_URL + "users/delete", { userId })
      .then((res) => {
        notify(res.data.message, "success");
        fetchData();
      });
    handleClose2();
  };
  return (
    <>
      <ToastContainer />
      <div className="add-content">
        <h2 className="add-head">Add User</h2>
        <Button className="add-button" onClick={handleShow}>
          Add
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#505458" }}>Add Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#505458" }}>
                  Wallet Address
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Wallet Address"
                  autoFocus
                  required
                  onChange={(e) => getWalletAddress(e)}
                />
                {error && (
                  <Form.Label style={{ color: "red", marginTop: "5px" }}>
                    {error}
                  </Form.Label>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={saveBtn} variant="primary" onClick={addUser}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        {/* delete model */}

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#505458" }}>
              Are you sure to delete this record?
            </Modal.Title>
          </Modal.Header>
          {/* <Modal.Body>

          </Modal.Body> */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Cancel
            </Button>
            <Button className="bg-danger-light" onClick={deleteHandler}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="card card-table mb-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-center mb-0">
              <thead>
                <tr>
                  <th>Wallet Address</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {data.map((item, index) => (
                <tr key={index}>
                  <List item={item} show={handleShow2} getUserId={setUserId} />
                </tr>
              ))}
            </table>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default DashBoard;
