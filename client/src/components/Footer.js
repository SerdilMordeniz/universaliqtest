import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();
    return (
        <footer>
            <Link to="/contact">{t('footer.contact')}</Link>  | 
            <Link to="/privacy-policy">{t('footer.privacyPolicy')}</Link>  | 
            <Link to="/terms-of-service">{t('footer.termsOfService')}</Link>
            <div className="copyright">
                {t('footer.copyright')}
            </div>
        </footer>
    )
}

export default Footer
