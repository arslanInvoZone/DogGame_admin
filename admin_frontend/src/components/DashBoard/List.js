const InvoiceItem = ({ item, show, getUserId }) => {
  return (
    <>
      <td>{item.walletAddress}</td>
      <td>{item.createdAt}</td>
      <td>{item.updatedAt}</td>
      <td className="text-right">
        <div className="table-action">
          <div
            className="btn btn-sm bg-danger-light"
            onClick={() => {
              show()
              getUserId(item._id)
            }}
          >
            <i className="fa fa-trash"></i> Delete
          </div>
        </div>
      </td>
    </>
  )
}

export default InvoiceItem
