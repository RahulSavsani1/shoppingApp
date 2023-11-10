import React from 'react'
import { useState, useEffect } from 'react';
const Myorder = () => {
  let [allorder, updateOrder] = useState([]);
    const getOrder = () => {
        let url = "http://localhost:1234/order";
        fetch(url)
            .then(response => response.json())
            .then(orderArray => {
                updateOrder(orderArray.reverse());
            })
    }
    useEffect(() => {
        getOrder();
    }, []);

    let sellerId = localStorage.getItem("sellerid")

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-lg-12 text-center'>
          <h1 className='text-primary'>
            <i className='fa fa-headset'></i> Order List
          </h1>
        </div>
      </div>
      {
        allorder.map((order,index)=>{
          return(
            <div className='row mb-4 shadow p-4 rounded' key={index}>
              <div className='col-lg-3'>
                <h4> {order.fullName} </h4>
                <address>
                  <p> {order.Mobile} </p>
                  <p> {order.Email} </p>
                  <p> {order.Address} </p>
                </address>
              </div>
              <div className='col-lg-9'> 
                <table className='table'>
                  <thead>
                    <tr>
                      <th> Product </th>
                      <th> Photo </th>
                      <th> Price </th>
                      <th> Quantity </th>
                      <th> Total Cost </th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          order.itemList.map((eachitem, index2)=>{
                            if(sellerId==eachitem.seller)
                              return(
                                  <tr key={index2}>
                                      <td> {eachitem.name} </td>
                                      <td> <img src={eachitem.photo} height="50" width="50" alt='NA'/> </td>
                                      <td> {eachitem.price} </td>
                                      <td> {eachitem.qty} </td>
                                      <td> {eachitem.price * eachitem.qty} </td>
                                  </tr>
                              )
                          })
                      }
                  </tbody>
                </table>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Myorder;