import React from 'react';
import styles from './LabledInput.module.scss';

interface GenericInputProps {
  label: string;
  value?: string;
  useInput?: boolean;
  isSensitive?: boolean;
  readonly?: boolean;

  className?: string;

  onClick?: (e: React.MouseEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const LabledInput = ({ label, value, onChange, useInput, isSensitive, readonly, onClick, className }: GenericInputProps) => (
  <div className={`${styles.inputGroup}${className != null ? " " + className : ''}`}>
    <label className={styles.genericLabel}>
      {label}
      <br />
      {useInput ? (
        <input
          className={styles.input}
          type={isSensitive ? 'password' : 'text'}
          readOnly={readonly}
          value={value}
          onChange={onChange}
          onClick={readonly && onClick ? onClick : undefined}
        />
      ) : (
        <textarea
          className={styles.textarea}
          value={value}
          readOnly={readonly}
          onChange={onChange}
        />
      )}
    </label>
  </div>
);
