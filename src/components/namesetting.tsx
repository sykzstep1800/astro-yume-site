import React, { useState, useEffect } from "react";
import type { OCName } from "../content/config";

// 初期化
const initialName: OCName = {
  jpOCFamilyName: "",
  jpOCFirstName: "",
  enOCFamilyName: "",
  enOCFirstName: "",
};

// ブラウザのlocalStorageに値を保存・取得
const useLocalStorage = <T extends {}>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] => {

  // localStorageに登録された名前を初期値として取得
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // 名前登録
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  // 名前削除
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, removeValue];
};

// 名前変換コンポーネント
const NameSetting: React.FC = () => {

  // 入力された名前をuseStateで管理
  const [inputName, setInputName] = useState<OCName>(initialName);

  // localStorageに保存された名前を取得しsetInputNameに投入
  const [name, setName, removeName] = useLocalStorage<OCName>(
    'name',
    initialName
  );
  useEffect(() => {
    setInputName(name);
  }, [name]);

  // フォーム入力時の処理
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setInputName((prev) => ({ ...prev, [name]: value }));
  };

  // 設定ボタン押下で登録
  const handleSubmit = () => {
    setName(inputName);
  };

  // クリアボタン押下で削除
  const handleClear = () => {
    setInputName(initialName); // 初期化
    removeName();
  };

  return (
    <div className="flex-col2">
      <div>
        <input
          type="text"
          name="jpOCFamilyName"
          value={inputName.jpOCFamilyName}
          onChange={handleInputChange}
          placeholder="名字"
        />
        <input
          type="text"
          name="jpOCFirstName"
          value={inputName.jpOCFirstName}
          onChange={handleInputChange}
          placeholder="名前"
        />
      </div>
      <div>
        <input
          type="text"
          name="enOCFirstName"
          value={inputName.enOCFirstName}
          onChange={handleInputChange}
          placeholder="ファーストネーム"
        />
        <input
          type="text"
          name="enOCFamilyName"
          value={inputName.enOCFamilyName}
          onChange={handleInputChange}
          placeholder="ファミリーネーム"
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        設定
      </button>
      <button type="button" onClick={handleClear}>
        クリア
      </button>
    </div>
  );
};

export default NameSetting;