import { useState } from "react"
import swal from "sweetalert"

const MyLogin = () => {
    let [userEmail, pickEmail] = useState("")
    let [userPassword, pickPassword] = useState("")

    let [emailError, updateEmailError] = useState("")
    let [passwordError, updatePasswordError] = useState("")

    const userLogin = () => {
        let formstatus = true;

        /** Email validation */
        let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(!epattern.test(userEmail)){
            updateEmailError("Invalid Email !")
            formstatus = false
        }else{
            updateEmailError("")
        }

        /** Password validation */
        if(userPassword===""){
            formstatus=false
            updatePasswordError("Invalid Password ! ")
            }else{
            updatePasswordError("")
            }

        if(formstatus === true) {
           
            let url = "http://localhost:1234/account?email="+userEmail+"&password="+userPassword;
        
            fetch(url)
            .then(response=>response.json())
            .then(userinfo=>{
                // alert(userinfo.length)
              if(userinfo.length>0){
                localStorage.setItem("sellerid",userinfo[0].id);
                localStorage.setItem("sellername",userinfo[0].name);
                window.location.reload();
              }
              else{
                swal("Login Fail !", "Invalid or Not Exist", "warning")
              }
            })
          } 
          else{
            swal("Invalid Input", "Please Enter correct details","Warning")
          }

    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="border rounded p-4">
                        <h3 className="mb-4 text-center"> <i className="fa fa-lock"></i> Login </h3>
    
                        <div className="mb-3">
                            <label> e-Mail Id </label>
                            <input type="email" className="form-control" onChange={obj=>pickEmail(obj.target.value)}/>
                            <small className='text-danger'> {emailError} </small>
                        </div>
                        <div className="mb-3">
                            <label> Password </label>
                            <input type="password" className="form-control" onChange={obj=>pickPassword(obj.target.value)}/>
                            <small className='text-danger'> {passwordError} </small>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={userLogin}> Login </button>
                        </div> 
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default MyLogin;