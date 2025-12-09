/**
 * Composant Textarea - Champ texte multiligne reutilisable
 *
 * Textarea avec label, error, helperText, et compteur caracteres
 */

import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error = false,
  helperText,
  fullWidth = false,
  maxLength,
  showCount = false,
  className = '',
  value,
  ...props
}) => {
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        className={`
          ${fullWidth ? 'w-full' : ''}
          px-4 py-2
          border ${error ? 'border-red-500' : 'border-gray-300'}
          rounded-lg
          text-gray-900
          bg-white
          font-normal
          transition-colors
          focus:outline-none focus:ring-2
          ${error ? 'focus:ring-red-500' : 'focus:ring-primary'}
          placeholder:text-gray-400
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-none
          ${className}
        `}
        maxLength={maxLength}
        value={value}
        {...props}
      />

      <div className="flex items-center justify-between mt-1">
        <div>
          {helperText && (
            <p className={`text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
              {helperText}
            </p>
          )}
        </div>

        {showCount && maxLength && (
          <p className="text-sm text-gray-500">
            {currentLength} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
};
