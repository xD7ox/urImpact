# أثرك (YourImpact)

نموذج تجريبي (Prototype) لمنصة عربية RTL تربط التخطيط الاستراتيجي بالتنفيذ بإدارة الموارد، بدون تعقيد ERP.

هذا مشروع **ثابت بالكامل (Static)** — HTML/CSS/JS فقط، بدون أي خادم أو قاعدة بيانات حقيقية. كل البيانات في الملف `assets/js/data.js` (بيانات تجريبية وهمية لأغراض العرض).

## الملفات

```
masar-platform/
├── index.html          ← الصفحة التسويقية/التعريفية (Landing)
├── app.html            ← مساحة العمل التفاعلية (الديمو)
├── assets/
│   ├── css/style.css   ← كل التصميم (Design tokens + المكوّنات)
│   └── js/
│       ├── data.js     ← البيانات التجريبية (مهام، أهداف، مخاطر، RFQ، مهارات...)
│       └── app.js      ← منطق الواجهة وعرض كل الوحدات
└── README.md
```

## التشغيل محليًا

ما يحتاج أي تثبيت (npm install). فقط افتح `index.html` في المتصفح، أو شغّل سيرفر محلي بسيط:

```bash
python3 -m http.server 8000
# ثم افتح http://localhost:8000
```

## رفعه على GitHub

```bash
git init
git add .
git commit -m "النسخة الأولى من أثرك"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

> غيّر `USERNAME/REPO_NAME` باسم حسابك واسم الريبو بعد إنشائه من واجهة GitHub (New repository).

## نشره مباشرة (بدون أي سيرفر خاص بك)

أبسط 3 خيارات مجانية، كلها تتعرف على ملفات HTML ثابتة تلقائيًا:

1. **GitHub Pages** (الأسهل لأنه نفس الريبو):
   - من إعدادات الريبو على GitHub → Settings → Pages → اختر Branch: `main` → Save.
   - بعد دقيقة يصير عندك رابط مثل: `https://USERNAME.github.io/REPO_NAME/`

2. **Vercel**: اربط حسابك بـ GitHub من vercel.com → Import Project → اختر الريبو → Deploy (بدون أي إعدادات إضافية لأنه Static).

3. **Netlify**: نفس الفكرة — Add new site → Import from GitHub → اختر الريبو → Deploy.

## ملاحظات مهمة قبل أي استخدام فعلي

- هذا **عرض توضيحي فقط (Demo)** — لا يوجد فيه تسجيل دخول حقيقي، ولا قاعدة بيانات، وكل البيانات تُفقد عند تحديث الصفحة (لأنها كلها JavaScript في الذاكرة).
- البناء الفعلي للمنتج (نسخة قابلة للاستخدام الحقيقي بمستخدمين متعددين) يحتاج Backend + قاعدة بيانات — راجع وثيقة المتطلبات التقنية (Technical Spec) المرفقة في المحادثة لمعرفة البنية المقترحة الكاملة (NestJS + PostgreSQL + Redis).
- التسمية "أثرك" والشعار اسم مبدئي placeholder — غيّرها بكل سهولة من ملف `index.html` و`app.html` (كلمة "YourImpact" والأيقونة) ومن `style.css` (المتغيرات `--blue/--violet/--amber...`) لو حبيت هوية بصرية مختلفة.

## الخطوة التالية المنطقية

لو قررت تكمل لمنتج حقيقي، الانتقال الطبيعي هو نقل هذا الديمو لمشروع **Next.js + TypeScript** مع Backend فعلي (راجع قسم "البنية التقنية المقترحة" بوثيقة المتطلبات) — وقتها أقدر أساعدك تبني الكود الفعلي خطوة بخطوة على نفس هذا التصميم بالضبط.
