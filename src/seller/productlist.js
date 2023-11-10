import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';

const Myproduct = () => {
  let [allProduct, updateProduct] = useState([])
  let sellerid = localStorage.getItem('sellerid')

  const getProduct = () => {
    let url = "http://localhost:1234/product?seller=" + sellerid;
    fetch(url)
      .then(response => response.json())
      .then(productArray => {
        updateProduct(productArray.reverse())
      })
  }

  useEffect(() => {
    getProduct()
  }, [])

  //for deleting product
  const deleteProduct = (pindex,pproduct) => {
    let url = "http://localhost:1234/product/"+pindex;
    let postdata = {
      'method':"delete"
    }
    fetch(url,postdata)
      .then(response => response.json())
      .then(emptyresponse => {
        swal(pproduct, "Deleted Successfully...", "success")
        getProduct()
      })
  }

  // for searching
  let [keyword, updateKeyword] = useState("");

  //for pagination
  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(allProduct.length / PER_PAGE);

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-lg-9 text-center'>
          <h1 className='text-primary'>
            <i className='fa fa-suitcase'></i> Manage Proucts : {allProduct.length}
          </h1>
        </div>
        <div className='col-lg-3 pt-4'>
          <input type='text' className='form-control' placeholder='Search...' onChange={obj => updateKeyword(obj.target.value)} />
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-lg-12'>
          <table className='table table-bordered table-hover'>
            <thead>
              <tr>
                <th> # </th>
                <th> Product Name </th>
                <th> Price </th>
                <th> Details </th>
                <th> Photo </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {
                allProduct.slice(offset, offset + PER_PAGE).map((product, index) => {
                  if (product.name.toLowerCase().includes(keyword.toLowerCase()) || product.price.includes(keyword) || product.details.toLowerCase().includes(keyword.toLowerCase())) {
                    return (
                      <tr key={index}>
                        <td> {product.id} </td>
                        <td> {product.name} </td>
                        <td> {product.price} </td>
                        <td> {product.details} </td>
                        <td> <img src={product.photo} height='30' width='60' alt='NA' /> </td>
                        <td>
                          <button className='btn btn-danger btn-sm' onClick={deleteProduct.bind(this,product.index,product.name)}>
                            <i className='fa fa-trash'></i>
                          </button>
                        </td>
                      </tr>
                    )
                  }
                  else{
                    return("")
                  }
                })
              }
            </tbody>
          </table>
          <div className="mb-4 mt-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination  justify-content-center"}
              pageClassName={"page-item "}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active primary"}
            />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Myproduct;