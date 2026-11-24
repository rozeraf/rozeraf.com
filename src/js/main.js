import { DICT } from './i18n.js';

const btn = document.getElementById('lang');

function apply(lang) {
  const d = DICT[lang];
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = d[el.dataset.i18n];
  // кнопка показывает язык, на который переключит
  btn.textContent = lang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('lang', lang);
}

const saved = localStorage.getItem('lang');
apply(DICT[saved] ? saved : navigator.language.startsWith('ru') ? 'ru' : 'en');
btn.addEventListener('click', () => apply(document.documentElement.lang === 'ru' ? 'en' : 'ru'));
