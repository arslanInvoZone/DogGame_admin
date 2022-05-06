const InvoiceItem = ({ item,show,getId,showupdate}) => {
  
    return (
      <>
          <td>
            <img src ={item.imageUrl} alt={item.name} height={100} width={100}/>
          </td>
          <td>
            <h2 className="table-avatar">
                {item.name} <span>{item.id}</span>
            </h2>
          </td>
          <td>{item.description}</td>
          <td><a href={item.fileUrl}>Download Game Assets File</a></td>
          <td className="text-right">
            <div className="table-action ">
              <div className="btn btn-sm bg-danger-light" onClick={()=>{show();getId(item._id)}}>
                <i className="fa fa-trash"></i> Delete
              </div>
              <div className="btn btn-sm bg-primary" style={{color:'white'}} onClick={()=>{showupdate();getId(item._id)}}>
                <i className="fa fa-edit"></i> Edit
              </div>
            </div>
          </td>
      </>
    );
  };
  
  export default InvoiceItem;
  