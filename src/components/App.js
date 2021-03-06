import Signup from "./Signup";
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { CardProvider } from '../contexts/CardContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import AddCard from './AddCard';
import AddFrontImage from "./AddFrontImage";
import AddBackImage from "./AddBackImage";
import ShowCard from "./ShowCard";
import BarcodeScanner from "./BarcodeScanner";

function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <CardProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <PrivateRoute path='/add-card' component={AddCard} />
              <PrivateRoute path='/scan-barcode' component={BarcodeScanner} />
              <PrivateRoute path='/add-photo-front' component= {AddFrontImage}/>
              <PrivateRoute path='/add-photo-back' component={AddBackImage}/>            
              <PrivateRoute path='/showcard' component={ShowCard} />            
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Switch>
            </CardProvider>
          </AuthProvider>
        </Router>
      </div>

    </Container>
  );
}

export default App;
