(() => {
  const gate = document.getElementById('consentGate');
  const termsModal = document.getElementById('termsModal');
  const acceptTerms = document.getElementById('acceptTerms');
  const continueButton = document.getElementById('continueSite');
  const status = document.getElementById('consentStatus');
  let cookieChoice = localStorage.getItem('dta-cookie-choice') || '';
  const hasAccepted = localStorage.getItem('dta-terms-accepted') === 'yes';

  document.getElementById('year').textContent = new Date().getFullYear();

  function updateGate() {
    continueButton.disabled = !(cookieChoice && acceptTerms.checked);
    status.textContent = cookieChoice && acceptTerms.checked
      ? 'Thanks. You can continue to the website.'
      : 'Choose a cookie option and accept the terms placeholder to continue.';
  }
  if (cookieChoice) {
    document.getElementById('essentialCookies').classList.toggle('chosen', cookieChoice === 'essential');
    document.getElementById('allCookies').classList.toggle('chosen', cookieChoice === 'all');
  }
  acceptTerms.checked = hasAccepted;
  document.getElementById('essentialCookies').addEventListener('click', () => {
    cookieChoice = 'essential';
    localStorage.setItem('dta-cookie-choice', cookieChoice);
    updateGate();
  });
  document.getElementById('allCookies').addEventListener('click', () => {
    cookieChoice = 'all';
    localStorage.setItem('dta-cookie-choice', cookieChoice);
    updateGate();
  });
  acceptTerms.addEventListener('change', updateGate);
  continueButton.addEventListener('click', () => {
    if (!cookieChoice || !acceptTerms.checked) return;
    localStorage.setItem('dta-terms-accepted', 'yes');
    gate.classList.add('hidden');
  });

  const openTerms = () => termsModal.classList.remove('hidden');
  const closeTerms = () => termsModal.classList.add('hidden');
  ['viewTerms', 'openTerms'].forEach(id => document.getElementById(id).addEventListener('click', openTerms));
  ['closeTerms', 'termsDone'].forEach(id => document.getElementById(id).addEventListener('click', closeTerms));
  termsModal.addEventListener('click', e => { if (e.target === termsModal) closeTerms(); });

  document.getElementById('openCookieSettings').addEventListener('click', () => {
    gate.classList.remove('hidden');
    updateGate();
  });
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeTerms(); }
  });
  updateGate();
  if (cookieChoice && hasAccepted) gate.classList.add('hidden');
})();