import React from 'react';
import './styles/App.css'; // Adjust the path as necessary
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import EmployeeUpdate from './pages/EmployeeUpdate';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/employees" component={EmployeeList} />
                    <PrivateRoute exact path="/employees/new" component={EmployeeForm} />
                    <PrivateRoute exact path="/employees/:id" component={EmployeeDetail} />
                    <PrivateRoute exact path="/employees/:id/edit" component={EmployeeUpdate} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;

