import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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

function LanguageChanger() {
    const [language, setLanguage] = useState(null)
    const [renderBoolean, setRenderBoolean] = useState(false)
    const { i18n } = useTranslation();

    let history = useHistory();

    const handleLngChange = async(lng) => {
        await i18n.changeLanguage(lng)
        history.push(`/${i18n.language}${(history.location.pathname).substring(3)}`)
        //window.location.reload();
    }

    useEffect(() => {
        const setLanguageAsync = async(lang, langCode) => {
            let result = await lang[langCode]["nativeName"]
            setLanguage(result)
            await i18n.changeLanguage(langCode)
            history.push(`/${langCode}`)
        }

        const lang = {
            ...lngs1,
            ...lngs2
        }
        if(i18n.languages[0].length > 2) {
            const langCode = i18n.languages[0].substring(0, 2)
            setLanguageAsync(lang, langCode)
            setRenderBoolean(true)
        } else {
            setLanguage(lang[i18n.languages[0]]["nativeName"])
            setRenderBoolean(true)
        }
    }, [i18n, history, language, renderBoolean, setRenderBoolean, i18n.languages])



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