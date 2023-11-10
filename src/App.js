import './App.css';
import SellerModule from './seller/sellerapp';
import UserModule from './user/userapp';

function App() {

  

  if(localStorage.getItem("sellerid"))
    return(<SellerModule />)
  else
    return(<UserModule />)
}

export default App;
