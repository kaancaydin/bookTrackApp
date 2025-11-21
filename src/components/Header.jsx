import './Header.css'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export function Header(){
    const { t } = useTranslation();
    return (
        <>
            <h1 className="baslik">{t("title")}</h1>
            <LanguageSwitcher />
        </>
    )
}