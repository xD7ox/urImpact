/* ====================== YourImpact — mock data ====================== */
const C = {plan:'#5B53C6',exec:'#1F6FEB',res:'#C77A2B',good:'#1B9E72',warn:'#D8503F',gold:'#E0A500'};
const S = {plan:'#ECEAFB',exec:'#E6EFFD',res:'#FBEFE0',good:'#E1F5EE',warn:'#FBE7E3',gold:'#FBF1D6'};

let workspaces = [
  {id:'ws1', name:'تطوير تطبيق الجوّال', type:'project', icon:'📁'},
  {id:'ws2', name:'قسم تقنية المعلومات (تشغيلي)', type:'ops', icon:'🔁'},
];

const goalsTree = {
  name:'تحسين تجربة العميل الرقمية', pct:64, color:'plan',
  children:[
    {name:'إطلاق تطبيق الجوّال', pct:58, color:'exec', children:[
      {name:'تصميم الواجهات', pct:80, color:'good'},
      {name:'بناء الواجهة الخلفية', pct:45, color:'res'},
      {name:'الاختبار والإطلاق', pct:20, color:'warn'},
    ]},
    {name:'تقليل زمن الاستجابة للدعم', pct:70, color:'good', children:[
      {name:'أتمتة الردود الشائعة', pct:85, color:'good'},
      {name:'تدريب فريق الدعم', pct:55, color:'res'},
    ]},
  ]
};

const tasks = [
  {id:1,title:'تصميم شاشة الحساب الشخصي',proj:'تطبيق الجوّال',goal:'تصميم الواجهات',progress:80,status:'inprogress',due:'25 يونيو',skill:'تصميم واجهات',minLevel:3,assignee:'نواف الحسون'},
  {id:2,title:'بناء API تسجيل الدخول',proj:'تطبيق الجوّال',goal:'بناء الواجهة الخلفية',progress:40,status:'inprogress',due:'30 يونيو',skill:'Node.js',minLevel:3,assignee:'محمد عبدالله'},
  {id:3,title:'اختبار الأداء تحت الضغط',proj:'تطبيق الجوّال',goal:'الاختبار والإطلاق',progress:0,status:'late',due:'10 يونيو',skill:'اختبار آلي',minLevel:2,assignee:null},
  {id:4,title:'إعداد ردود تلقائية للدعم',proj:'الدعم الفني',goal:'أتمتة الردود الشائعة',progress:100,status:'done',due:'1 يونيو',skill:'إعداد روبوت محادثة',minLevel:1,assignee:'سارة القحطاني'},
  {id:5,title:'ورشة تدريب فريق الدعم',proj:'الدعم الفني',goal:'تدريب فريق الدعم',progress:55,status:'inprogress',due:'28 يونيو',skill:'دعم العملاء',minLevel:2,assignee:'فاطمة العمري'},
];

const team = [
  {id:'u1', name:'نواف الحسون', color:'exec', skills:{'تصميم واجهات':4,'Node.js':2}, track:85, onLeave:false},
  {id:'u2', name:'سارة القحطاني', color:'res', skills:{'إعداد روبوت محادثة':3,'تصميم واجهات':1}, track:80, onLeave:true},
  {id:'u3', name:'محمد عبدالله', color:'good', skills:{'Node.js':3,'اختبار آلي':2}, track:70, onLeave:false},
  {id:'u4', name:'فاطمة العمري', color:'plan', skills:{'دعم العملاء':4,'اختبار آلي':1}, track:90, onLeave:false},
];

const rfqs = [
  {id:'r1', title:'تراخيص أدوات مراقبة الأداء', cc:'تقنية المعلومات', project:'تطبيق الجوّال', deadline:'29 يونيو', status:'comparing',
    quotes:[{s:'سحابة الإبداع',a:42000,st:'received'},{s:'الحلول الذكية',a:38500,st:'received'},{s:'تك فرونتير',a:51000,st:'rejected'}]},
  {id:'r2', title:'خدمة استضافة سحابية سنوية', cc:'تقنية المعلومات', project:null, deadline:'5 يوليو', status:'open',
    quotes:[{s:'شريك AWS',a:0,st:'requested'}]},
  {id:'r3', title:'تجديد رخص أدوات تصميم', cc:'تسويق', project:null, deadline:'15 يونيو', status:'closed',
    quotes:[{s:'موزّع Adobe',a:9800,st:'accepted'},{s:'موزّع محلي',a:11200,st:'rejected'}]},
];

const training = [
  {program:'أساسيات تصميم واجهات المستخدم', user:'سارة القحطاني', source:'auto', date:'5 يوليو', reason:'مطلوبة لمهمة "تصميم شاشة الحساب الشخصي" بمستوى متقدم، وسارة بمستوى مبتدئ'},
  {program:'اختبار الأداء — Load Testing', user:'محمد عبدالله', source:'auto', date:'12 يوليو', reason:'لا أحد بالفريق يملك "اختبار آلي" بالمستوى الكافي لمهمة قادمة'},
  {program:'مهارات القيادة للمشرفين', user:'فاطمة العمري', source:'manual', date:'بدأ 1 يونيو', reason:'أضافها المدير كخطة تطوير مهني'},
];

const skillsList = ['تصميم واجهات','Node.js','اختبار آلي','إعداد روبوت محادثة','دعم العملاء'];

const bsc = [
  {name:'Financial', ar:'مالي', pct:55, color:'exec'},
  {name:'Customer', ar:'عملاء', pct:68, color:'good'},
  {name:'Internal', ar:'عمليات داخلية', pct:60, color:'res'},
  {name:'Growth', ar:'تعلّم ونمو', pct:72, color:'plan'},
];

const risks = [
  {title:'تأخر مورد خدمة الاستضافة', cat:'تشغيلي', l:4, i:4, status:'mitigating', project:'تطبيق الجوّال'},
  {title:'نقص مهارة الاختبار الآلي بالفريق', cat:'تقني', l:5, i:4, status:'open', project:'تطبيق الجوّال'},
  {title:'تجاوز ميزانية التراخيص', cat:'مالي', l:2, i:3, status:'open', project:'تطبيق الجوّال'},
];

function fit(member, task){
  const availability = member.onLeave ? 55 : 100;
  const lvl = member.skills[task.skill] || 0;
  let skill = lvl===0 ? 25 : Math.min(100, Math.round((lvl/(task.minLevel||1))*70) + (lvl>=task.minLevel?30:0));
  skill = Math.min(skill,100);
  const track = member.track;
  const score = Math.round(availability*0.4 + skill*0.4 + track*0.2);
  return {score, availability, skill, track};
}
