// 求人ページの応募フォームを送る
// 送り先は config.js の APPLY_URL（Apps Script の Webアプリ）。空のあいだは送らずに「準備中」と出す
// 送る中身は応募者が入れた項目と、選んでいた言語だけ
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applyForm');
  if (!form) return;
  const msg = document.getElementById('formMsg');
  const btn = form.querySelector('button.submit');
  const T = key => window.i18n.t(key) || {
    'f.sending': '送信中…', 'f.ok': '送信しました。ありがとうございます。会社から連絡します。',
    'f.err': '送れませんでした。少し待ってからもう一度送るか、お電話でご連絡ください。',
    'f.notyet': '応募フォームは準備中です。お電話かメールでご連絡ください。',
    'f.need': '必須の項目を入れてください。', 'f.contact': '電話番号かメールアドレスの、どちらかを入れてください。',
  }[key];
  const say = (key, kind) => { msg.textContent = key ? T(key) : ''; msg.className = 'form-msg' + (kind ? ' ' + kind : ''); msg.dataset.key = key || ''; msg.dataset.kind = kind || ''; };
  document.addEventListener('langchange', () => { if (msg.dataset.key) say(msg.dataset.key, msg.dataset.kind); });
  const started = Date.now();

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const v = name => (form.elements[name].value || '').trim();
    if (!v('name') || !form.elements.agree.checked) { say('f.need', 'err'); return; }
    if (!v('tel') && !v('mail')) { say('f.contact', 'err'); return; }
    if (!window.SITE.APPLY_URL) { say('f.notyet', 'err'); return; }
    const data = new URLSearchParams();
    for (const k of ['name', 'kana', 'tel', 'mail', 'age', 'nation', 'status', 'exp', 'message', 'website']) data.append(k, v(k));
    data.append('lang', window.i18n.lang);
    data.append('elapsed', String(Math.round((Date.now() - started) / 1000))); // 開いてすぐの自動送信をはじくため
    btn.disabled = true; btn.textContent = T('f.sending') || btn.textContent; say('', '');
    try {
      // Content-Type を application/x-www-form-urlencoded にすると、Apps Script でも事前確認なしで受け取れる
      const res = await fetch(window.SITE.APPLY_URL, { method: 'POST', body: data });
      const r = await res.json();
      if (!r.ok) throw new Error(r.error || 'failed');
      form.reset(); say('f.ok', 'ok');
    } catch (err) {
      say('f.err', 'err');
    } finally {
      btn.disabled = false;
      btn.textContent = window.i18n.t('f.send') || '送信する';
    }
  });
});
