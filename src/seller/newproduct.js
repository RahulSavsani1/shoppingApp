import React from 'react'
import { useState } from 'react';
import swal from 'sweetalert';

const Newproduct = () => {
  let [pName, pickName] = useState("")
  let [pPrice, pickPrice] = useState("")
  let [pPhoto, pickPhoto] = useState("")
  let [pDetails, pickDetails] = useState("")

  //state variable for error message
  let [nameError, updateNameError] = useState("")
  let [priceError, updatePriceError] = useState("")
  let [photoError, updatePhotoError] = useState("")
  let [detailsError, updateDetailsError] = useState("")
  const save = () => {

    let formstatus = true;

    /** Name validation */
    if(pName===""){
      formstatus=false
      updateNameError("Invalid Name ! ")
    }else{
      updateNameError("")
    }

    /** price validation */
    if( isNaN(pPrice) || pPrice===""){
      formstatus=false
      updatePriceError("Invalid Price ! ")
    }else{
      updatePriceError("")
    }

    /** photo validation */
    if(pPhoto===""){
      formstatus=false
      updatePhotoError("Invalid photo url ! ")
    }else{
      updatePhotoError("")
    }

    /** details validation */
    if(pDetails.length<15 || pDetails.length>100 ){
      formstatus=false
      updateDetailsError("Enter Details between 15 to 100 chars ! ")
    }else{
      updateDetailsError("")
    }

    if(formstatus === true) {
      let newProduct = {
        name: pName,
        price: pPrice,
        photo: pPhoto,
        details: pDetails,
        seller: localStorage.getItem("sellerid")
      }
      let url = "http://localhost:1234/product";
      let postdata = {
        headers:{'Content-Type':'application/json'},
        method: "POST",
        body: JSON.stringify(newProduct)
      }
      fetch(url,postdata)
      .then(response=>response.json())
      .then(pinfo=>{
        swal(pName, " Save Successfully...", "success")
        pickName("")
        pickPrice("")
        pickPhoto("")
        pickDetails("")
      })
    } 
    else{
      swal("Invalid Input", "Please Enter Product Details","Warning")
    }
  }

  

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-lg-12 text-center mb-4'>
          <h1 className='text-primary'>
            <i className='fa fa-plus'></i> Enter Prouct Details
          </h1>
        </div>
        <div className='col-lg-4 mb-3'>
          <label> Enter Product Name </label>
          <input type='text' className='form-control' onChange={obj => pickName(obj.target.value)} value={pName} />
          <small className='text-danger'> {nameError} </small>
        </div>
        <div className='col-lg-4 mb-3'>
          <label> Enter Product Price </label>
          <input type='number' className='form-control' onChange={obj => pickPrice(obj.target.value)} value={pPrice} />
          <small className='text-danger'> {priceError} </small>
        </div>
        <div className='col-lg-4 mb-3'>
          <label> Enter Product Photo </label>
          <input type='text' className='form-control' onChange={obj => pickPhoto(obj.target.value)} value={pPhoto} />
          <small className='text-danger'> {photoError} </small>
        </div>
        <div className='col-lg-9 mb-3'>
          <label> Enter Product Details </label>
          <textarea className='form-control' onChange={obj => pickDetails(obj.target.value)} value={pDetails}></textarea>
          <small className='text-danger'> {detailsError} </small>
        </div>
        <div className='col-lg-3 mb-3'>
          <br />
          <button className='btn btn-danger' onClick={save}> Save Product </button>
        </div>
      </div>
    </div>
  )
}

export default Newproduct;