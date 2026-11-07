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
    'f.okcopy': '送信しました。ありがとうございます。入れていただいたメールアドレスに控えを送りました。会社から連絡します。',
    'f.ageerr': '年齢は15〜99の数字で入れてください。', 'f.mailerr': 'メールアドレスを確かめてください。',
  }[key];
  const say = (key, kind) => { msg.textContent = key ? T(key) : ''; msg.className = 'form-msg' + (kind ? ' ' + kind : ''); msg.dataset.key = key || ''; msg.dataset.kind = kind || ''; };
  document.addEventListener('langchange', () => { if (msg.dataset.key) say(msg.dataset.key, msg.dataset.kind); });
  const started = Date.now();

  // 郵便番号から市区町村を入れる。データは yubinbango-data（日本郵便のデータを毎月まとめた公開データ）。
  // 送るのは郵便番号の頭の3けただけ。中身は JSON として読むだけで、プログラムとしては動かさない
  const PREF = ['', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];
  const zipBook = {};
  const zipIn = form.elements.zip, cityIn = form.elements.city;
  const zipMsg = document.getElementById('zipMsg');
  const zipSay = key => { zipMsg.dataset.key = key; zipMsg.textContent = window.i18n.t(key) || { 'f.ziphint': '郵便番号を入れると、市区町村が自動で入ります。', 'f.zipnone': 'この郵便番号の住所が見つかりませんでした。郵便番号を確かめるか、市区町村を入れてください。' }[key]; };
  document.addEventListener('langchange', () => zipSay(zipMsg.dataset.key || 'f.ziphint'));
  zipSay('f.ziphint');
  const digits = s => s.replace(/[０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/\D/g, '');
  let filled = '';  // 自動で入れた市区町村（人が書き直したら、上書きしない）
  zipIn.addEventListener('input', async () => {
    const z = digits(zipIn.value);
    if (z.length !== 7) { zipSay('f.ziphint'); return; }
    const head = z.slice(0, 3);
    try {
      if (!zipBook[head]) {
        const res = await fetch(`https://yubinbango.github.io/yubinbango-data/data/${head}.js`);
        const text = res.ok ? await res.text() : '';
        const m = /^\s*\$yubin\(([\s\S]*)\);?\s*$/.exec(text);
        zipBook[head] = m ? JSON.parse(m[1]) : {};
      }
      if (digits(zipIn.value) !== z) return; // 調べている間に書き直されたとき
      const hit = zipBook[head][z];
      if (!hit) { zipSay('f.zipnone'); return; }
      const city = (PREF[Number(hit[0])] || '') + hit[1];
      if (!cityIn.value.trim() || cityIn.value === filled) { cityIn.value = city; filled = city; }
      zipSay('f.ziphint');
    } catch (err) {
      zipSay('f.zipnone');
    }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const v = name => (form.elements[name].value || '').trim();
    if (!v('name') || !v('kana') || !v('age') || !form.elements.agree.checked) { say('f.need', 'err'); return; }
    if (!/^\d{1,2}$/.test(v('age')) || Number(v('age')) < 15) { say('f.ageerr', 'err'); return; }
    if (!v('tel') && !v('mail')) { say('f.contact', 'err'); return; }
    if (v('mail') && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('mail'))) { say('f.mailerr', 'err'); return; }
    if (!window.SITE.APPLY_URL) { say('f.notyet', 'err'); return; }
    const data = new URLSearchParams();
    for (const k of ['name', 'kana', 'tel', 'mail', 'age', 'zip', 'city', 'nation', 'status', 'exp', 'message', 'website']) data.append(k, v(k));
    data.append('lang', window.i18n.lang);
    data.append('elapsed', String(Math.round((Date.now() - started) / 1000))); // 開いてすぐの自動送信をはじくため
    btn.disabled = true; btn.textContent = T('f.sending') || btn.textContent; say('', '');
    try {
      // Content-Type を application/x-www-form-urlencoded にすると、Apps Script でも事前確認なしで受け取れる
      const res = await fetch(window.SITE.APPLY_URL, { method: 'POST', body: data });
      const r = await res.json();
      if (!r.ok) {
        // 受け口でも同じ確かめをしている。ページの確かめをすり抜けたときは、理由に合った文を出す
        const why = { need: 'f.need', age: 'f.ageerr', mail: 'f.mailerr' }[r.error];
        if (why) { say(why, 'err'); return; }
        throw new Error(r.error || 'failed');
      }
      form.reset(); filled = ''; zipSay('f.ziphint'); say(r.copy ? 'f.okcopy' : 'f.ok', 'ok');
    } catch (err) {
      say('f.err', 'err');
    } finally {
      btn.disabled = false;
      btn.textContent = window.i18n.t('f.send') || '送信する';
    }
  });
});
