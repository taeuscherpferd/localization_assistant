import React from 'react';
import styles from './GenericInput.module.scss';

interface GenericInputProps {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const GenericInput = ({ label, value, onChange }: GenericInputProps) => (
  <div className={styles.inputGroup}>
    <label className={styles.genericLabel}>
      {label}
      <br />
      <textarea
        className={styles.textarea}
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);
