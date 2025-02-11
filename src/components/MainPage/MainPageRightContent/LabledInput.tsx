import React from 'react';
import styles from './LabledInput.module.scss';

interface GenericInputProps {
  label: string;
  value?: string;
  useInput?: boolean;
  isSensitive?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const LabledInput = ({ label, value, onChange, useInput, isSensitive }: GenericInputProps) => (
  <div className={styles.inputGroup}>
    <label className={styles.genericLabel}>
      {label}
      <br />
      {useInput ? (
        <input
          className={styles.input}
          type={isSensitive ? 'password' : 'text'}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          className={styles.textarea}
          value={value}
          onChange={onChange}
        />
      )}
    </label>
  </div>
);
