import { darken } from 'polished';

export function colorize(swatch) {
  return `
    background-color: ${swatch};
    border-color: ${darken(0.07, swatch)}
  `;
}
