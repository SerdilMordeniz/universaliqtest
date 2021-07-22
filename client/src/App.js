import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
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
import { useTranslation } from 'react-i18next'
import LanguageChanger from './components/LanguageChanger'

//const Home = lazy(() => import('./routes/Home'));
//const About = lazy(() => import('./routes/About'));
// const Statistics = lazy(() => import('./routes/Statistics'));
// const IqApp = lazy(() => import('./routes/IqApp'));
// const IqTestResultsPage = lazy(() => import('./routes/IqTestResultsPage'));
// const Sidebar = lazy(() => import('./routes/Sidebar'))

const base = '/(en|de|ar|bg|cs|da|el|es|et|fi|fr|hu|it|ja|ko|nl|no|pl|pt|ro|ru|sk|sv|ta|th|tr|uk|zh)';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51IkoZhABViR74PKsaGYgp00fcpgGOi4mJRpymTyaVI9ECpDUGJwkmi6yuKjocDLUfFDseeFECqOO1FExUFK0Xi8n00TYSd8Ndp");


const App = () => {
    const { t, i18n } = useTranslation();
    const [logoUrRL, setLogoURL] = useState(null)


    useEffect(() => {
        if (i18n.language === 'en') {
            setLogoURL('/logoEN.svg')
        } else if (i18n.language === 'de') {
            setLogoURL('/logoDE.svg')
        }
    }, [i18n.language])

    return (
        <Router>
            <ul className="navbar">
                <li><NavLink className="nav-item icon" exact to={`/${i18n.language}`} activeStyle={{ backgroundColor: "#1d3473", textDecoration: "none" }} ><img src={logoUrRL} alt="Universaliqtest logo" />  </NavLink></li>

                <li><NavLink className="nav-item" exact to={`/${i18n.language}/about`} activeStyle={{ backgroundColor: "#1d3473" }} >{t('nav.about')}</NavLink></li>

                <li><NavLink className="nav-item" exact to={`/${i18n.language}/statistics`} activeStyle={{ backgroundColor: "#1d3473" }} >{t('nav.statistics')}</NavLink></li>

                <LanguageChanger />

            </ul>

            <Switch>
                <Route exact path="/">
                    <Redirect to={`/${i18n.language}`} />
                </Route>
                <Route exact path={`${base}/`}>
                    <div className="home1">
                        <Home />
                    </div>
                </Route>
                <Route exact path={`${base}/about`}>
                    <About />
                    <Elements stripe={promise}>
                        <CheckoutForm />
                    </Elements>
                </Route>

                <Route exact path={`${base}/statistics`}>
                    <Statistics />
                </Route>

                <Route exact path={`${base}/iq-test-app`}>
                    <div className="home1">
                        <Sidebar />
                        <IqApp />
                        <Stats />
                        <PreventTransition />
                    </div>
                </Route>

                <Route exact path={`${base}/results/:id`}>
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