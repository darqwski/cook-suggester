import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './css/materialize.css'
import './css/global.css'
import './css/variables.less'
import LandingPage from "./application/landing-page/LandingPage";
import AddingRecipePage from "./application/adding-recipe/AddingRecipePage";
import LoginPage from "./application/login/LoginPage";
import ApplicationContextManager from "./context/application-context-manager/ApplicationContextManager";
import NavigationBar from "./components/navigation-bar/NavigationBar";

const routing = [
    { path: '/', component: LandingPage },
    { path: '/moderator/add-recipe/', component: AddingRecipePage },
    { path: '/login', component: LoginPage },
]

const App = () => {
    return (
      <>
        <NavigationBar />
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
      </>
    )
}

const AppWithContext = () => (
  <ApplicationContextManager>
      <App />
  </ApplicationContextManager>

)

export default AppWithContext
