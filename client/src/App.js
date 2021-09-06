import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Statistics from './routes/Statistics'
import IqApp from './routes/IqApp'
import Checkout from './routes/Checkout'
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

const ProductDisplay = () => (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form action="http://localhost:3001/api/v1/create-checkout-session" method="POST">
        <button type="submit">
          Checkout
        </button>
      </form>
    </section>
  );
  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );


const App = () => {
    const { t, i18n } = useTranslation();
    const [logoUrRL, setLogoURL] = useState(null)
    const [message, setMessage] = useState("");
    const [preventTransition, setPreventTransition] = useState(true);

    const toggleTransition = ()=> {
      setPreventTransition(false)
    }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);


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
                </Route>

                <Route exact path={`${base}/statistics`}>
                    <Statistics />
                    <ProductDisplay />
                </Route>

                <Route exact path={`${base}/iq-test-app`}>
                    <div className="home1">
                        <Sidebar />
                        <IqApp toggleTransition={toggleTransition} />
                        <Stats />
                        <PreventTransition preventTransition={preventTransition} />
                    </div>
                </Route>

                <Router exact path={`${base}/checkout`}>
                  <div className="home1">
                  <Sidebar />
                    <Checkout />
                    <Stats />
                  </div>
                </Router>

                <Route exact path={`${base}/results/:id`}>
                    <div className="home1">
                        <IqTestResultsPage />
                    </div>
                </Route>

                <Route exact path={`${base}/contact`}>
                    <ContactForm />
                </Route>

                <Route exact path={`${base}/privacy-policy`}>
                    <PrivacyPolicy />
                </Route>

                <Route exact path={`${base}/terms-of-service`}>
                    <TermsOfService />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App