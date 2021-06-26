import React from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Statistics from './routes/Statistics'
import IqApp from './routes/IqApp'
import IqTestResultsPage from './routes/IqTestResultsPage'
import Sidebar from './routes/Sidebar'
import Stats from './components/Stats'
import Footer from './components/Footer'
import ContactForm from './routes/ContactForm'
import PrivacyPolicy from './routes/PrivacyPolicy'
import TermsOfService from './routes/TermsOfService'
import PreventTransition from './components/PreventTransition'
import { useTranslation } from 'react-i18next';

//const Home = lazy(() => import('./routes/Home'));
//const About = lazy(() => import('./routes/About'));
// const Statistics = lazy(() => import('./routes/Statistics'));
// const IqApp = lazy(() => import('./routes/IqApp'));
// const IqTestResultsPage = lazy(() => import('./routes/IqTestResultsPage'));
// const Sidebar = lazy(() => import('./routes/Sidebar'))

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
};

const App = () => {
    const { t, i18n } = useTranslation();

    const handleLngChange = (lng) => {
        i18n.changeLanguage(lng)
        //window.location.reload();
    }
    return (
        <Router>
            <ul className="navbar">
                <li><NavLink className="nav-item icon" exact to="/" activeStyle={{ backgroundColor: "#1d3473", textDecoration: "none" }} ><img src="/logo.svg" alt="Universaliqtest logo" />  </NavLink></li>

                <li><NavLink className="nav-item" exact to="/about" activeStyle={{ backgroundColor: "#1d3473" }} >{t('nav.about')}</NavLink></li>

                <li><NavLink className="nav-item" exact to="/statistics" activeStyle={{ backgroundColor: "#1d3473" }} >{t('nav.statistics')}</NavLink></li>

                <div className="dropdown">
                    <button className="dropbtn">Dropdown
                        <img className="dropdown_symbol" alt="dropdown symbol" src="/dropdown.svg" />
                    </button>
                    <div className="dropdown-content">
                        <div className="drop1">
                            {Object.keys(lngs).map((lng) => (
                                <Link to="#" key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} onClick={() => handleLngChange(lng)}>
                                    {lngs[lng].nativeName}
                                </Link>
                            ))}
                            <Link to="#">Link 1</Link>
                            <Link to="#">Link 2</Link>
                        </div>
                        <div className="drop2">
                            <Link to="#">Link 3</Link>
                            <Link to="#">Link 4</Link>
                        </div>
                    </div>
                </div>

                {Object.keys(lngs).map((lng) => (
                    <button key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} type="submit" onClick={() => handleLngChange(lng)}>
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </ul>


            <Switch>
                <Route exact path="/">
                    <div className="home1">
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
                        <PreventTransition />
                    </div>
                </Route>

                <Route exact path="/results/:id">
                    <div className="home1">
                        <IqTestResultsPage />
                    </div>
                </Route>

                <Route exact path="/contact">
                    <ContactForm />
                </Route>

                <Route exact path="/privacy-policy">
                    <PrivacyPolicy />
                </Route>

                <Route exact path="/terms-of-service">
                    <TermsOfService />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App