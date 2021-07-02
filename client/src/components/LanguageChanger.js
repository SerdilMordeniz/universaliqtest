import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function LanguageChanger() {
    const { i18n } = useTranslation();

    let history = useHistory();

    const lngs = {
        en: { nativeName: 'English' },
        de: { nativeName: 'Deutsch' },
        ru: { nativeName: 'Русский' }
    };

    const handleLngChange = async(lng) => {
        await i18n.changeLanguage(lng)
        history.push(`/${i18n.language}${(history.location.pathname).substring(3)}`)
        //window.location.reload();
    }

    return (
            <div className="dropdown">
                    <button className="dropbtn">Dropdown
                        <img className="dropdown_symbol" alt="dropdown symbol" src="/dropdown.svg" />
                    </button>
                    <div className="dropdown-content">
                        <div className="drop1">
                            {Object.keys(lngs).map((lng) => (
                                <Link to='#' key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} onClick={() => handleLngChange(lng)}>
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
    )
}

export default LanguageChanger
