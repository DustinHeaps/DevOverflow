import '@testing-library/jest-dom'
import {vi} from 'vitest';

// fixes window.matchMedia is not a function type error
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  })
});

global.jest = vi