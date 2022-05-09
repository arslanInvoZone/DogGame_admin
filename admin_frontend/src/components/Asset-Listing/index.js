import List from '../Pet-Listing/List'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Invoicelist = () => {
  const [petsData, setPetsData] = useState([]);
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [error, setError] = useState('')
  const [error2, setError2] = useState('')
  const [error3, setError3] = useState('')
  const [error4, setError4] = useState('')
  const [inputState, setInputState] = useState(false)
  const [inputState2, setInputState2] = useState(false)
  const [petName, setPetName] = useState('')
  const [petDescription, setPetDescription] = useState('')
  const [petImage, setPetImage] = useState('')
  const [petFile, setPetFile] = useState('')
  const [petImageUrl, setPetImageUrl] = useState('')
  const [petFileUrl, setPetFileUrl] = useState('')
  const [saveBtn, setSaveBtn] = useState(true)
  const [petId ,setPetId] = useState('');

  const fetchData = async() => {
    const petsData = await axios.get(process.env.REACT_APP_BASE_URL+'pets/');
    if(petsData){
      setPetsData(petsData);
    }
  }
  useEffect(() => { 
    if (petName && petDescription && petImageUrl && petFileUrl) {
      setSaveBtn(false)
    }
    fetchData();
  }, [petName, petDescription, petImageUrl, petFileUrl])

  const notify = (message, color) =>
    toast(message, {
      position: 'top-right',
      type: color,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const handleClose = () => {
    setShow(false)
    setShow2(false)
    setShow3(false);
  }
  const handleShow = async () => setShow(true)
  const handleShow2 = async () => setShow2(true)
  const handleShow3 = async () => {
    setShow3(true)
    await axios.put(process.env.REACT_APP_BASE_URL+'pets/update',{petId})
    .then((res)=>{
      const{name,description,imageUrl} = res.data
      if(!res.data){
      return
      }
      setPetName(name)
        setPetDescription(description)
        setPetImageUrl(imageUrl)
    })
  }

  const getImageName = (e) => {
    const image = e.target.files[0]
    setInputState(true)
    if (!image) {
      setError3('image is required')
      setInputState(false)
      return
    }
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setError3('select valid image.')
      setInputState(false)
      return
    }
    setError3('')
    setPetImage(e.target.files[0])
  }
  const getFileName = (e) => {
    const file = e.target.files[0]
    setInputState2(true)
    if (!file) {
      setError4('file is required')
      setInputState2(false)
      return
    }
    setError4('')
    setPetFile(e.target.files[0])
  }
  const getPetName = (e) => {
    if (e.target.value === '') {
      setError('Name is Required')
      setPetName(e.target.value);
      return
    }
    setPetName(e.target.value)
    setError('')
  }
  const getPetDescription = (e) => {
    if (e.target.value === '') {
      setError2('Description is Required')
      setPetDescription(e.target.value);
      return
    }
    setPetDescription(e.target.value)
    setError2('')
  }
  const sendDataToDB = async () => {
    await axios
      .post(process.env.REACT_APP_BASE_URL+'pets/addpets', {
        name: petName,
        description: petDescription,
        imageUrl: petImageUrl,
        fileUrl: petFileUrl,
      })
      .then((respones) => {
        notify(respones.data.message, 'success')
        fetchData();
        setInputState(false);
        setInputState2(false);
        setSaveBtn(true)
      })
      .catch((error) => {
        notify(error, 'error')
      })
    setShow(false)
  }
  const uploadImageToPinata = () => {
    console.log(process.env.REACT_APP_PIN_FILE_TO_IPFS_URL)
    const data = new FormData()
    // eslint-disable-next-line no-restricted-globals
    data.append('file', petImage, petImage.name)
    const metadata = JSON.stringify({
      name: `${petImage.name}`,
      keyvalues: {
        description: petDescription,
      },
    })
    data.append('pinataMetadata', metadata)
    axios
      .post(process.env.REACT_APP_PIN_FILE_TO_IPFS_URL, data, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data;`,
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
        },
      })
      .then(function (response) {
        notify('Uploaded Successfully!', 'success')
        setPetImageUrl(
          `${process.env.REACT_APP_PINATA_BASE_URL}${response.data.IpfsHash}`,
        )
      })
      .catch((error) => {
        notify(error, 'error')
      })
  }
  const uploadFileToPinata = () => {
    const data = new FormData()
    // eslint-disable-next-line no-restricted-globals
    data.append('file', petFile, petFile.name)
    axios
      .post(process.env.REACT_APP_PIN_FILE_TO_IPFS_URL, data, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data;`,
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
        },
      })
      .then(function (response) {
        setPetFileUrl(`${process.env.REACT_APP_PINATA_BASE_URL}${response.data.IpfsHash}`)
        notify('Uploaded Successfully!', 'success')
      })
      .catch((error) => {
        notify(error, 'error')
      })
  }
  const deleteHandler = async() =>{
    await axios.post(process.env.REACT_APP_BASE_URL+'pets/delete',{petId})
    .then((res)=>{
      notify(res.data.message,"success")
      fetchData();
    })
    handleClose();
  }
  const updateHandler = async() =>{
    await axios.put(process.env.REACT_APP_BASE_URL+'pets/update',{petId,petName,petDescription,petImageUrl})
    notify('updated Successfuly!','success');
    handleClose();
    fetchData();
  }
  return (
    <>
      <ToastContainer />
      <div className="add-content">
        <h2 className="add-head">Add Asset</h2>

        {/* model */}
        <Button className="add-button" variant="primary" onClick={handleShow}>
          Add
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#505458' }}>Add Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#505458' }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  autoFocus
                  required
                  onChange={(e) => getPetName(e)}
                />
                {error && (
                  <Form.Label style={{ color: 'red', marginTop: '5px' }}>
                    {error}
                  </Form.Label>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#505458' }}>
                  Description
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  autoFocus
                  required
                  onChange={(e) => getPetDescription(e)}
                />
                {error2 && (
                  <Form.Label style={{ color: 'red', marginTop: '5px' }}>
                    {error2}
                  </Form.Label>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#505458' }}>Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="File"
                  autoFocus
                  onChange={(e) => getImageName(e)}
                />
                {error3 && (
                  <Form.Label style={{ color: 'red', marginTop: '5px' }}>
                    {error3}
                  </Form.Label>
                )}
                <Button
                  disabled={error3 || !inputState}
                  variant="primary"
                  style={{ display: 'flex', marginTop: '5px' }}
                  onClick={uploadImageToPinata}
                >
                  Upload
                </Button>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#505458' }}>
                  Game Assets File
                </Form.Label>
                <Form.Control
                  type="file"
                  placeholder="File"
                  autoFocus
                  onChange={(e) => getFileName(e)}
                />
                {error4 && (
                  <Form.Label style={{ color: 'red', marginTop: '5px' }}>
                    {error4}
                  </Form.Label>
                )}
                <Button
                  disabled={error4 || !inputState2}
                  variant="primary"
                  style={{ display: 'flex', marginTop: '5px' }}
                  onClick={uploadFileToPinata}
                >
                  Upload
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={saveBtn} variant="primary" onClick={sendDataToDB}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        
        {/* update model */}
        <Modal show={show3} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#505458' }}>Update Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#505458' }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  autoFocus
                  required
                  onChange={(e) => getPetName(e)}
                  value={petName}
                />
                {error && (
                  <Form.Label style={{ color: 'red', marginTop: '5px' }}>
                    {error}
                  </Form.Label>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#505458' }}>
                  Description
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  autoFocus
                  required
                  onChange={(e) => getPetDescription(e)}
                  value={petDescription}
                />
                {error2 && (
                  <Form.Label style={{ color: 'red', marginTop: '5px' }}>
                    {error2}
                  </Form.Label>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#505458' }}>Image</Form.Label>
                <br></br>
                <img src={petImageUrl} alt="" height={100} width={100} style={{marginBottom:"5px"}}/>
                <Form.Control
                  type="file"
                  placeholder="File"
                  autoFocus
                  onChange={(e) => getImageName(e)}
                />
                <Button
                  disabled={error3 || !inputState}
                  variant="primary"
                  style={{ display: 'flex', marginTop: '5px' }}
                  onClick={uploadImageToPinata}
                >
                  Upload
                </Button>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#505458' }}>
                  Game Assets File
                </Form.Label>
                <Form.Control
                  type="file"
                  placeholder="File"
                  autoFocus
                  onChange={(e) => getFileName(e)}
                />
                <Button
                  disabled={error4 || !inputState2}
                  variant="primary"
                  style={{ display: 'flex', marginTop: '5px' }}
                  onClick={uploadFileToPinata}
                >
                  Upload
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button  variant="primary" onClick={updateHandler}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* delete model */}
        <Modal show={show2} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#505458' }}>Are you sure to delete this record?</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body>

          </Modal.Body> */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="bg-danger-light" onClick={deleteHandler} >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* end model */}
      </div>
      <div className="card card-table mb-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-center mb-0">
              <thead>
                <tr>
                  <th>Preview Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>File</th>
                  <th></th>
                </tr>
              </thead>

              {petsData?.data?.petsArray?.map((item, key) => (
                <tr>
                  <List item={item} show={handleShow2} getId={setPetId} showupdate={handleShow3} />
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Invoicelist
