
import './App.css';  
import './assets/styles/theme.css';
import "antd/dist/antd.css"; 
import PassoOneCliente from './components/newordem/PassoOneCliente';
import axios from 'axios';
import { BASE_URL } from './util/requests';
import { saveAuthData } from './util/storage';
import Main from './pages/Main';
import NewOrdemServico from './components/newordem/NewOrdemServico';
type reder={
  Authorization:string;
}
function App() {
  const credenciais={
    email:"marcelo_macedo01@hotmail.com",
    password:"123456"
  }
  axios.post(`${BASE_URL}/login`,credenciais)
  .then(
    rest=>{
      const re:string=rest.headers.authorization.substring(7);;
      console.log(rest.headers.authorization);
      console.log(re);
      saveAuthData(re);
           
    }
  ) 
  return (
    <NewOrdemServico />
  //  <Main/>
  //  <PassoOneCliente controller='ordemservicos'/>
  );
}

export default App;
