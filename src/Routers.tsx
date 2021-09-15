import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import NewOrdemServico from './components/newordem/NewOrdemServico';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login'; 
import Main from './pages/Main';
import OrdemServico from './pages/OrdemServico';


const Routes = () => (
  
  <BrowserRouter> 
   <Navbar />
    <Switch>
    <Route path="/" exact>
    <Main / >
      </Route>
     
    <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/forgot-pass" exact>
        <ForgotPassword />
      </Route>    
      <Route path="/newordemservico" exact>
        <NewOrdemServico />
      </Route>
      <Route path="/ordemservico/:ordemId"   exact>
        <OrdemServico  />
      </Route>

      <Route path="/products/:productId">
        <ForgotPassword />
      </Route>
      <Redirect from="/admin" to="/admin/products" exact />
      <Route path="/admin">
        <ForgotPassword />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;