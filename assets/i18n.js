// 言語の切り替え（日本語・English・မြန်မာ）と、スマホのメニュー
// HTML には日本語をそのまま書き、data-i18n="キー" の要素だけを選んだ言語の文に置き換える
// data-i18n-ph="キー" は入力欄の薄い字（placeholder）を置き換える
// 会社名などの固有名詞は訳さない
const LANGS = [['ja', '日本語'], ['en', 'English'], ['my', 'မြန်မာ']];

const I18N = {
  // 共通
  'nav.home':      { en: 'Home', my: 'ပင်မစာမျက်နှာ' },
  'nav.business':  { en: 'Our Work', my: 'လုပ်ငန်းများ' },
  'nav.strength':  { en: 'Strength', my: 'အားသာချက်' },
  'nav.company':   { en: 'Company', my: 'ကုမ္ပဏီအကြောင်း' },
  'nav.recruit':   { en: 'Careers', my: 'အလုပ်ခေါ်စာ' },
  'nav.contact':   { en: 'Contact', my: 'ဆက်သွယ်ရန်' },
  'nav.staff':     { en: 'For Employees', my: 'ဝန်ထမ်းများအတွက်' },
  'menu':          { en: 'Menu', my: 'မီနူး' },
  'tbd':           { en: '[To be confirmed]', my: '[အတည်ပြုရန်]' },
  'footer.privacy':{ en: 'Privacy Policy', my: 'ကိုယ်ရေးအချက်အလက် ကိုင်တွယ်ပုံ' },
  'footer.staff':  { en: 'For employees (login required)', my: 'ဝန်ထမ်းများအတွက် (ဝင်ရောက်ရန် လိုအပ်)' },

  // トップ
  'hero.title':  { en: 'Fast, reliable framing for wooden homes.', my: 'သစ်သားအိမ်များ၏ ဘောင်ဆောက်လုပ်ငန်းကို မြန်ဆန်စွာ၊ စိတ်ချရစွာ။' },
  'hero.lead':   { en: 'We frame wooden detached houses and apartment buildings, mainly with the 2×4 (two-by-four) method.',
                   my: 'ကျွန်ုပ်တို့သည် 2×4 (တူးဘိုင်ဖိုး) နည်းစနစ်ကို အဓိကထား၍ သစ်သား လုံးချင်းအိမ်များနှင့် တိုက်ခန်းအဆောက်အအုံများ၏ ဘောင်ဆောက်လုပ်ငန်းကို ဆောင်ရွက်ပါသည်။' },
  'hero.cta1':   { en: 'Our work', my: 'လုပ်ငန်းများ ကြည့်ရန်' },
  'hero.cta2':   { en: 'Careers & apply', my: 'အလုပ်လျှောက်ရန်' },

  'biz.eyebrow':    { en: 'OUR WORK', my: 'OUR WORK' },
  'biz.title':      { en: 'Our Work', my: 'လုပ်ငန်းများ' },
  'biz.main.tag':   { en: 'Main work', my: 'အဓိက လုပ်ငန်း' },
  'biz.main.title': { en: 'Framing with the 2×4 method', my: '2×4 နည်းစနစ်ဖြင့် ဘောင်ဆောက်လုပ်ငန်း' },
  'biz.main.text':  { en: 'We frame wooden detached houses and apartment buildings using the 2×4 (two-by-four) method — from the floor and walls up to the roof.',
                      my: '2×4 (တူးဘိုင်ဖိုး) နည်းစနစ်ဖြင့် သစ်သား လုံးချင်းအိမ်များနှင့် တိုက်ခန်းများ၏ ဘောင်ကို ကြမ်းခင်း၊ နံရံမှ ခေါင်မိုးအထိ ဆောက်လုပ်ပါသည်။' },
  'biz.sub.tag':    { en: 'We can also do', my: 'အခြား လုပ်ဆောင်နိုင်သည်များ' },
  'biz.sub1.title': { en: 'Conventional method', my: 'ရိုးရာ နည်းစနစ် (在来工法)' },
  'biz.sub1.text':  { en: 'Besides 2×4, we also frame buildings with the conventional Japanese post-and-beam method.',
                      my: '2×4 အပြင် ဂျပန် ရိုးရာ တိုင်နှင့်ရက်မ နည်းစနစ်ဖြင့် ဘောင်ဆောက်ခြင်းကိုလည်း လုပ်ဆောင်ပါသည်။' },
  'biz.sub2.title': { en: 'Hand framing and panels', my: 'လက်ဖြင့် တပ်ဆင်ခြင်းနှင့် ပြားချပ် (panel)' },
  'biz.sub2.text':  { en: 'We handle both framing built by hand on site and framing with factory-made panels.',
                      my: 'လုပ်ငန်းခွင်တွင် လက်ဖြင့် တပ်ဆင်ခြင်းနှင့် စက်ရုံတွင် ပြုလုပ်ထားသော ပြားချပ်များဖြင့် တပ်ဆင်ခြင်း နှစ်မျိုးလုံးကို လုပ်ဆောင်ပါသည်။' },
  'biz.sub3.title': { en: 'Interior carpentry', my: 'အတွင်းပိုင်း လက်သမားလုပ်ငန်း (造作)' },
  'biz.sub3.text':  { en: 'Besides framing, we also do interior finish carpentry.',
                      my: 'ဘောင်ဆောက်လုပ်ငန်းအပြင် အတွင်းပိုင်း လက်သမား အပြီးသတ်လုပ်ငန်းကိုလည်း ဆောင်ရွက်ပါသည်။' },

  'str.eyebrow': { en: 'STRENGTH', my: 'STRENGTH' },
  'str.title':   { en: 'Our Strength', my: 'ကျွန်ုပ်တို့၏ အားသာချက်' },
  'str.big':     { en: 'A full crew gets you to the ridge-raising in a short time.', my: 'လူအင်အား အပြည့်ဖြင့် အချိန်တိုအတွင်း ခေါင်မိုးထိပ်တင် (上棟) အထိ။' },
  'str.text':    { en: 'We go to each site with enough people and finish the framing up to the ridge-raising (jōtō) in a short construction period.',
                   my: 'လုံလောက်သော လူအင်အားဖြင့် လုပ်ငန်းခွင်သို့ ဝင်ရောက်ပြီး အချိန်တိုအတွင်း ခေါင်မိုးထိပ်တင် (上棟) သည်အထိ ဘောင်ဆောက်လုပ်ငန်းကို ပြီးစီးအောင် ဆောင်ရွက်ပါသည်။' },
  'str.s1':      { en: 'Floor', my: 'ကြမ်းခင်း' },
  'str.s2':      { en: 'Walls', my: 'နံရံ' },
  'str.s3':      { en: 'Upper floor', my: 'အပေါ်ထပ်' },
  'str.s4':      { en: 'Roof / ridge', my: 'ခေါင်မိုး' },

  'co.eyebrow':  { en: 'COMPANY', my: 'COMPANY' },
  'co.title':    { en: 'Company Profile', my: 'ကုမ္ပဏီအကြောင်း' },
  'co.name':     { en: 'Company name', my: 'ကုမ္ပဏီအမည်' },
  'co.addr':     { en: 'Address', my: 'လိပ်စာ' },
  'co.rep':      { en: 'Representative', my: 'ကိုယ်စားလှယ်' },
  'co.biz':      { en: 'Business', my: 'လုပ်ငန်း' },
  'co.bizv':     { en: 'Framing of wooden houses and apartments (2×4 and conventional methods, hand framing and panels), interior carpentry',
                   my: 'သစ်သား လုံးချင်းအိမ်နှင့် တိုက်ခန်းများ၏ ဘောင်ဆောက်လုပ်ငန်း (2×4 နှင့် ရိုးရာနည်းစနစ်၊ လက်ဖြင့် တပ်ဆင်ခြင်းနှင့် ပြားချပ်)၊ အတွင်းပိုင်း လက်သမားလုပ်ငန်း' },
  'co.repv':     { en: 'Representative Member', my: 'ကိုယ်စားလှယ် အဖွဲ့ဝင်' },


  // 求人
  'rc.eyebrow': { en: 'CAREERS', my: 'CAREERS' },
  'rc.title':   { en: 'Careers', my: 'အလုပ်ခေါ်စာ' },
  'rc.lead':    { en: 'We are looking for people to build houses with us. Beginners and people from other countries are welcome.',
                  my: 'ကျွန်ုပ်တို့နှင့်အတူ အိမ်ဆောက်မည့် လုပ်ဖော်ကိုင်ဖက်များကို ခေါ်ယူနေပါသည်။ အတွေ့အကြုံ မရှိသူများနှင့် နိုင်ငံခြားသားများကိုလည်း ကြိုဆိုပါသည်။' },
  'rc.job':     { en: 'Position details', my: 'အလုပ်အကိုင် အသေးစိတ်' },
  'rc.kind':    { en: 'Position', my: 'အလုပ်အမျိုးအစား' },
  'rc.kindv':   { en: 'Carpenter (framing and interior carpentry)', my: 'လက်သမား (ဘောင်ဆောက်ခြင်းနှင့် အတွင်းပိုင်း လက်သမား)' },
  'rc.type':    { en: 'Employment type', my: 'အလုပ်ခန့်အပ်မှု ပုံစံ' },
  'rc.typev':   { en: 'Full-time employee', my: 'အမြဲတမ်း ဝန်ထမ်း' },
  'rc.place':   { en: 'Work location', my: 'အလုပ်နေရာ' },
  'rc.hours':   { en: 'Working hours', my: 'အလုပ်ချိန်' },
  'rc.hoursv':  { en: '8:00–18:00 (with breaks)', my: '8:00–18:00 (နားချိန် ပါဝင်)' },
  'rc.off':     { en: 'Days off', my: 'ပိတ်ရက်' },
  'rc.offv':    { en: 'Saturdays, Sundays and special holidays (113 days off a year)', my: 'စနေ၊ တနင်္ဂနွေနှင့် အထူးခွင့်ရက်များ (တစ်နှစ်လျှင် ပိတ်ရက် 113 ရက်)' },
  'rc.pay':     { en: 'Pay', my: 'လစာ' },
  'rc.placev':  { en: 'Head office (Musashino-shi, Tokyo) and each construction site', my: 'ရုံးချုပ် (တိုကျို၊ မူဆာရှီနိုမြို့) နှင့် လုပ်ငန်းခွင်တစ်ခုချင်းစီ' },
  'rc.payv':    { en: 'Decided by experience and skills (explained at the interview)', my: 'အတွေ့အကြုံနှင့် ကျွမ်းကျင်မှုအလိုက် သတ်မှတ်ပါသည် (အင်တာဗျူးတွင် ရှင်းပြပါမည်)' },
  'rc.perk':    { en: 'Benefits', my: 'အကျိုးခံစားခွင့်များ' },
  'rc.perkv':   { en: 'Social insurance (health insurance, employees\' pension, employment insurance, workers\' accident insurance). The company pays for qualification courses. Bonus (depending on company results).', my: 'လူမှုဖူလုံရေး အာမခံ (ကျန်းမာရေး အာမခံ၊ ပင်စင်၊ အလုပ်အကိုင် အာမခံ၊ လုပ်ငန်းခွင် ထိခိုက်မှု အာမခံ)။ လိုင်စင် သင်တန်းကြေးကို ကုမ္ပဏီက ကျခံပါသည်။ ဆုကြေးငွေ (ကုမ္ပဏီ၏ ရလဒ်အပေါ် မူတည်သည်)။' },
  'rc.qual':    { en: 'Requirements', my: 'လျှောက်ထားသူ အရည်အချင်း' },
  'rc.qualv':   { en: 'No educational requirements (junior high school and high school graduates can apply). Beginners and people from other countries are welcome.', my: 'ပညာအရည်အချင်း မလိုပါ (အလယ်တန်း၊ အထက်တန်း ပြီးသူများလည်း လျှောက်ထားနိုင်ပါသည်)။ အတွေ့အကြုံ မရှိသူများနှင့် နိုင်ငံခြားသားများကိုလည်း ကြိုဆိုပါသည်။' },
  'rc.welcome': { en: 'Very welcome', my: 'အထူးကြိုဆိုသူ' },
  'rc.welcomev':{ en: 'People confident in their stamina and strength', my: 'ခွန်အားနှင့် ကြွက်သား အင်အားကို ယုံကြည်သူများ' },
  'rc.flow':    { en: 'How to apply', my: 'လျှောက်ထားပုံ' },
  'rc.f1':      { en: 'Apply with the form', my: 'ပုံစံဖြင့် လျှောက်ထားခြင်း' },
  'rc.f2':      { en: 'We contact you', my: 'ကုမ္ပဏီမှ ဆက်သွယ်ခြင်း' },
  'rc.f3':      { en: 'Interview', my: 'အင်တာဗျူး' },
  'rc.f4':      { en: 'Hiring', my: 'အလုပ်ခန့်ခြင်း' },
  'rc.form':    { en: 'Application form', my: 'လျှောက်လွှာ ပုံစံ' },
  'rc.formlead':{ en: 'Please fill in the items below and send. We will contact you.', my: 'အောက်ပါ အချက်များကို ဖြည့်ပြီး ပို့ပါ။ ကုမ္ပဏီမှ ဆက်သွယ်ပါမည်။' },
  'req':        { en: 'Required', my: 'မဖြစ်မနေ' },
  'f.name':     { en: 'Name', my: 'အမည်' },
  'f.kana':     { en: 'Name in katakana (if you have one)', my: 'ခတာခနဖြင့် အမည် (ရှိလျှင်)' },
  'f.tel':      { en: 'Phone number', my: 'ဖုန်းနံပါတ်' },
  'f.mail':     { en: 'Email address', my: 'အီးမေးလ်လိပ်စာ' },
  'f.age':      { en: 'Age', my: 'အသက်' },
  'f.nation':   { en: 'Nationality', my: 'နိုင်ငံသား' },
  'f.status':   { en: 'Residence status (if you are not Japanese)', my: 'နေထိုင်ခွင့် အမျိုးအစား (ဂျပန်နိုင်ငံသား မဟုတ်လျှင်)' },
  'f.statusph': { en: 'e.g. Specified Skilled Worker, Permanent Resident', my: 'ဥပမာ - သတ်မှတ်ကျွမ်းကျင်လုပ်သား (特定技能)၊ အမြဲတမ်းနေထိုင်ခွင့်' },
  'f.exp':      { en: 'Carpentry experience', my: 'လက်သမား အတွေ့အကြုံ' },
  'f.exp0':     { en: 'Please choose', my: 'ရွေးပါ' },
  'f.exp1':     { en: 'None', my: 'မရှိ' },
  'f.exp2':     { en: 'Less than 1 year', my: '1 နှစ်အောက်' },
  'f.exp3':     { en: '1–3 years', my: '1–3 နှစ်' },
  'f.exp4':     { en: 'More than 3 years', my: '3 နှစ်ကျော်' },
  'f.msg':      { en: 'Message (experience, qualifications, when you can start, etc.)', my: 'မက်ဆေ့ချ် (အတွေ့အကြုံ၊ လိုင်စင်၊ စတင်နိုင်သည့်အချိန် စသည်)' },
  'f.agree':    { en: 'I agree to the handling of personal information.', my: 'ကိုယ်ရေးအချက်အလက် ကိုင်တွယ်ပုံကို သဘောတူပါသည်။' },
  'f.agreelink':{ en: 'Read the privacy policy', my: 'ကိုယ်ရေးအချက်အလက် ကိုင်တွယ်ပုံကို ဖတ်ရန်' },
  'f.contact':  { en: 'Please enter a phone number or an email address.', my: 'ဖုန်းနံပါတ် သို့မဟုတ် အီးမေးလ်လိပ်စာကို ထည့်ပါ။' },
  'f.send':     { en: 'Send', my: 'ပို့မည်' },
  'f.sending':  { en: 'Sending…', my: 'ပို့နေသည်…' },
  'f.ok':       { en: 'Thank you. Your application has been sent. We will contact you.', my: 'ကျေးဇူးတင်ပါသည်။ လျှောက်လွှာ ပို့ပြီးပါပြီ။ ကုမ္ပဏီမှ ဆက်သွယ်ပါမည်။' },
  'f.err':      { en: 'Could not send. Please wait a moment and try again, or contact us by phone.', my: 'ပို့၍ မရပါ။ ခဏစောင့်ပြီး ထပ်ကြိုးစားပါ သို့မဟုတ် ဖုန်းဖြင့် ဆက်သွယ်ပါ။' },
  'f.notyet':   { en: 'The form is being prepared. Please contact us by phone or email.', my: 'ပုံစံကို ပြင်ဆင်နေဆဲ ဖြစ်ပါသည်။ ဖုန်း သို့မဟုတ် အီးမေးလ်ဖြင့် ဆက်သွယ်ပါ။' },
  'f.need':     { en: 'Please fill in the required items.', my: 'မဖြစ်မနေ ဖြည့်ရမည့် အချက်များကို ဖြည့်ပါ။' },

  // 個人情報の取り扱い
  'pv.title':  { en: 'Privacy Policy', my: 'ကိုယ်ရေးအချက်အလက် ကိုင်တွယ်ပုံ' },
  'pv.lead':   { en: 'We handle the personal information we receive as follows.', my: 'ကျွန်ုပ်တို့ လက်ခံရရှိသော ကိုယ်ရေးအချက်အလက်များကို အောက်ပါအတိုင်း ကိုင်တွယ်ပါသည်။' },
  'pv.h1':     { en: 'Information we receive', my: 'လက်ခံရရှိသော အချက်အလက်များ' },
  'pv.t1':     { en: 'Name, phone number, email address, age, nationality, residence status, experience and message entered in the application form, and information you give us by phone or email.',
                 my: 'လျှောက်လွှာ ပုံစံတွင် ဖြည့်သွင်းသော အမည်၊ ဖုန်းနံပါတ်၊ အီးမေးလ်လိပ်စာ၊ အသက်၊ နိုင်ငံသား၊ နေထိုင်ခွင့် အမျိုးအစား၊ အတွေ့အကြုံ၊ မက်ဆေ့ချ်နှင့် ဖုန်း သို့မဟုတ် အီးမေးလ်ဖြင့် ပေးသော အချက်အလက်များ။' },
  'pv.h2':     { en: 'Purpose of use', my: 'အသုံးပြုရည်ရွယ်ချက်' },
  'pv.t2':     { en: 'We use it only to select applicants and to contact you, and to answer your questions.', my: 'လျှောက်ထားသူများကို ရွေးချယ်ရန်၊ ဆက်သွယ်ရန်နှင့် မေးမြန်းချက်များကို ဖြေကြားရန်အတွက်သာ အသုံးပြုပါသည်။' },
  'pv.h3':     { en: 'Giving information to others', my: 'အခြားသူများထံ ပေးခြင်း' },
  'pv.t3':     { en: 'We do not give it to third parties without your consent, except when required by law.', my: 'ဥပဒေအရ လိုအပ်သည့်အခါမှလွဲ၍ သင့်သဘောတူညီချက်မရှိဘဲ တတိယပုဂ္ဂိုလ်များထံ မပေးပါ။' },
  'pv.h4':     { en: 'Storage and deletion', my: 'သိမ်းဆည်းခြင်းနှင့် ဖျက်ခြင်း' },
  'pv.t4':     { en: 'We store it carefully so that only the people in charge can see it, and delete it when it is no longer needed.', my: 'တာဝန်ရှိသူများသာ ကြည့်ရှုနိုင်အောင် ဂရုတစိုက် သိမ်းဆည်းပြီး မလိုအပ်တော့သည့်အခါ ဖျက်ပါသည်။' },
  'pv.h5':     { en: 'Contact', my: 'ဆက်သွယ်ရန်' },
  'pv.t5':     { en: 'If you want to see, correct or delete your information, please contact us.', my: 'သင့်အချက်အလက်ကို ကြည့်ရှု၊ ပြင်ဆင် သို့မဟုတ် ဖျက်လိုပါက ကျွန်ုပ်တို့ထံ ဆက်သွယ်ပါ။' },
  'test.bar':  { en: 'Test version (for checking before release). The content may change.', my: 'စမ်းသပ်ဗားရှင်း (ထုတ်ဝေမီ စစ်ဆေးရန်)။ အကြောင်းအရာ ပြောင်းလဲနိုင်ပါသည်။' },
};

function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

const params = new URLSearchParams(location.search);
let lang = params.get('lang') || store('site-lang') || 'ja';
if (!LANGS.some(l => l[0] === lang)) lang = 'ja';

// 日本語の文は HTML から覚えておく（日本語に戻すとき使う）
const original = new Map();
function t(key) {
  if (lang === 'ja') return null;
  return (I18N[key] && I18N[key][lang]) || null;
}
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!original.has(el)) original.set(el, el.textContent);
    el.textContent = t(el.dataset.i18n) || original.get(el);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    if (!original.has(el)) original.set(el, el.getAttribute('placeholder') || '');
    el.setAttribute('placeholder', t(el.dataset.i18nPh) || original.get(el));
  });
  document.querySelectorAll('.langs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}
window.i18n = { t: key => t(key), get lang() { return lang; } };

document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.langs');
  if (box) {
    for (const [code, label] of LANGS) {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = label; b.dataset.lang = code;
      b.addEventListener('click', () => { lang = code; store('site-lang', code); applyLang(); });
      box.append(b);
    }
  }
  const menu = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (menu && nav) {
    menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
    nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });
  }
  // テスト版の帯（config.js の TEST が true のあいだ）
  if (window.SITE.TEST) {
    const bar = document.createElement('div');
    bar.className = 'test-bar'; bar.dataset.i18n = 'test.bar';
    bar.textContent = 'テスト版です（公開前の確認用）。内容は変わることがあります。';
    document.body.prepend(bar);
  }
  document.querySelectorAll('[data-staff-link]').forEach(a => { a.href = window.SITE.STAFF_URL; });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  applyLang();
});
