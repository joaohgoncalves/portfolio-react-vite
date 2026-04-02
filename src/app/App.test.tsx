import i18n from '../i18n';

test('i18n is initialized and fallback language is set', () => {
  expect(i18n.isInitialized).toBe(true);
  expect(i18n.options.fallbackLng).toEqual(['en']);
  expect(i18n.t('navigation.logo')).toBe('JH.');
});
