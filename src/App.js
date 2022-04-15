import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch , Route } from 'react-router-dom';
import Home from "../src/components/Home/Home"
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import CustomerDetails from './components/Details/CustomerDetails';
import Order from "../src/components/Order/Order";
import OrderSummary from "../src/components/OrderSummary/OrderSummery"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/register" component={Signup}></Route>
        <Route exact path="/details" component={CustomerDetails}></Route>
        <Route exact path="/order" component={Order}></Route>
        <Route exact path="/ordersummary" component={OrderSummary}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
