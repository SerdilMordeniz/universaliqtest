import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t, i18n } = useTranslation();
    return (
        <footer>
            <Link to={`/${i18n.language}/contact`}>{t('footer.contact')}</Link>  | 
            <Link to={`/${i18n.language}/privacy-policy`}>{t('footer.privacyPolicy')}</Link>  | 
            <Link to={`/${i18n.language}/terms-of-service`}>{t('footer.termsOfService')}</Link>
            <div className="copyright">
                {t('footer.copyright')}
            </div>
        </footer>
    )
}

export default Footer
