module.exports = {
  extends: 'motley',
  rules: {
    quotes: ['error', 'single'],
    'jsx-a11y/href-no-hash': 'off',
  },
  env: { jest: true, browser: true },
};
