// ホームページの設定（公開してよい値だけを書く）
window.SITE = {
  // テスト版の帯を出す（本番として公開するときに false にし、各ページの noindex も外す）
  TEST: true,
  // 応募フォームの送り先（Apps Script の Webアプリの /exec の URL）。空のあいだは「準備中」と表示して送らない
  APPLY_URL: '',
  // 従業員専用ページ（合言葉と名前・生年月日で入る Apps Script のページ）
  STAFF_URL: 'https://script.google.com/macros/s/AKfycbyxDmthcVmOIpzz518G3zccrJeJ0xoxObJR6O50UWeSIoHd9rsI15zgcLBb-Jboq09CiQ/exec',
};
