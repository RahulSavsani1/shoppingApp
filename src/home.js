import { useState, useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";


const Myhome = () =>{
    let[allproduct, updateProduct] = useState([]);

    const getProduct = () =>{
        fetch("http://localhost:1234/productlist")
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct(productArray.reverse());
        })
    }

    useEffect(()=>{
        getProduct();
    }, [1]);

    const addtoCart = async (productinfo) =>{
        productinfo["qty"]=1;
        let url = "http://localhost:1234/cartlist";
        let postData = {
            headers:{'Content-Type':'application/json'},
            method:"POST",
            body:JSON.stringify(productinfo)
        };

            await fetch(url, postData)
            .then(response=>response.json())
            .then(serverres=>{
                swal(productinfo.name , " Added in your cart ..", "success");
            })
            .catch(err=>{
                swal(productinfo.name , " Already Exist in your cart ..", "error");
          })
    }

    let[keyword, updateKeyword] = useState("");

    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return(
        <section>
            <div id="banner"></div>
            <div className="container mt-4">
                <div className="row mb-4">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Search..."
                        onChange={obj=>updateKeyword(obj.target.value)}/>
                    </div>
                    <div className="col-lg-4"></div>
                </div>

                <div className="row">
                    {
                      allproduct.slice(offset, offset + PER_PAGE).map((product, index)=>{
                        if (product.name.toLowerCase().includes(keyword.toLowerCase())) 
                        {
                            return(
                                <div className="col-lg-3 mb-4" key={index}>
                                    <div className="p-4 shadow">
                                        <h4 className="text-info mb-3 text-center"> {product.name} </h4>
                                        <img src={product.photo} className="rounded" height="140" width="100%"/>
                                        <p className="mt-3"> {product.details} </p>
                                        <p className="m-3">Rs. {product.price} </p>
                                        <p className="text-center">
                                            <button className="btn btn-danger btn-sm"
                                            onClick={addtoCart.bind(this, product)}> 
                                                <i className="fa fa-shopping-cart"></i> Add to Cart 
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                      })  
                    }
                </div>
            </div>

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
            <footer className="bg-primary p-5 mt-5 text-white text-center">
                <p> React Shopping Web Application. Backedn with JSON Server for API</p>
            </footer>
        </section>
    )
}

export default Myhome;
