import React from 'react'
import Sidebar from './Sidebar'
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

function Statistics() {
    const { t } = useTranslation();
    return (
        <div className="home1">  
            <Sidebar />
        <div className="text-center card">
            <h1>{t('statistics.title')}</h1>
            <Trans i18nKey='statistics.paragraph'>
            <p>
                This page is currently under work. Thank you for your understanding
            </p>
            </Trans>
        </div>

        </div>
    )
}

export default Statistics
