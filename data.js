// 1. تحديث اليوميات
const dailyData = {
    question: "شنو أكثر شيء ضحكك اليوم؟",
    homamAnswer: "موقف صارلي في الخدمة اليوم 😂",
    muniyaAnswer: "في انتظار إجابة مُنية..."
};

// 2. قائمة الأنشطة لعجلة الحظ
const activities = [
    "مشاهدة حلقة من مسلسل جديد مع بعض",
    "لعب لعبة Skribbl.io أو لعبة أونلاين بسيطة",
    "تحدي كتابة قصة قصيرة في 5 دقائق",
    "كل واحد يبعث أغنية ويسمعها الثاني وتقيموها",
    "نقاش في موضوع غريب: لو طحتوا في جزيرة مهجورة شن تديروا؟"
];

// 3. قصة اليوم التفاعلية
const storyQuest = {
    currentChapter: "همام ومُنية فتحوا باب معمل قديم ومهجور ولحقهم صوت غريب...",
    options: [
        "الهروب باتجاه الغرفة المظلمة",
        "المواجهة وفتح الكشاف الضوئي",
        "البحث عن مخرج طوارئ"
    ]
};

// 4. لغز أو تحدي اليوم
const currentPuzzle = {
    description: "اكتشف الخطأ في هذا الكود البرمجي المكتوب بلغة JavaScript:",
    code: `function checkFriendship(person1, person2) {
    if (person1 == "Homam" && person2 == "Muniya") {
        return "Best Duo!"
    }
    // Bug here: missing return statement!
}`
};
