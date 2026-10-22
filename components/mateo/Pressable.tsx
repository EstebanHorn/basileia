'use client';

import type { ButtonHTMLAttributes } from 'react';

type PressableProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Pressable({ className, ...props }: PressableProps) {
  return <button type="button" className={`btn-reset${className ? ` ${className}` : ''}`} {...props} />;
}
