# بدر × شمس — V5 Modular

هذه أول خطوة من النظام الجديد.

## التشغيل
ضع مجلد `badr_shams_v5` كما هو على استضافة تدعم الملفات الثابتة.
لا تفتح `اساسي.html` عبر `file://` إذا كان المتصفح يمنع ES Modules/Firebase؛ استخدم Live Server أو استضافة HTTPS.

## الهيكل
- `اساسي.html` القلب الرئيسي.
- `css/theme.css` الهوية والتصميم.
- `js/firebase.js` اتصال Firebase.
- `js/app.js` النظام، المستخدم، النقاط، تحميل الألعاب.
- `games/xo.html` أول لعبة مستقلة.

## إضافة لعبة
أنشئ ملفًا جديدًا داخل `games/` ثم اربطه من `اساسي.html`:
`openGame('games/اسم-اللعبة.html','اسم اللعبة')`

اللعبة تتواصل مع الأساسي عبر:
`window.parent.Space.getState()`
`window.parent.Space.getPlayer()`
`window.parent.Space.update(...)`

## ملاحظة
تم استخدام iframe لعزل كل لعبة عن النظام الأساسي. هذا يجعل إضافة الألعاب لاحقًا أسهل وأقل خطورة على الكود الرئيسي.
