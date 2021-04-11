import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/layout/Register";
import Login from "./components/layout/Login";
import PrivateRoute from "./components/layout/PrivateRoute";
import UpdateProfile from "./components/layout/UpdateProfile";
import Company from "./components/layout/Company";
import Home from "./components/layout/Home";
import { AuthProvider } from "./contexts/AuthContext";
import ApplyForJob from "./components/layout/User/ApplyForJob";
import UserPreviousTransactions from "./components/layout/User/PreviousTransactions";
import ProductPurchase from "./components/layout/User/ProductPurchase";
import CompanyPreviousTransactions from "./components/layout/Company/PreviousTransactions";
import CreateVacancy from "./components/layout/Company/CreateVacancy";
import CreateProduct from "./components/layout/Company/CreateProduct";
import UsertoUser from "./components/layout/User/UsertoUser";
import RecruitEmployee from "./components/layout/Company/RecruitEmployee";
import ChangeProductDetail from "./components/layout/Company/ChangeProductDetail";
import BecomeLender from "./components/layout/User/BecomeLender";
import TakeLoan from "./components/layout/User/TakeLoan";
import SeeStatistics from "./components/layout/User/SeeStatistics";
import "./App.css";

function App() {
	return (
		<Router>
			<Fragment>
				<AuthProvider>
					<Switch>
						<PrivateRoute exact path='/' component={Home} />
						<PrivateRoute path='/update-profile' component={UpdateProfile} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<PrivateRoute exact path='/company' component={Company} />
						<PrivateRoute exact path='/' component={Login} />
						<PrivateRoute
							exact
							path='/user-previousTransactions'
							component={UserPreviousTransactions}
						/>
						<PrivateRoute
							exact
							path='/company-previousTransactions'
							component={CompanyPreviousTransactions}
						/>
						<PrivateRoute
							exact
							path='/purchaseProduct'
							component={ProductPurchase}
						/>
						<PrivateRoute
							exact
							path='/createProduct'
							component={CreateProduct}
						/>
						<PrivateRoute
							exact
							path='/createVacancy'
							component={CreateVacancy}
						/>
						<PrivateRoute
							exact
							path='/userToUserTransaction'
							component={UsertoUser}
						/>
						<PrivateRoute
							exact
							path='/recruitEmployee'
							component={RecruitEmployee}
						/>
						<PrivateRoute
							exact
							path='/changeProductDetails'
							component={ChangeProductDetail}
						/>
						<PrivateRoute exact path='/becomeLender' component={BecomeLender} />
						<PrivateRoute
							exact
							path='/user-seestats'
							component={SeeStatistics}
						/>
						<PrivateRoute
							exact
							path='/takeLoan'
							component={TakeLoan}
						/>
					</Switch>
				</AuthProvider>
			</Fragment>
		</Router>
	);
}

export default App;
