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
  'nav.staff': { en: "Employees only", my: "ဝန်ထမ်းများသာ" },
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
  'rc.kindv': { en: "Carpenter (framing)", my: "လက်သမား (ဘောင်ဆောက်ခြင်း)" },
  'rc.type':    { en: 'Employment type', my: 'အလုပ်ခန့်အပ်မှု ပုံစံ' },
  'rc.typev': { en: "Full-time employee. 3-month trial period. Experienced carpenters become permanent employees (no fixed term) after the trial period. Beginners first work on a 3-year fixed-term contract, then become permanent employees.", my: "အမြဲတမ်း ဝန်ထမ်း။ အစမ်းခန့်ကာလ 3 လ။ အတွေ့အကြုံ ရှိသူများသည် အစမ်းခန့်ကာလ ပြီးနောက် သက်တမ်း မသတ်မှတ်သော အလုပ်ခန့်အပ်မှု ဖြစ်ပါမည်။ အတွေ့အကြုံ မရှိသူများသည် 3 နှစ် သက်တမ်းသတ်မှတ် စာချုပ်ဖြင့် အရင် အလုပ်လုပ်ပြီးနောက် သက်တမ်း မသတ်မှတ်သော အလုပ်ခန့်အပ်မှု ဖြစ်ပါမည်။" },
  'rc.place':   { en: 'Work location', my: 'အလုပ်နေရာ' },
  'rc.hours':   { en: 'Working hours', my: 'အလုပ်ချိန်' },
  'rc.hoursv': { en: "8:00–18:00\n* Breaks 10:00–10:30, 12:00–13:00 and 15:00–15:30\n* 8 working hours\n* The 5 minutes of preparation before work and the 5 minutes of cleanup after work count as working time, and a preparation and cleanup allowance is paid.", my: "8:00–18:00\n※ နားချိန် 10:00–10:30၊ 12:00–13:00၊ 15:00–15:30\n※ အလုပ်ချိန် 8 နာရီ\n※ အလုပ်မစမီ ပြင်ဆင်ချိန် 5 မိနစ်နှင့် အလုပ်ပြီးနောက် သိမ်းဆည်းချိန် 5 မိနစ်ကို အလုပ်ချိန်အဖြစ် သတ်မှတ်ပြီး ပြင်ဆင်ခြင်းနှင့် သိမ်းဆည်းခြင်း ထောက်ပံ့ကြေး ပေးပါသည်။" },
  'rc.off':     { en: 'Days off', my: 'ပိတ်ရက်' },
  'rc.offv': { en: "Saturdays, Sundays and special holidays (9 days a year). 113 days off a year. There is some Saturday work (overtime pay is paid as required by law).", my: "စနေ၊ တနင်္ဂနွေနှင့် အထူးခွင့်ရက် (တစ်နှစ် 9 ရက်)။ တစ်နှစ်လျှင် ပိတ်ရက် 113 ရက်။ စနေနေ့ အလုပ်ဆင်းရသည့်အခါ ရှိသည် (အချိန်ပိုကြေးကို ဥပဒေအတိုင်း ပေးပါသည်)။" },
  'rc.pay':     { en: 'Pay', my: 'လစာ' },
  'rc.placev':  { en: 'Head office (Musashino-shi, Tokyo) and each construction site', my: 'ရုံးချုပ် (တိုကျို၊ မူဆာရှီနိုမြို့) နှင့် လုပ်ငန်းခွင်တစ်ခုချင်းစီ' },
  'rc.payv': { en: "Monthly salary (hourly wage × 8 hours × 21 days), decided by experience and skills. See \"Grades and estimated take-home pay\" below.", my: "လစာစနစ် (နာရီလုပ်ခ × 8 နာရီ × 21 ရက်)၊ အတွေ့အကြုံနှင့် ကျွမ်းကျင်မှုအလိုက် သတ်မှတ်ပါသည်။ အောက်ပါ \"အဆင့်နှင့် လက်ထဲရမည့်ငွေ ခန့်မှန်းခြေ\" ကို ကြည့်ပါ။" },
  'rc.perk':    { en: 'Benefits', my: 'အကျိုးခံစားခွင့်များ' },
  'rc.perkv': { en: "Company housing available. The company pays for qualification courses. Health checkups (when you join and once a year, paid by the company).", my: "ကုမ္ပဏီ အိမ်ရာ စနစ် ရှိသည်။ လိုင်စင် သင်တန်းကြေးကို ကုမ္ပဏီက ကျခံသည်။ ကျန်းမာရေး စစ်ဆေးမှု (အလုပ်ဝင်ချိန်နှင့် တစ်နှစ်တစ်ကြိမ်၊ ကုမ္ပဏီ ကျခံ)။" },
  'rc.qual':    { en: 'Requirements', my: 'လျှောက်ထားသူ အရည်အချင်း' },
  'rc.qualv': { en: "No educational requirements (junior high school and high school graduates can apply). Beginners are welcome. If you are not Japanese, you need a residence status that allows you to work.", my: "ပညာအရည်အချင်း မလိုပါ (အလယ်တန်း၊ အထက်တန်း ပြီးသူများလည်း လျှောက်ထားနိုင်ပါသည်)။ အတွေ့အကြုံ မရှိသူများကိုလည်း ကြိုဆိုပါသည်။ ဂျပန်နိုင်ငံသား မဟုတ်ပါက အလုပ်လုပ်ခွင့်ရှိသော နေထိုင်ခွင့် လိုအပ်ပါသည်။" },
  'rc.welcome': { en: 'Very welcome', my: 'အထူးကြိုဆိုသူ' },
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

  'rc.work': { en: "Job description", my: "လုပ်ငန်းတာဝန်" },
  'rc.workv': { en: "Framing of wooden detached houses and apartments (2×4 and conventional methods, hand framing and panels)", my: "သစ်သား လုံးချင်းအိမ်နှင့် တိုက်ခန်းများ၏ ဘောင်ဆောက်လုပ်ငန်း (2×4 နှင့် ရိုးရာနည်းစနစ်၊ လက်ဖြင့် တပ်ဆင်ခြင်းနှင့် ပြားချပ်)" },
  'rc.ot': { en: "Overtime", my: "အချိန်ပို" },
  'rc.otv': { en: "Yes (about 45 hours a month). Includes fixed overtime pay for 41.5 hours a month. Overtime beyond that is paid separately (25% extra).", my: "ရှိသည် (တစ်လလျှင် 45 နာရီခန့်)။ တစ်လ 41.5 နာရီစာ ပုံသေ အချိန်ပိုကြေး ပါဝင်သည်။ ထို့ထက် ပိုသော အချိန်ပိုကို သီးခြား ပေးပါသည် (25% ပို)။" },
  'rc.leave': { en: "Leave", my: "ခွင့်" },
  'rc.leavev': { en: "Paid leave (10 days after 6 months of continuous work, then as required by law)", my: "လစာပါသော ခွင့် (6 လ ဆက်တိုက် အလုပ်လုပ်ပြီးနောက် 10 ရက်၊ ထို့နောက် ဥပဒေအတိုင်း)" },
  'rc.raise': { en: "Pay raise", my: "လစာတိုး" },
  'rc.raisev': { en: "Reviewed every year (based on company results and work performance)", my: "နှစ်စဉ် ပြန်လည်သုံးသပ်သည် (ကုမ္ပဏီ၏ ရလဒ်နှင့် လုပ်ငန်းစွမ်းဆောင်ရည်အပေါ် မူတည်သည်)" },
  'rc.bonus': { en: "Bonus", my: "ဆုကြေးငွေ" },
  'rc.bonusv': { en: "1 to 3 times a year (when the company makes a profit). Decided by the health award, material lifting sales, site sales, driving allowance and buy-back of unused paid leave that has expired. See \"Grades and estimated take-home pay\" below.", my: "တစ်နှစ်လျှင် 1 ကြိမ်မှ 3 ကြိမ် (ကုမ္ပဏီ အမြတ်ရှိသည့်အခါ)။ ကျန်းမာရေးဆု၊ ပစ္စည်းသယ်တင်ခြင်း ရောင်းရငွေ၊ လုပ်ငန်းခွင် ရောင်းရငွေ၊ ယာဉ်မောင်း ထောက်ပံ့ကြေးနှင့် မသုံးဘဲ သက်တမ်းကုန်သွားသော လစာပါသော ခွင့် ပြန်ဝယ်ခြင်းဖြင့် သတ်မှတ်ပါသည်။ အောက်ပါ \"အဆင့်နှင့် လက်ထဲရမည့်ငွေ ခန့်မှန်းခြေ\" ကို ကြည့်ပါ။" },
  'rc.ins': { en: "Insurance", my: "အာမခံ" },
  'rc.insv': { en: "Health insurance, employees' pension insurance, employment insurance, workers' accident insurance", my: "ကျန်းမာရေး အာမခံ၊ ပင်စင် အာမခံ၊ အလုပ်အကိုင် အာမခံ၊ လုပ်ငန်းခွင် ထိခိုက်မှု အာမခံ" },
  'rc.retire': { en: "Retirement age", my: "အငြိမ်းစား အသက်" },
  'rc.retirev': { en: "60 (you can keep working until 65 if you wish)", my: "60 နှစ် (ဆန္ဒရှိပါက 65 နှစ်အထိ ဆက်လုပ်နိုင်သည်)" },
  'rc.w1': { en: "People confident in their stamina and strength", my: "ခွန်အားနှင့် ကြွက်သား အင်အားကို ယုံကြည်သူများ" },
  'rc.w2': { en: "People with an ordinary driver's license (Japan)", my: "ဂျပန် သာမန် ယာဉ်မောင်းလိုင်စင် ရှိသူများ" },
  'rc.w3': { en: "People with carpentry experience", my: "လက်သမား အတွေ့အကြုံ ရှိသူများ" },
  'rc.gtitle': { en: "Grades and estimated take-home pay", my: "အဆင့်နှင့် လက်ထဲရမည့်ငွေ ခန့်မှန်းခြေ" },
  'rc.glead': { en: "Estimates for a month with 21 working days and 45 hours of overtime.", my: "တစ်လ 21 ရက် အလုပ်ဆင်းပြီး အချိန်ပို 45 နာရီ လုပ်သည့်အခါ၏ ခန့်မှန်းခြေ ဖြစ်ပါသည်။" },
  'g.c1': { en: "Grade", my: "အဆင့်" },
  'g.c2': { en: "Years of experience (guide)", my: "အတွေ့အကြုံ နှစ် (ခန့်မှန်း)" },
  'g.c3': { en: "Hourly wage", my: "နာရီလုပ်ခ" },
  'g.c4': { en: "Monthly pay (incl. 45 hours of overtime)", my: "လစာ (အချိန်ပို 45 နာရီ ပါဝင်)" },
  'g.c5': { en: "Estimated take-home pay", my: "လက်ထဲရမည့်ငွေ ခန့်မှန်းခြေ" },
  'g.minarai': { en: "Apprentice (見習い)", my: "အလုပ်သင် (見習い)" },
  'g.shokunin': { en: "Craftsman (職人)", my: "လက်မှုပညာသည် (職人)" },
  'g.shokunin_l': { en: "Craftsman + site leader (職人・現場リーダー)", my: "လက်မှုပညာသည် + လုပ်ငန်းခွင် ခေါင်းဆောင် (職人・現場リーダー)" },
  'g.shokucho': { en: "Foreman (職長)", my: "အလုပ်ကြီးကြပ်သူ (職長)" },
  'g.shokucho_l': { en: "Foreman + site leader (職長・現場リーダー)", my: "အလုပ်ကြီးကြပ်သူ + လုပ်ငန်းခွင် ခေါင်းဆောင် (職長・現場リーダー)" },
  'g.oyakata': { en: "Master carpenter (親方)", my: "ဆရာ (親方)" },
  'g.oyakata_l': { en: "Master carpenter + site leader (親方・現場リーダー)", my: "ဆရာ + လုပ်ငန်းခွင် ခေါင်းဆောင် (親方・現場リーダー)" },
  'g.toryo': { en: "Chief carpenter (棟梁)", my: "ဆရာကြီး (棟梁)" },
  'g.y1': { en: "Up to 3rd year", my: "3 နှစ်မြောက်အထိ" },
  'g.y4': { en: "From 4th year", my: "4 နှစ်မြောက်မှစ၍" },
  'g.y7': { en: "From 7th year", my: "7 နှစ်မြောက်မှစ၍" },
  'g.y10': { en: "From 10th year", my: "10 နှစ်မြောက်မှစ၍" },
  'g.yn': { en: "Certified by the representative", my: "ကိုယ်စားလှယ်က အသိအမှတ်ပြုသည်" },
  'g.about': { en: "approx.", my: "ခန့်" },
  'g.n1': { en: "Monthly pay = hourly wage × 8 hours × 21 days + 45 hours of overtime (41.5 hours of fixed overtime pay and 3.5 hours of preparation and cleanup allowance).", my: "လစာ = နာရီလုပ်ခ × 8 နာရီ × 21 ရက် + အချိန်ပို 45 နာရီ (ပုံသေ အချိန်ပိုကြေး 41.5 နာရီနှင့် ပြင်ဆင်ခြင်းနှင့် သိမ်းဆည်းခြင်း ထောက်ပံ့ကြေး 3.5 နာရီ)။" },
  'g.n2': { en: "Estimated take-home pay = monthly pay minus health insurance (example: construction workers' national health insurance, one person), employees' pension, employment insurance and income tax (no dependents). Resident tax and housing costs are not included.", my: "လက်ထဲရမည့်ငွေ ခန့်မှန်းခြေ = လစာ ထဲမှ ကျန်းမာရေး အာမခံ (ဆောက်လုပ်ရေး အမျိုးသား ကျန်းမာရေး အာမခံ၊ တစ်ဦးတည်း ဥပမာ)၊ ပင်စင်၊ အလုပ်အကိုင် အာမခံနှင့် ဝင်ငွေခွန် (မှီခိုသူ မရှိ) ကို နုတ်ထားသော ပမာဏ။ နေထိုင်သူ ခွန်နှင့် အိမ်ရာ ကုန်ကျစရိတ် မပါဝင်ပါ။" },
  'g.n3': { en: "A person given the role of site leader receives the hourly wage one grade above the grade for the same years of experience. The chief carpenter grade is certified by the representative.", my: "လုပ်ငန်းခွင် ခေါင်းဆောင် တာဝန် ပေးခံရသူသည် အတွေ့အကြုံ နှစ်တူ အဆင့်ထက် တစ်ဆင့် မြင့်သော နာရီလုပ်ခ ရရှိပါသည်။ ဆရာကြီး (棟梁) အဆင့်ကို ကိုယ်စားလှယ်က အသိအမှတ်ပြုပါသည်။" },
  'g.n4': { en: "The apprentice hourly wage follows the minimum hourly wage (the table is for fiscal year 2026). Actual amounts vary with working days, overtime hours, taxes and insurance premiums.", my: "အလုပ်သင်၏ နာရီလုပ်ခသည် အနိမ့်ဆုံး နာရီလုပ်ခကို လိုက်နာပါသည် (ဇယားသည် 2026 ဘဏ္ဍာရေးနှစ်အတွက်)။ အမှန်တကယ် ပမာဏသည် အလုပ်ဆင်းရက်၊ အချိန်ပို နာရီ၊ အခွန်နှင့် အာမခံကြေးအလိုက် ပြောင်းလဲပါသည်။" },
  'rc.note': { en: "Notes", my: "မှတ်ချက်" },
  'rc.n1': { en: "We are also looking for independent carpenters (hitori-oyakata) and interior finish carpenters.", my: "ကိုယ်ပိုင်လုပ်ငန်းရှင် လက်သမား (一人親方) နှင့် အတွင်းပိုင်း လက်သမား (造作大工) များကိုလည်း ခေါ်ယူနေပါသည်။" },
  'rc.n2': { en: "People who want to become independent carpenters in the future are also welcome. We will support you in becoming independent.", my: "အနာဂတ်တွင် ကိုယ်ပိုင်လုပ်ငန်းရှင် လက်သမား (一人親方) အဖြစ် လွတ်လပ်စွာ လုပ်ကိုင်လိုသူများကိုလည်း ကြိုဆိုပါသည်။ လွတ်လပ်စွာ လုပ်ကိုင်နိုင်ရန် ကူညီပံ့ပိုးပေးပါမည်။" },
  'g.c6': { en: "Bonus items", my: "ဆုကြေးငွေ အချက်များ" },
  'b.health': { en: "Health award", my: "ကျန်းမာရေးဆု" },
  'b.niage': { en: "Lifting", my: "ပစ္စည်းသယ်တင်" },
  'b.leave': { en: "Expired leave buy-back", my: "သက်တမ်းကုန် ခွင့်ပြန်ဝယ်" },
  'b.site': { en: "Site sales", my: "လုပ်ငန်းခွင် ရောင်းရငွေ" },
  'b.drive': { en: "Driving allowance", my: "ယာဉ်မောင်း ထောက်ပံ့ကြေး" },
  'g.n5': { en: "Bonuses are paid 1 to 3 times a year when the company makes a profit, based on the items below (no bonus if there is no profit). Health award: for people who had no sudden days off. Lifting: from the material lifting sales of each site, for all workers there. Site sales and driving allowance: for site leaders. Expired leave buy-back: the company buys back unused paid leave that has expired.", my: "ကုမ္ပဏီ အမြတ်ရှိသည့်အခါ ဆုကြေးငွေကို တစ်နှစ်လျှင် 1 ကြိမ်မှ 3 ကြိမ် အောက်ပါ အချက်များဖြင့် သတ်မှတ်ပေးပါသည် (အမြတ်မရှိပါက ဆုကြေးငွေ မရှိပါ)။ ကျန်းမာရေးဆု - ရုတ်တရက် ခွင့်ယူခြင်း မရှိသူများအတွက်။ ပစ္စည်းသယ်တင် - လုပ်ငန်းခွင်တစ်ခုချင်းစီ၏ ပစ္စည်းသယ်တင်ခြင်း ရောင်းရငွေမှ အလုပ်လုပ်သူ အားလုံးအတွက်။ လုပ်ငန်းခွင် ရောင်းရငွေနှင့် ယာဉ်မောင်း ထောက်ပံ့ကြေး - လုပ်ငန်းခွင် ခေါင်းဆောင်များအတွက်။ သက်တမ်းကုန် ခွင့်ပြန်ဝယ် - မသုံးဘဲ သက်တမ်းကုန်သွားသော လစာပါသော ခွင့်ကို ကုမ္ပဏီက ပြန်ဝယ်ပါသည်။" },
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
// 文の終わり（。・။・英語の「. 」）で分ける。かっこの中では分けない
function sentences(text) {
  const out = []; let cur = '', depth = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '\n') { if (cur.trim()) out.push(cur.trim()); cur = ''; continue; } // 改行はそのまま改行にする
    cur += c;
    if ('（('.includes(c)) depth++;
    else if ('）)'.includes(c)) depth = Math.max(0, depth - 1);
    else if (depth === 0 && (c === '。' || c === '။' || (c === '.' && text[i + 1] === ' '))) { out.push(cur.trim()); cur = ''; }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
// data-br のある要素は文ごとに改行する。data-link があれば「」や "" で囲んだ部分をそのページ内リンクにする
function setText(el, text) {
  if (!el.hasAttribute('data-br')) { el.textContent = text; return; }
  el.textContent = '';
  sentences(text).forEach((line, i) => {
    if (i) el.append(document.createElement('br'));
    const m = el.dataset.link && /「[^」]+」|"[^"]+"/.exec(line);
    if (!m) { el.append(line); return; }
    const a = document.createElement('a');
    a.href = el.dataset.link; a.textContent = m[0];
    el.append(line.slice(0, m.index), a, line.slice(m.index + m[0].length));
  });
}
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!original.has(el)) original.set(el, el.textContent);
    setText(el, t(el.dataset.i18n) || original.get(el));
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
  // 上の帯の高さ（ページ内リンクで移ったとき、見出しが帯に隠れないようにする）
  const header = document.querySelector('.site-header');
  const setH = () => header && document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  setH(); window.addEventListener('resize', setH);
  // トップページ: 見ている欄（事業内容・強み・会社概要）の帯のリンクに印をつける
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const mark = () => {
      const top = (header ? header.offsetHeight : 72) + 40;
      let best = null;
      for (const sec of sections) if (sec.getBoundingClientRect().top <= top) best = sec; // 見出しが帯のすぐ下より上に来た欄のうち、いちばん下
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) best = sections[sections.length - 1]; // ページの終わりでは最後の欄
      navLinks.forEach(a => { if (best && a.getAttribute('href') === '#' + best.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    };
    window.addEventListener('scroll', mark, { passive: true });
    window.addEventListener('resize', mark);
    mark();
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
