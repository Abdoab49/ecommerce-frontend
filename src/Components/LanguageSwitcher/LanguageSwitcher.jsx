
import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage =
    (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="language-switcher">
      <span className="language-icon" aria-hidden="true">
        🌐
      </span>

      <select
        value={currentLanguage}
        onChange={handleLanguageChange}
        aria-label="Choose language"
        className="language-select"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
