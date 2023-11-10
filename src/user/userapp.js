import { HashRouter,Routes ,Route } from "react-router-dom";
import MyCart from "./cart";
import MyLogin from "./login";
import MyRegister from "./register";
import MyHome from "./shopping";
import UserHeader from "./userheader";


const UserModule = () => {
    return(
        <HashRouter>
            <UserHeader />
            <Routes>
                <Route exact path='/' element={<MyHome />} />
                <Route exact path='/cart' element={<MyCart />} />
                <Route exact path='/login' element={<MyLogin />} />
                <Route exact path='/register' element={<MyRegister />} />
            </Routes>
        </HashRouter>
    )
}

export default UserModule;