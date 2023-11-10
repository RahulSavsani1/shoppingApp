import {useState,useEffect} from 'react'

const Mydashboard = () => {

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

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-lg-12 text-center'>
          <h1 className='text-primary'> Dashboard </h1>
        </div>
      </div>
      <div className='row mt-5 text-center'>
        <div className='col-lg-2'></div>
        <div className='col-lg-4'>
          <i className='fa fa-suitcase fa-5x text-info'></i>
          <h3 className='text-warning mt-3'> {allProduct.length} - Product in Stock </h3>
        </div>
        <div className='col-lg-4'>
          <i className='fa fa-headset fa-5x text-success'></i>
          <h3 className='text-warning mt-3'> 300 - Orders Received </h3>
        </div>
        <div className='col-lg-2'></div>
      </div>
    </div>
  )
}

export default Mydashboard;