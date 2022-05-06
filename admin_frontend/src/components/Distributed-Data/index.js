import Side from '../sidebar/index'
import List from './List'
import {Button} from 'react-bootstrap';
import { useState } from 'react'

const Assetslist = () => {
  const [dataa, setData] = useState([
    {
      img: 'patient.jpg',
      name: 'George Anderson',
      id: '#PT0016',
      date: '11 Nov 2019',
      invoice: '#INV-0010',
      pay: '$150',
    },
    {
      img: 'patient.jpg',
      name: 'George Anderson',
      id: '#PT0016',
      date: '11 Nov 2019',
      invoice: '#INV-0010',
      pay: '$150',
    },
    {
      img: 'patient.jpg',
      name: 'George Anderson',
      id: '#PT0016',
      date: '11 Nov 2019',
      invoice: '#INV-0010',
      pay: '$150',
    },
    {
      img: 'patient.jpg',
      name: 'George Anderson',
      id: '#PT0016',
      date: '11 Nov 2019',
      invoice: '#INV-0010',
      pay: '$150',
    },
    {
      img: 'patient.jpg',
      name: 'George Anderson',
      id: '#PT0016',
      date: '11 Nov 2019',
      invoice: '#INV-0010',
      pay: '$150',
    },
    {
      img: 'patient.jpg',
      name: 'George Anderson',
      id: '#PT0016',
      date: '11 Nov 2019',
      invoice: '#INV-0010',
      pay: '$150',
    },
  ])

  return (
    <>
      <div className="add-content">
        <h2 className="add-head">Add content</h2>
      
        <Button className="add-button" variant="primary">
       Add
      </Button>
      </div>
      <div className='card card-table mb-0'>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-hover table-center mb-0'>
              <thead>
                <tr>
                <th>Name</th>
                  <th>Description</th>
                  <th>Preview Image</th>
                  <th>File</th>
                  <th></th>
                </tr>
              </thead>

              {dataa.map((item, key) => (
                <tr>
                  <List item={item} />
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Assetslist
