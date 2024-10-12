'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookies from 'js-cookie';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme)

  const flipTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    Cookies.set('color-theme', nextTheme);
    
    const COLORS = nextTheme == 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;

    root.setAttribute(
      'data-color-theme',
      nextTheme
    );
    for (const property in COLORS) {
      if (COLORS.hasOwnProperty(property)) {
          // For CSS variables (custom properties), use setProperty
          if (property.startsWith('--')) {
              root.style.setProperty(property, COLORS[property]);
          } else {
              // Otherwise, apply regular styles
              root.style[property] = COLORS[property];
          }
      }
  }

  }


  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action}
          onClick={flipTheme}
        >
          {theme === 'light' ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
