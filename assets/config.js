// ホームページの設定（公開してよい値だけを書く）
window.SITE = {
  // テスト版の帯を出す（true にするときは、各ページに noindex も入れる）。2026-11-07 本番公開で false
  TEST: false,
  // 応募フォームの送り先（Apps Script の Webアプリの /exec の URL）。空のあいだは「準備中」と表示して送らない
  APPLY_URL: 'https://script.google.com/macros/s/AKfycbzrKziCMgK7lomvey4Pep23SgQd8Aey_n0xMm0E4k5ojINKuyeTrg1X4klGSFgOMv5fmA/exec',
  // 従業員専用ページ（合言葉と名前・生年月日で入る Apps Script のページ）
  STAFF_URL: 'https://script.google.com/macros/s/AKfycbyxDmthcVmOIpzz518G3zccrJeJ0xoxObJR6O50UWeSIoHd9rsI15zgcLBb-Jboq09CiQ/exec',
};
