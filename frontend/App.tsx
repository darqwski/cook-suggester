import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './css/materialize.css'
import './css/global.css'
import './css/variables.less'
import LandingPage from "./application/landing-page/LandingPage";
import AddingRecipePage from "./application/adding-recipe/AddingRecipePage";
import LoginPage from "./application/login/LoginPage";

const routing = [
    { path: '/', component: LandingPage },
    { path: '/moderator/add-recipe/', component: AddingRecipePage },
    { path: '/login', component: LoginPage },
]

const App = () => {
    return (
        <Router forceRefresh>
            {routing.map(({ path, component }, index) => (
                <Route
                    exact
                    path={path}
                    component={component}
                    key={`routing-${index}`}
                />
            ))}
        </Router>
    )
}

const AppWithContext = () => (
  <App />
)

export default AppWithContext
