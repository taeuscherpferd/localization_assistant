import React from 'react';
import styles from './AltServiceSelector.module.scss';

interface AltServiceSelectorProps {
  altService: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const AltServiceSelector = ({ altService, onChange }: AltServiceSelectorProps) => (
  <div className={styles.inputGroup}>
    <label>
      {"Use alt Service:"}
      <select
        value={altService}
        onChange={onChange}
        className={styles.select}
      >
        <option value="GPT-4o">{"GPT-4o"}</option>
        <option value="OtherService">{"OtherService"}</option>
      </select>
    </label>
  </div>
);
