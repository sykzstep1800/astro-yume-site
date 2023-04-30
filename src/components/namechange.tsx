import React, { useState, useLayoutEffect } from 'react';
import type { OCName } from '../content/config';

type Props = {
  mainContent: string;
  ocSettingName: OCName;
};

const TextNameChange: React.FC<Props> = ({ mainContent, ocSettingName }) => {
  const [displayedText, setDisplayedText] = useState(mainContent);
  useLayoutEffect(() => {
    const updateDisplayedText = () => {
      let updatedText = mainContent;
      const localStorageData = localStorage.getItem('name');

      if (localStorageData) {
        const userSettingData: OCName = JSON.parse(localStorageData);

        if (ocSettingName.jpOCFamilyName && userSettingData.jpOCFamilyName) {
          updatedText = updatedText.replaceAll(ocSettingName.jpOCFamilyName, userSettingData.jpOCFamilyName);
        }

        if (ocSettingName.jpOCFirstName && userSettingData.jpOCFirstName) {
          updatedText = updatedText.replaceAll(ocSettingName.jpOCFirstName, userSettingData.jpOCFirstName);
        }

        if (ocSettingName.enOCFirstName && userSettingData.enOCFirstName) {
          updatedText = updatedText.replaceAll(ocSettingName.enOCFirstName, userSettingData.enOCFirstName);
        }

        if (ocSettingName.enOCFamilyName && userSettingData.enOCFamilyName) {
          updatedText = updatedText.replaceAll(ocSettingName.enOCFamilyName, userSettingData.enOCFamilyName);
        }
      }

      setDisplayedText(updatedText);
    };

    updateDisplayedText();
  }, [mainContent, ocSettingName]);

  return <section className="text-gray-600 body-font overflow-hidden"><div style={{whiteSpace: 'pre-line'}}>{displayedText}</div></section>;
};

export default TextNameChange;
