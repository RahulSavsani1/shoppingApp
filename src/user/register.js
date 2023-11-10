import { useState } from "react"
import swal from "sweetalert"

const MyRegister = () => {

    let [sellerName, pickName] = useState("")
    let [sellerMobile, pickMobile] = useState("")
    let [sellerEmail, pickEmail] = useState("")
    let [sellerPassword, pickPassword] = useState("")

    let [nameError, updateNameError] = useState("")
    let [mobileError, updateMobileError] = useState("")
    let [emailError, updateEmailError] = useState("")
    let [passwordError, updatePasswordError] = useState("")

    const createAccount = () => {
        let formstatus = true;

        /** Name validation */
        if(sellerName===""){
        formstatus=false
        updateNameError("Invalid Name ! ")
        }else{
        updateNameError("")
        }

        /** Mobile validation */
        let mpattern = /^[0]?[6789]\d{9}$/
        if(!mpattern.test(sellerMobile)){
            updateMobileError("Invalid Mobile !")
            formstatus = false
        }else{
            updateEmailError("")
        }

        /** Email validation */
        let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(!epattern.test(sellerEmail)){
            updateEmailError("Invalid Email !")
            formstatus = false
        }else{
            updateEmailError("")
        }

        /** Password validation */
        if(sellerPassword===""){
            formstatus=false
            updatePasswordError("Password cannot be empty ! ")
            }else{
            updatePasswordError("")
            }

        if(formstatus === true) {
            let newSeller = {
              name: sellerName,
              mobile: sellerMobile,
              email: sellerEmail,
              password: sellerPassword,
            //   seller: localStorage.getItem("sellerid")
            }
            let url = "http://localhost:1234/account";
            let postdata = {
              headers:{'Content-Type':'application/json'},
              method: "POST",
              body: JSON.stringify(newSeller)
            }
            fetch(url,postdata)
            .then(response=>response.json())
            .then(sellerinfo=>{
              swal(sellerName, " Save Successfully...", "success")
              pickName("");
              pickMobile("");
              pickEmail("");
              pickPassword("");
            })
          } 
          else{
            swal("Invalid Input", "Please Enter Product Details","Warning")
          }

    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="border rounded p-4">
                        <h3 className="mb-4 text-center"> <i className="fa fa-user-plus"></i> Create New Account </h3>
                        <div className="mb-3">
                            <label> Seller Name </label>
                            <input type="text" className="form-control" onChange={obj=>pickName(obj.target.value)} value={sellerName}/>
                            <small className='text-danger'> {nameError} </small>
                        </div>
                        <div className="mb-3">
                            <label> Mobile No. </label>
                            <input type="number" className="form-control" onChange={obj=>pickMobile(obj.target.value)} value={sellerMobile}/>
                            <small className='text-danger'> {mobileError} </small>
                        </div>
                        <div className="mb-3">
                            <label> e-Mail Id </label>
                            <input type="email" className="form-control" onChange={obj=>pickEmail(obj.target.value)} value={sellerEmail}/>
                            <small className='text-danger'> {emailError} </small>
                        </div>
                        <div className="mb-3">
                            <label> Password </label>
                            <input type="password" className="form-control" onChange={obj=>pickPassword(obj.target.value)} value={sellerPassword}/>
                            <small className='text-danger'> {passwordError} </small>
                        </div>
                        <div className="text-center" onClick={createAccount}>
                            <button className="btn btn-primary"> Create Account </button>
                        </div> 
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default MyRegister;