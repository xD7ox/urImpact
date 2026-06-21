/* ====================== YourImpact — app logic ====================== */
const $ = s => document.querySelector(s);
const ring = (pct,c,soft) => `background:conic-gradient(${c} ${pct*3.6}deg, ${soft} 0);`;
const stMeta = s => s==='done'?{l:'مكتملة',c:'good'}: s==='late'?{l:'متأخرة',c:'warn'}:{l:'قيد التنفيذ',c:'exec'};

/* nav */
document.querySelectorAll('.nav2').forEach(el=> el.addEventListener('click',()=>{
  document.querySelectorAll('.nav2').forEach(n=>n.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  $('#v-'+el.dataset.v).classList.add('active');
}));

/* workspace select */
const wsSel = $('#wsSel');
function fillWs(){ wsSel.innerHTML = workspaces.map(w=>`<option value="${w.id}">${w.icon} ${w.name}</option>`).join(''); }
fillWs();

/* builder modal */
const ovBuild = $('#ovBuild'); let bType='project';
$('#newWs').addEventListener('click',()=>ovBuild.classList.add('open'));
$('#cancelBuild').addEventListener('click',()=>ovBuild.classList.remove('open'));
document.querySelectorAll('.t-opt').forEach(o=>o.addEventListener('click',()=>{
  document.querySelectorAll('.t-opt').forEach(x=>x.classList.remove('sel'));
  o.classList.add('sel'); bType=o.dataset.t;
}));
$('#doCreate').addEventListener('click',()=>{
  const name = $('#wsName').value.trim(); if(!name){ $('#wsName').focus(); return; }
  const id='ws'+(workspaces.length+1);
  workspaces.push({id,name,type:bType,icon:bType==='project'?'📁':'🔁'});
  fillWs(); wsSel.value=id; $('#wsName').value=''; ovBuild.classList.remove('open');
});

/* dashboard */
function dash(){
  const late = tasks.filter(t=>t.status==='late').length;
  const openR = rfqs.filter(r=>r.status!=='closed').length;
  const crit = risks.filter(r=>r.l*r.i>=16).length;
  $('#kpis').innerHTML = `
    <div class="card kpi"><div class="n">${tasks.length}</div><div class="l">إجمالي المهام</div></div>
    <div class="card kpi"><div class="n" style="color:${C.warn}">${late}</div><div class="l">مهام متأخرة</div></div>
    <div class="card kpi"><div class="n">${openR}</div><div class="l">طلبات تسعير مفتوحة</div></div>
    <div class="card kpi"><div class="n" style="color:${C.warn}">${crit}</div><div class="l">مخاطر حرجة</div></div>`;
  if(typeof Chart!=='undefined'){
    new Chart($('#cGoals'),{type:'bar',
      data:{labels:goalsTree.children.flatMap(g=>g.children.map(c=>c.name)),
        datasets:[{data:goalsTree.children.flatMap(g=>g.children.map(c=>c.pct)),
          backgroundColor:goalsTree.children.flatMap(g=>g.children.map(c=>C[c.color])),borderRadius:7,maxBarThickness:40}]},
      options:{plugins:{legend:{display:false}},scales:{y:{max:100,grid:{color:'#EEEBE3'},ticks:{font:{family:'IBM Plex Sans Arabic'}}},x:{grid:{display:false},ticks:{font:{family:'IBM Plex Sans Arabic',size:10}}}}}});
  } else {
    $('#cGoals').outerHTML = goalsTree.children.flatMap(g=>g.children).map(c=>
      `<div style="margin:10px 0"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px"><span>${c.name}</span><span class="mono">${c.pct}%</span></div><div class="track"><div class="fill" style="width:${c.pct}%;background:${C[c.color]}"></div></div></div>`).join('');
  }
  const a=[];
  training.filter(t=>t.source==='auto').forEach(t=>a.push(['res',`فجوة مهارة: ${t.user} يحتاج «${t.program}»`]));
  rfqs.filter(r=>r.status==='open').forEach(r=>a.push(['exec',`طلب تسعير يقترب موعده: ${r.title} (${r.deadline})`]));
  risks.filter(r=>r.l*r.i>=16).forEach(r=>a.push(['warn',`خطر حرج: ${r.title}`]));
  $('#alerts').innerHTML = a.map(([c,t])=>`<div style="display:flex;gap:10px;align-items:flex-start;padding:11px 0;border-bottom:1px solid var(--line);font-size:13px"><span style="width:7px;height:7px;border-radius:50%;background:${C[c]};margin-top:7px;flex:none"></span><span>${t}</span></div>`).join('');
}

/* goals tree */
function node(n){
  return `<div onclick="pickGoal('${n.name}')" style="cursor:pointer;background:#fff;border:1.5px solid var(--line);border-radius:14px;padding:12px 16px;min-width:150px;text-align:center;display:inline-block;margin:7px;transition:transform .14s,border-color .14s" onmouseover="this.style.transform='translateY(-3px)';this.style.borderColor='${C[n.color]}'" onmouseout="this.style.transform='';this.style.borderColor='var(--line)'">
    <div style="width:46px;height:46px;border-radius:50%;margin:0 auto 7px;display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:700;font-family:'JetBrains Mono';${ring(n.pct,C[n.color],S[n.color])}">${n.pct}%</div>
    <div style="font-size:12.5px;font-weight:600;font-family:'Sora'">${n.name}</div></div>`;
}
function tree(){
  const r=goalsTree;
  let h=`<div style="text-align:center">${node(r)}</div><div style="text-align:center;color:var(--line);font-size:18px">⌄</div><div style="display:flex;justify-content:center;flex-wrap:wrap;gap:20px">`;
  r.children.forEach(c=>{
    h+=`<div style="text-align:center">${node(c)}<div style="color:var(--line)">⌄</div><div style="display:flex;flex-wrap:wrap;justify-content:center">${c.children.map(node).join('')}</div></div>`;
  });
  h+=`</div>`; $('#tree').innerHTML=h;
}
window.pickGoal = name=>{
  const linked = tasks.filter(t=>t.goal===name);
  alert(`${name}\n\nالمهام المرتبطة:\n`+(linked.map(t=>`• ${t.title} (${t.progress}%)`).join('\n')||'لا توجد مهام مرتبطة مباشرة.'));
};

/* tasks */
function taskView(){
  $('#taskCard').innerHTML = tasks.map(t=>{
    const m=stMeta(t.status);
    return `<div style="display:grid;grid-template-columns:1fr 110px 120px 150px;align-items:center;gap:14px;padding:14px 4px;border-bottom:1px solid var(--line);font-size:13.5px">
      <div><div style="font-weight:600;font-family:'Sora'">${t.title}</div><div style="font-size:11.5px;color:var(--slate);margin-top:3px">${t.proj} · يتطلب: ${t.skill} (مستوى ${t.minLevel}+)</div></div>
      <span class="mini-pill" style="background:${S[m.c]};color:${C[m.c]}">${m.l}</span>
      <div><div class="track"><div class="fill" style="width:${t.progress}%;background:${C[m.c]}"></div></div><div class="mono" style="font-size:11px;color:var(--slate);margin-top:5px">${t.progress}%</div></div>
      <div>${t.assignee?`<span style="font-size:12.5px">👤 ${t.assignee}</span>`:`<button class="btn btn-dark" style="font-size:12px;padding:8px 13px" onclick="suggest(${t.id})">✦ اقترح الأنسب</button>`}</div>
    </div>`;
  }).join('');
}
const ovSg=$('#ovSuggest');
window.suggest = id=>{
  const t=tasks.find(x=>x.id===id);
  $('#sgTitle').textContent = `مرشّحون لـ: ${t.title}`;
  const scored = team.map(m=>({m,f:fit(m,t)})).sort((a,b)=>b.f.score-a.f.score);
  $('#sgList').innerHTML = scored.map(({m,f})=>{
    const col = f.score>=80?C.good:f.score>=65?C.exec:C.warn;
    return `<div class="cand-row">
      <div class="score" style="background:${col}">${f.score}</div>
      <div class="who"><b>${m.name}</b><span>${m.onLeave?'⚠ إجازة تتقاطع مع المهمة · ':'متاح · '}مهارة ${f.skill}% · سجل ${f.track}%</span></div>
      ${m.onLeave?'<span class="pill warn">تحذير</span>':'<span class="pill ok">جاهز</span>'}
    </div>`;
  }).join('');
  ovSg.classList.add('open');
};
$('#closeSg').addEventListener('click',()=>ovSg.classList.remove('open'));

/* rfq */
function rfqMeta(s){ return s==='closed'?{l:'مُقفل',c:'good'}: s==='comparing'?{l:'قيد المقارنة',c:'res'}:{l:'مفتوح',c:'exec'}; }
function rfqView(){
  $('#rfqGrid').innerHTML = rfqs.map(r=>{
    const m=rfqMeta(r.status);
    return `<div class="card">
      <div class="ctitle"><h3>${r.title}</h3><span class="badge" style="background:${S[m.c]};color:${C[m.c]}">${m.l}</span></div>
      <div style="font-size:12px;color:var(--slate);margin-bottom:13px">مركز التكلفة: ${r.cc}${r.project?` · مشروع: ${r.project}`:''} · الموعد: ${r.deadline}</div>
      ${r.quotes.map(q=>`<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--line);font-size:13px">
        <span>${q.s}</span><span class="mono" style="color:${q.st==='accepted'?C.good:q.st==='rejected'?'var(--slate-2)':'var(--ink)'}">${q.a?q.a.toLocaleString()+' ر.س':'—'} ${q.st==='accepted'?'✓':''}</span></div>`).join('')}
    </div>`;
  }).join('');
}

/* skills + training */
function skillsView(){
  let head=`<tr><th style="padding:9px 12px;text-align:right;font-size:11.5px;color:var(--slate)">الموظف</th>`+
    skillsList.map(s=>`<th style="padding:9px 8px;text-align:center;font-size:11px;color:var(--slate)">${s}</th>`).join('')+`</tr>`;
  let rows=team.map(p=>`<tr><td style="padding:11px 12px;font-size:13px;font-weight:600;font-family:'Sora';white-space:nowrap">${p.name}</td>`+
    skillsList.map(s=>{const lv=p.skills[s]||0;const c=lv===0?'var(--line)':lv<2?C.warn:lv<3?C.res:C.good;
      return `<td style="text-align:center;padding:9px"><span style="display:inline-flex;width:26px;height:26px;border-radius:7px;background:${c};color:#fff;font-size:11px;align-items:center;justify-content:center;font-weight:700;font-family:'JetBrains Mono'">${lv||'·'}</span></td>`;}).join('')+`</tr>`).join('');
  $('#matrix').innerHTML=`<table style="width:100%;border-collapse:collapse">${head}${rows}</table><p style="font-size:11.5px;color:var(--slate);margin-top:10px">المستويات: 1 مبتدئ · 2 متوسط · 3 متقدم · 4 خبير</p>`;
  $('#trainList').innerHTML = training.map(t=>`<div style="padding:14px 4px;border-bottom:1px solid var(--line)">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div><b style="font-family:'Sora';font-size:13.5px">${t.program}</b> <span style="font-size:12px;color:var(--slate)">— ${t.user}</span></div>
      <span class="badge" style="background:${t.source==='auto'?S.res:S.exec};color:${t.source==='auto'?C.res:C.exec}">${t.source==='auto'?'مقترح تلقائيًا':'يدوي'}</span></div>
    <div style="font-size:12px;color:var(--slate);margin-top:5px">${t.reason} · ${t.date}</div></div>`).join('');
}

/* bsc */
function bscView(){
  $('#bscGrid').innerHTML = bsc.map(b=>`<div class="card" style="text-align:center">
    <div class="ctitle" style="justify-content:center"><h3>${b.ar}</h3></div>
    <div style="width:104px;height:104px;border-radius:50%;margin:4px auto 8px;display:flex;flex-direction:column;align-items:center;justify-content:center;${ring(b.pct,C[b.color],S[b.color])}">
      <b class="mono" style="font-size:21px">${b.pct}%</b></div>
    <div style="font-size:11px;color:var(--slate-2);font-family:'JetBrains Mono'">${b.name}</div></div>`).join('');
}

/* risks */
function riskView(){
  $('#riskCard').innerHTML = risks.map(r=>{
    const sc=r.l*r.i; const c=sc>=16?'warn':sc>=9?'res':'good';
    return `<div style="display:grid;grid-template-columns:1fr 90px 120px 90px;align-items:center;gap:14px;padding:14px 4px;border-bottom:1px solid var(--line);font-size:13.5px">
      <div><div style="font-weight:600;font-family:'Sora'">${r.title}</div><div style="font-size:11.5px;color:var(--slate)">${r.project} · ${r.cat}</div></div>
      <span class="mini-pill" style="background:${S[c]};color:${C[c]}">درجة ${sc}</span>
      <div class="mono" style="font-size:11.5px;color:var(--slate)">${r.l} × ${r.i}</div>
      <span class="mini-pill" style="background:var(--bg);color:var(--slate)">${r.status==='open'?'مفتوح':r.status==='mitigating'?'تحت المعالجة':'مُقفل'}</span>
    </div>`;
  }).join('');
}

dash(); tree(); taskView(); rfqView(); skillsView(); bscView(); riskView();
