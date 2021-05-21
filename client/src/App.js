import React from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Statistics from './routes/Statistics'
import IqApp from './routes/IqApp'
import IqTestResultsPage from './routes/IqTestResultsPage'
import Sidebar from './routes/Sidebar'
import Stats from './components/Stats'

//const Home = lazy(() => import('./routes/Home'));
//const About = lazy(() => import('./routes/About'));
// const Statistics = lazy(() => import('./routes/Statistics'));
// const IqApp = lazy(() => import('./routes/IqApp'));
// const IqTestResultsPage = lazy(() => import('./routes/IqTestResultsPage'));
// const Sidebar = lazy(() => import('./routes/Sidebar'))


const App = () => {

    return (
        <Router>
            <ul className="navbar">
                <li><NavLink className="nav-item icon" exact to="/" activeStyle={{ backgroundColor: "#1d3473", textDecoration: "none" }} ><img src="/logo.svg" alt="Universaliqtest logo" />  </NavLink></li>

                <li><NavLink className="nav-item" exact to="/about" activeStyle={{ backgroundColor: "#1d3473" }} >About</NavLink></li>

                <li><NavLink className="nav-item" exact to="/statistics" activeStyle={{ backgroundColor: "#1d3473" }} >Statistics</NavLink></li>
            </ul>

            <Switch>
                <Route exact path="/">
                    <div className="home1">
                        <Sidebar />
                        <Home />
                    </div>
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>

                <Route exact path="/statistics">
                    <Statistics />
                </Route>

                <Route exact path="/iq-test-app">
                    <div className="home1">
                        <Sidebar />
                        <IqApp />
                        <Stats />
                    </div>
                </Route>

                <Route exact path="/results/:id">
                    <div className="home1">
                        <IqTestResultsPage />
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default App