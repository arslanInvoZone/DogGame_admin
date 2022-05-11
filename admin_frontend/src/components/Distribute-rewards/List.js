const InvoiceItem = ({ item }) => {
    return (
      <>
       
          <td>
            <a href="#" style={{ color: "#272b41" }}>
              {item.invoice}
            </a>
          </td>
          <td>
            <h2 class="table-avatar">
            
              <a href="#">
                {item.name} <span>{item.id}</span>
              </a>
            </h2>
          </td>
          <td>{item.pay}</td>
          <td>{item.date}</td>
          <td class="text-right">
            <div class="table-action">
              
              <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
              <i class="fa fa-trash"></i> Delete
              </a>
            </div>
          </td>
      
      </>
    );
  };
  
  export default InvoiceItem;
  