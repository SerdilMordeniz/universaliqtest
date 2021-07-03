import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function LanguageChanger() {
    const [language, setLanguage] = useState(null)
    const { i18n } = useTranslation();

    let history = useHistory();

    const lngs1 = {
        ar: { nativeName: 'عربى'},
        bg: { nativeName: 'български'},
        cs: { nativeName: 'Česky'},
        da: { nativeName: 'Dansk'},
        de: { nativeName: 'Deutsch' },
        el: { nativeName: 'Ελληνική'},
        en: { nativeName: 'English' },
        es: { nativeName: 'Español'},
        et: { nativeName: 'Eesti'},
        fi: { nativeName: 'Suomalainen'},
        fr: { nativeName: 'Français'},
        hu: { nativeName: 'Magyar'},
        it: { nativeName: 'Italiano'},
        ja: { nativeName: '日本語'},
    };

    const lngs2 = {
        ko: { nativeName: '한국어'},
        nl: { nativeName: 'Nederlands'},
        no: { nativeName: 'Norsk'},
        pl: { nativeName: 'Polskie'},
        pt: { nativeName: 'Português'},
        ro: { nativeName: 'Română'},
        ru: { nativeName: 'Русский'},
        sk: { nativeName: 'Slovák'},
        sv: { nativeName: 'Svenska'},
        ta: { nativeName: 'தமிழ்'},
        th: { nativeName: 'ไทย'},
        tr: { nativeName: 'Türkçe'},
        uk: { nativeName: 'Український'},
        zh: { nativeName: '中文'}
    }

    const handleLngChange = async(lng) => {
        await i18n.changeLanguage(lng)
        history.push(`/${i18n.language}${(history.location.pathname).substring(3)}`)
        //window.location.reload();
    }

    useEffect(() => {
        const lang = {
            ...lngs1,
            ...lngs2
        }
        setLanguage(lang[i18n.language]["nativeName"])
        // eslint-disable-next-line
    }, [i18n.language])



    return (
            <div className="dropdown">
                    <button className="dropbtn">{language}
                        <img className="dropdown_symbol" alt="dropdown symbol" src="/dropdown.svg" />
                    </button>
                    <div className="dropdown-content">
                        <div className="drop1">
                            {Object.keys(lngs1).map((lng) => (
                                <Link to='#' key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} onClick={() => handleLngChange(lng)}>
                                    {lngs1[lng].nativeName}
                                </Link>
                            ))}
                        </div>
                        <div className="drop2">
                        {Object.keys(lngs2).map((lng) => (
                                <Link to='#' key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} onClick={() => handleLngChange(lng)}>
                                    {lngs2[lng].nativeName}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
    )
}

export default LanguageChanger
