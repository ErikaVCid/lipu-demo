    +'</div>'
    +'<div class="g2">'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">Score de conducción — últimos 6 meses</div><div class="cs">Promedio flota completa · 1,284 unidades</div></div></div><div style="position:relative;height:210px"><canvas id="c-score-line" role="img" aria-label="Score promedio">Score 71 a 83</canvas></div></div>'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">Siniestros 2024 vs 2025</div><div class="cs">Reducción acumulada del 41%</div></div></div><div style="position:relative;height:210px"><canvas id="c-sin-bar" role="img" aria-label="Siniestros">Reducción 41%</canvas></div></div>'
    +'</div>'
    +'<div class="g3">'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">Cumplimiento por gerencia</div><div class="cs">KPI vs meta 85%</div></div></div>'
    +['Carmen Vega|Norte|79|34','Marco Delgado|Centro|68|82','Patricia Juárez|Sur|71|26'].map(function(r){
      var p=r.split('|');var pct=parseInt(p[2]);
      return '<div class="row-item"><div style="min-width:90px;font-size:0.79rem;font-weight:500">'+p[0]+'</div>'+pill('p-bl',p[1])+'<div style="flex:1;margin:0 8px">'+pbar(pct)+'</div><span style="font-family:Syne,sans-serif;font-weight:700;font-size:0.8rem;color:'+cl(pct)+'">'+pct+'%</span><span class="pill '+(pct<75?'p-dn':'p-am')+'" style="margin-left:6px;font-size:0.62rem">'+p[3]+' venc.</span></div>';
    }).join('')
    +'</div>'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">Distribución de scores</div><div class="cs">Por categoría de riesgo</div></div></div><div style="position:relative;height:180px"><canvas id="c-dist" role="img" aria-label="Distribución">Bajo 58%</canvas></div></div>'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">Rotación de conductores</div><div class="cs">Antes vs con Lipu</div></div></div><div style="position:relative;height:180px"><canvas id="c-rot" role="img" aria-label="Rotación">Rotación 3.1%</canvas></div></div>'
    +'</div></div></div>';
}

/* --- GERENTE (Cristina Mora) --- */
function pageGerente(u){
  var zona=u.zona||'Norte';
  var myC=coordsForZona(zona);
  var totalOps=myC.reduce(function(s,c){return s+c.ops;},0);
  var avgC=Math.round(myC.reduce(function(s,c){return s+c.cumpl;},0)/myC.length);
  var tVenc=myC.reduce(function(s,c){return s+c.venc;},0);
  var top=myC.slice().sort(function(a,b){return b.pts-a.pts;})[0];
  return '<div class="page" id="p-gerente"><div class="pi">'
    +'<div class="hero-dark"><div class="hero-label">GERENTE RH TIJUANA · ZONA '+zona.toUpperCase()+'</div><div class="hero-title">Bienvenida, Cristina</div><div class="hero-sub">'+u.name+' · '+myC.length+' coordinadores a tu cargo · '+totalOps+' operadores</div></div>'
    +'<div class="g4">'
    +kpi('Operadores en mi zona',totalOps,''+myC.length+' coordinadores','neu')
    +kpi('Cumplimiento promedio','<span style="color:'+cl(avgC)+'">'+avgC+'%</span>','Meta: 85%',avgC>=85?'up':'dn')
    +kpi('Cursos vencidos en zona','<span style="color:var(--red)">'+tVenc+'</span>','▼ Intervención requerida','dn')
    +kpi('Líder del mes',top?top.name:'—',top?(top.pts.toLocaleString()+' pts'):'','neu')
    +'</div>'
    +'<div class="g2">'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">Score de conducción — 6 meses</div><div class="cs">Zona '+zona+'</div></div></div><div style="position:relative;height:200px"><canvas id="c-score-line" role="img" aria-label="Score">Score flota</canvas></div></div>'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">Mis coordinadores — Zona '+zona+'</div><div class="cs">Desempeño y cumplimiento</div></div></div>'
    +myC.map(function(c){
      return '<div class="row-item"><div style="width:26px;height:26px;border-radius:50%;background:'+cl(c.cumpl)+'20;display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:'+cl(c.cumpl)+';flex-shrink:0">'+c.id+'</div>'
        +'<div style="flex:1"><div style="font-size:0.79rem;font-weight:500">Coord. '+c.name+'</div>'
        +'<div style="display:flex;align-items:center;gap:5px;margin-top:2px">'+pbar(c.cumpl)+'<span style="font-size:0.7rem;font-weight:600;color:'+cl(c.cumpl)+'">'+c.cumpl+'%</span></div></div>'
        +'<div style="text-align:right;font-size:0.67rem;color:var(--muted)">'+c.ops+' ops</div>'
        +(c.venc>0?pill('p-dn',c.venc+' venc.'):pill('p-ok','Ok'))
        +'</div>';
    }).join('')
    +'</div></div>'
    +'<div class="card"><div class="card-hd"><div><div class="ct">Ranking de mi equipo — Zona '+zona+'</div><div class="cs">Top 5 coordinadores por productividad</div></div></div>'
    +myC.slice(0,5).map(function(c,i){
      var medals=['🥇','🥈','🥉','4°','5°'];
      return '<div class="row-item"><div style="font-size:'+(i<3?'1rem':'0.8rem')+';min-width:22px;text-align:center">'+medals[i]+'</div>'
        +'<div style="flex:1"><div style="font-size:0.79rem;font-weight:500">Coord. '+c.name+'</div><div style="font-size:0.67rem;color:var(--muted)">'+c.ops+' ops · score '+c.score+'</div></div>'
        +'<div style="font-family:Syne,sans-serif;font-weight:800;font-size:0.88rem;color:var(--lime-dk)">'+c.pts.toLocaleString()+' pts</div></div>';
    }).join('')
    +'</div></div></div>';
}

/* --- ORG GERENTE --- */
function pageOrgGerente(u){
  var zona=u?u.zona||'Norte':'Norte';
  var myC=coordsForZona(zona);
  var totalOps=myC.reduce(function(s,c){return s+c.ops;},0);
  return '<div class="page" id="p-org-gerente"><div class="pi">'
    +'<div class="g4">'
    +kpi('Mis coordinadores',myC.length,'Zona '+zona,'neu')
    +kpi('Total operadores',totalOps,'En mi zona','neu')
    +kpi('Cumpl. promedio',Math.round(myC.reduce(function(s,c){return s+c.cumpl;},0)/myC.length)+'%','Meta: 85%','neu')
    +kpi('Cursos vencidos',myC.reduce(function(s,c){return s+c.venc;},0),'En mi zona','dn')
    +'</div>'
    +'<div class="card"><div class="card-hd"><div><div class="ct">Estructura de mi equipo — Zona '+zona+'</div><div class="cs">Coordinadores y operadores a tu cargo</div></div></div>'
    +'<div style="display:flex;justify-content:center;margin-bottom:1rem"><div style="background:var(--black);border-radius:4px;padding:0.75rem 1.5rem;text-align:center;border-bottom:2px solid var(--lime)"><div style="font-size:0.58rem;color:rgba(208,223,0,0.5);font-family:Syne,sans-serif;font-weight:700;letter-spacing:0.08em;margin-bottom:2px">GERENTE RH TIJUANA</div><div style="font-size:0.84rem;font-weight:500;color:#fff">'+u.name+'</div><div style="font-size:0.64rem;color:rgba(255,255,255,0.35)">'+totalOps+' operadores totales</div></div></div>'
    +'<div style="display:grid;grid-template-columns:repeat('+Math.min(myC.length,4)+',minmax(0,1fr));gap:10px">'
    +myC.map(function(c){
      return '<div style="border:0.5px solid var(--border);border-top:2px solid '+cl(c.cumpl)+';border-radius:4px;padding:0.75rem">'
        +'<div style="font-size:0.6rem;color:var(--muted);font-family:Syne,sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:3px">Coordinador</div>'
        +'<div style="font-size:0.81rem;font-weight:500">Coord. '+c.name+'</div>'
        +'<div style="font-size:0.67rem;color:var(--muted);margin-top:2px">'+c.ops+' operadores</div>'
        +'<div style="display:flex;align-items:center;gap:5px;margin-top:7px">'+pbar(c.cumpl)+'<span style="font-size:0.71rem;font-weight:700;color:'+cl(c.cumpl)+'">'+c.cumpl+'%</span></div>'
        +'<div style="display:flex;gap:4px;margin-top:5px">'+pill('p-am',c.pend+' pend.')+pill('p-dn',c.venc+' venc.')+'</div></div>';
    }).join('')
    +'</div></div></div></div>';
}

/* --- KPIs GERENTE --- */
function pageKpisGerente(u){
  var zona=u?u.zona||'Norte':'Norte';
  return '<div class="page" id="p-kpis-gerente"><div class="pi">'
    +'<div class="g4">'
    +kpi('Meta corporativa','85%','Cumplimiento requerido','neu')
    +kpi('Mejor coord.',coordsForZona(zona)[0]?coordsForZona(zona)[0].name:'—',coordsForZona(zona)[0]?coordsForZona(zona)[0].cumpl+'%':'','up')
    +kpi('Coord. más crítico',coordsForZona(zona).slice().sort(function(a,b){return a.cumpl-b.cumpl;})[0].name,coordsForZona(zona).slice().sort(function(a,b){return a.cumpl-b.cumpl;})[0].cumpl+'%','dn')
    +kpi('Gap vs meta','-'+(85-Math.round(coordsForZona(zona).reduce(function(s,c){return s+c.cumpl;},0)/coordsForZona(zona).length))+'%','Promedio zona','dn')
    +'</div>'
    +'<div class="card"><div class="ct" style="margin-bottom:0.75rem">KPIs detallados — mis coordinadores</div>'
    +'<div class="ovx"><table><thead><tr><th>Coordinador</th><th>Ops</th><th>Completados</th><th>Pendientes</th><th>Vencidos</th><th>Score</th><th>Cumplimiento</th><th>Estado KPI</th></tr></thead><tbody id="kpi-g-tbody"></tbody></table></div>'
    +'</div></div></div>';
}

/* --- ORG GENERAL --- */
function pageOrg(){
  return '<div class="page" id="p-org"><div class="pi">'
    +'<div class="g4">'
    +kpi('Total operadores','1,284','3 gerentes · 18 coordinadores','neu')
    +kpi('Cumplimiento global','74%','▲ +8% vs trimestre','up')
    +kpi('Cursos vencidos','<span style="color:var(--red)">142</span>','▼ Acción inmediata','dn')
    +kpi('Próx. a vencer (7d)','<span style="color:var(--amber)">89</span>','Preventivo','neu')
    +'</div>'
    +'<div class="card"><div class="card-hd"><div><div class="ct">Árbol organizacional — selecciona un gerente</div><div class="cs">Lipu Movilidad de Personas · Estructura completa</div></div></div>'
    +'<div style="display:flex;justify-content:center;margin-bottom:1rem"><div style="background:var(--black);border-radius:4px;padding:0.75rem 1.5rem;text-align:center;border-bottom:2px solid var(--lime)"><div style="font-size:0.58rem;color:rgba(208,223,0,0.5);font-family:Syne,sans-serif;font-weight:700;letter-spacing:0.08em;margin-bottom:2px">DIRECCIÓN</div><div style="font-size:0.84rem;font-weight:500;color:#fff">Graciela Méndez</div><div style="font-size:0.64rem;color:rgba(255,255,255,0.35)">1,284 operadores · 74% cumplimiento</div></div></div>'
    +'<div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap" id="gerentes-row">'
    +[['Carmen Vega','Norte',79,412,4],['Marco Delgado','Centro',68,532,7],['Patricia Juárez','Sur',71,340,7]].map(function(g,i){
      return '<div class="card" style="min-width:175px;cursor:pointer;margin-bottom:0" id="g-node-'+i+'" onclick="selG('+i+')">'
        +'<div style="font-size:0.6rem;color:var(--blue);font-family:Syne,sans-serif;font-weight:700;letter-spacing:0.07em;margin-bottom:3px">GERENTE ZONA '+g[1].toUpperCase()+'</div>'
        +'<div style="font-size:0.81rem;font-weight:500">'+g[0]+'</div>'
        +'<div style="font-size:0.67rem;color:var(--muted)">'+g[3]+' ops · '+g[4]+' coords</div>'
        +'<div class="pbar" style="margin-top:7px"><div class="pfill" style="width:'+g[2]+'%;background:'+cl(g[2])+'"></div></div>'
        +'<div style="font-size:0.67rem;color:'+cl(g[2])+';margin-top:2px;font-weight:600">'+g[2]+'%</div>'
        +'</div>';
    }).join('')
    +'</div>'
    +'<div id="coord-panel" style="margin-top:1rem"></div>'
    +'</div></div></div>';
}
var GD={
  0:{coords:[{n:'A. Hernández',ops:105,pct:91,pend:8,venc:1},{n:'B. Ríos',ops:98,pct:84,pend:14,venc:6},{n:'C. Moreno',ops:112,pct:77,pend:22,venc:12},{n:'D. Salcedo',ops:97,pct:63,pend:31,venc:15}]},
  1:{coords:[{n:'E. Garza',ops:78,pct:88,pend:8,venc:2},{n:'F. Mora',ops:82,pct:61,pend:28,venc:19},{n:'G. Téllez',ops:71,pct:55,pend:31,venc:22},{n:'H. Nava',ops:88,pct:72,pend:21,venc:9},{n:'I. Padilla',ops:76,pct:69,pend:20,venc:11},{n:'J. Castro',ops:69,pct:74,pend:16,venc:8},{n:'K. Fuentes',ops:68,pct:58,pend:26,venc:11}]},
  2:{coords:[{n:'L. Vargas',ops:52,pct:82,pend:8,venc:3},{n:'M. Ochoa',ops:48,pct:78,pend:9,venc:4},{n:'N. Ibarra',ops:51,pct:65,pend:16,venc:9},{n:'O. Reyes',ops:47,pct:70,pend:12,venc:6},{n:'P. Aguilar',ops:44,pct:58,pend:17,venc:10}]}
};
function selG(i){
  document.querySelectorAll('[id^="g-node-"]').forEach(function(el,j){el.style.borderColor=j===i?'var(--lime)':'var(--border)';el.style.background=j===i?'var(--lime-bg)':'var(--card)';});
  var cs=GD[i].coords;var cp=document.getElementById('coord-panel');if(!cp)return;
  cp.innerHTML='<div style="font-family:Syne,sans-serif;font-weight:700;font-size:0.7rem;color:var(--muted);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:8px">Coordinadores</div>'
    +'<div style="display:grid;grid-template-columns:repeat('+Math.min(cs.length,4)+',minmax(0,1fr));gap:8px">'
    +cs.map(function(c){
      return '<div style="border:0.5px solid var(--border);border-radius:4px;padding:0.75rem">'
        +'<div style="font-size:0.6rem;color:var(--muted);font-family:Syne,sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:3px">Coordinador</div>'
        +'<div style="font-size:0.8rem;font-weight:500">Coord. '+c.n+'</div>'
        +'<div style="font-size:0.67rem;color:var(--muted)">'+c.ops+' operadores</div>'
        +'<div style="display:flex;align-items:center;gap:5px;margin-top:7px">'+pbar(c.pct)+'<span style="font-size:0.7rem;font-weight:700;color:'+cl(c.pct)+'">'+c.pct+'%</span></div>'
        +'<div style="display:flex;gap:4px;margin-top:5px">'+pill('p-am',c.pend+' pend.')+pill('p-dn',c.venc+' venc.')+'</div></div>';
    }).join('')
    +'</div>';
}

/* --- KPIs GENERAL --- */
function pageKpis(){
  return '<div class="page" id="p-kpis"><div class="pi">'
    +'<div class="g4">'
    +kpi('Meta corporativa','85%','Cumplimiento requerido','neu')
    +kpi('Mejor gerencia','79%','Zona Norte · C. Vega','neu')
    +kpi('Gerencia crítica','<span style="color:var(--red)">68%</span>','▼ Zona Centro','dn')
    +kpi('Gap vs meta','-11%','▼ Promedio flota','dn')
    +'</div>'
    +'<div class="g2"><div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">KPI coordinadores — Zona Norte</div><div class="cs">Meta: 85%</div></div></div><div style="position:relative;height:200px"><canvas id="c-kpi-norte" role="img" aria-label="KPI Norte">KPI Norte</canvas></div></div>'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">KPI coordinadores — Zona Centro</div><div class="cs">Meta: 85%</div></div></div><div style="position:relative;height:200px"><canvas id="c-kpi-centro" role="img" aria-label="KPI Centro">KPI Centro</canvas></div></div></div>'
    +'<div class="card"><div class="card-hd"><div><div class="ct">Detalle KPIs — todos los coordinadores</div><div class="cs">Completados, pendientes y vencidos</div></div>'
    +'<select id="filt-g" onchange="renderKpiTable()" style="font-size:0.75rem"><option value="">Todos</option><option>Norte</option><option>Centro</option><option>Sur</option></select></div>'
    +'<div class="ovx"><table><thead><tr><th>Coordinador</th><th>Zona</th><th>Ops</th><th>Completados</th><th>Pendientes</th><th>Vencidos</th><th>Score</th><th>Cumplimiento</th><th>KPI</th></tr></thead><tbody id="kpi-tbody"></tbody></table></div>'
    +'</div></div></div>';
}

/* --- PENDIENTES --- */
function pagePendientes(){
  return '<div class="page" id="p-pendientes"><div class="pi">'
    +'<div class="g4">'
    +kpi('Vencidos','<span style="color:var(--red)">142</span>','▼ Acción inmediata','dn')
    +kpi('Vencen en 7 días','<span style="color:var(--amber)">89</span>','Seguimiento urgente','neu')
    +kpi('Vencen en 30 días','214','Preventivo','neu')
    +kpi('Reincidentes','<span style="color:var(--red)">23</span>','▼ 2do incumplimiento','dn')
    +'</div>'
    +'<div class="card"><div class="card-hd"><div><div class="ct">Operadores con capacitaciones vencidas o por vencer</div><div class="cs">Ordenado por urgencia</div></div>'
    +'<div style="display:flex;gap:6px;flex-wrap:wrap">'
    +'<input type="text" placeholder="Buscar operador..." id="pend-q" oninput="renderPend()" style="width:150px">'
    +'<select id="pend-urg" onchange="renderPend()"><option value="">Todas</option><option value="Vencido">Vencido</option><option value="7d">7 días</option><option value="30d">30 días</option></select>'
    +'</div></div>'
    +'<div class="ovx"><table><thead><tr><th>Operador</th><th>ID</th><th>Curso</th><th>Coordinador</th><th>Fecha límite</th><th>Días</th><th>Estado</th></tr></thead><tbody id="pend-tbody"></tbody></table></div>'
    +'</div></div></div>';
}

/* --- PENDIENTES COORD --- */
function pagePendCoord(u){
  return '<div class="page" id="p-pend-coord"><div class="pi">'
    +'<div class="g4">'
    +kpi('Vencidos en mi equipo','<span style="color:var(--red)">6</span>','▼ Intervención inmediata','dn')
    +kpi('Vencen en 7 días','<span style="color:var(--amber)">8</span>','Urgente','neu')
    +kpi('Mis operadores total',myOps().length,'Bajo mi coordinación','neu')
    +kpi('Cumplimiento equipo','84%','▲ Mi equipo','up')
    +'</div>'
    +'<div class="card"><div class="card-hd"><div><div class="ct">Capacitaciones pendientes de mi equipo</div><div class="cs">Solo mis operadores</div></div>'
    +'<select id="pend-urg" onchange="renderPend()"><option value="">Todas</option><option value="Vencido">Vencido</option><option value="7d">7 días</option><option value="30d">30 días</option></select>'
    +'</div>'
    +'<div class="ovx"><table><thead><tr><th>Operador</th><th>ID</th><th>Curso</th><th>Fecha límite</th><th>Días</th><th>Estado</th></tr></thead><tbody id="pend-tbody"></tbody></table></div>'
    +'</div></div></div>';
}

/* --- ALERTAS COORD --- */
function pageAlertasCoord(){
  return '<div class="page" id="p-alertas-coord"><div class="pi">'
    +'<div class="g4">'
    +kpi('Alertas activas','<span style="color:var(--red)">5</span>','Requieren acción','dn')
    +kpi('Críticas','3','Hoy','dn')
    +kpi('Urgentes','2','Esta semana','neu')
    +kpi('Resueltas este mes','14','▲ +4 vs mes ant.','up')
    +'</div>'
    +'<div style="margin-bottom:1rem">'
    +[['var(--red)','var(--rbg)','rgba(226,75,74,0.3)','✗','3 capacitaciones vencidas — Riesgo legal','R. Ramírez: Primeros aux. (45d), Fatiga (24d), Materiales (5d)','Hoy','p-dn'],
      ['var(--red)','var(--rbg)','rgba(226,75,74,0.3)','!','Score crítico: R. Ramírez 52/100','23 eventos de riesgo. Coaching inmediato requerido.','Hoy','p-dn'],
      ['var(--red)','var(--rbg)','rgba(226,75,74,0.3)','🧪','Antidoping: R. Ramírez — vence en 18 días','Programar examen antes del 3 de mayo.','18d','p-dn'],
      ['var(--amber)','var(--abg)','rgba(186,117,23,0.3)','⚠','2 quejas de servicio sin resolver','Puntualidad (10 Abr) y limpieza de unidad (08 Abr).','5d','p-am'],
      ['var(--amber)','var(--abg)','rgba(186,117,23,0.3)','📋','Certificado de conducción vencido','Venció el 15 de marzo. Requiere renovación.','Venc.','p-am']
    ].map(function(a){
      return '<div class="alert-bar" style="background:'+a[1]+';border:1px solid '+a[2]+'">'
        +'<div class="ai" style="background:'+a[0]+';color:white">'+a[3]+'</div>'
        +'<div style="flex:1"><div style="font-weight:600;font-size:0.79rem;color:#A32D2D">'+a[4]+'</div>'
        +'<div style="font-size:0.7rem;color:#A32D2D;margin-top:1px;opacity:0.8">'+a[5]+'</div></div>'
        +pill(a[7],a[6])+'</div>';
    }).join('')
    +'</div>'
    +'<div class="card"><div class="ct" style="margin-bottom:0.75rem">Historial de alertas — últimos 90 días</div>'
    +'<div class="ovx"><table><thead><tr><th>Fecha</th><th>Tipo</th><th>Categoría</th><th>Acción tomada</th><th>Estado</th></tr></thead><tbody>'
    +[['15 Abr','Cursos vencidos','p-dn','Normatividad','Pendiente','p-dn','Activa'],
      ['12 Abr','Score crítico','p-dn','Seguridad','Pendiente','p-dn','Activa'],
      ['08 Abr','Disciplinario','p-am','Conducta','Amonestación verbal','p-ok','Cerrada'],
      ['22 Mar','Quejas múltiples','p-am','Servicio','Retroalimentación','p-ok','Resuelta']
    ].map(function(r){
      return '<tr><td>'+r[0]+'</td><td style="font-weight:500">'+r[1]+'</td><td>'+pill(r[2],r[3])+'</td><td>'+r[4]+'</td><td>'+pill(r[5],r[6])+'</td></tr>';
    }).join('')
    +'</tbody></table></div></div></div></div>';
}

/* --- CURSOS --- */
function pageCursos(){
  var cc=[['CAP-01','Manejo defensivo','Obligatorio','8h','1 año',1089,195],['CAP-02','Primeros auxilios','Obligatorio','4h','2 años',1142,142],['CAP-03','Normativa SCT 2025','Obligatorio','6h','Anual',874,410],['CAP-04','Seguridad vial','Obligatorio','3h','6 meses',1201,83],['CAP-05','Protocolo emergencias','Obligatorio','5h','1 año',1098,186],['CAP-06','Fatiga al volante','Obligatorio','3h','6 meses',1156,128],['CAP-07','Reglamento interno','Obligatorio','2h','Anual',1241,43],['CAP-08','Manejo de materiales','Obligatorio','4h','1 año',648,102],['CAP-09','Conducción nocturna','Especializado','4h','1 año',389,84],['CAP-10','Atención al pasajero','Especializado','3h','6 meses',892,312]];
  return '<div class="page" id="p-cursos"><div class="pi">'
    +'<div class="g3">'
    +kpi('Cursos activos','14','En el catálogo','neu')
    +kpi('Obligatorios','8','Todos los operadores','neu')
    +kpi('Especializados','6','Según función','neu')
    +'</div>'
    +'<div class="card"><div class="ct" style="margin-bottom:0.75rem">Catálogo de cursos de capacitación</div>'
    +'<div class="ovx"><table><thead><tr><th>Clave</th><th>Nombre</th><th>Tipo</th><th>Duración</th><th>Vigencia</th><th>Completados</th><th>Pendientes</th></tr></thead><tbody>'
    +cc.map(function(c){return '<tr><td style="font-family:Syne,sans-serif;font-weight:700;font-size:0.67rem;color:var(--muted)">'+c[0]+'</td><td style="font-weight:500">'+c[1]+'</td><td>'+pill(c[2]==='Obligatorio'?'p-dn':'p-bl',c[2])+'</td><td>'+c[3]+'</td><td>'+c[4]+'</td><td>'+c[5].toLocaleString()+'</td><td style="color:var(--red)">'+c[6]+'</td></tr>';}).join('')
    +'</tbody></table></div></div></div></div>';
}

/* --- RANKING COORD --- */
function pageRanking(){
  var top3=[1,0,2].map(function(i){return CR[i];});
  var medals=[{css:'gold',ico:'🥇',color:'var(--lime)'},{css:'silver',ico:'🥈',color:'#97999B'},{css:'bronze',ico:'🥉',color:'#B5BD00'}];
  return '<div class="page" id="p-ranking-coord"><div class="pi">'
    +'<div class="hero-dark">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">'
    +'<div><div class="hero-label">COMPETENCIA INTERNA · LIPU MOVILIDAD</div><div class="hero-title">Ranking de coordinadores</div><div class="hero-sub">Productividad, cumplimiento y desempeño · Actualización mensual</div></div>'
    +'<div style="background:rgba(208,223,0,0.08);border:1px solid rgba(208,223,0,0.2);border-radius:4px;padding:0.75rem 1.25rem;text-align:center"><div style="font-size:0.58rem;color:rgba(208,223,0,0.5);letter-spacing:0.08em;text-transform:uppercase;font-family:Syne,sans-serif;font-weight:700;margin-bottom:2px">Corte actual</div><div style="font-family:Syne,sans-serif;font-weight:800;font-size:0.88rem;color:var(--lime)">Abril 2025</div></div>'
    +'</div></div>'
    +'<div class="podium-grid">'
    +top3.map(function(c,idx){
      var m=medals[idx];
      return '<div class="podium-card '+m.css+'">'
        +'<div style="font-size:1.6rem;margin-bottom:6px">'+m.ico+'</div>'
        +'<div style="width:40px;height:40px;border-radius:50%;background:'+cl(c.cumpl)+'20;display:flex;align-items:center;justify-content:center;font-family:Syne,sans-serif;font-weight:800;font-size:0.76rem;color:'+cl(c.cumpl)+';margin:0 auto 7px">'+c.id+'</div>'
        +'<div style="font-family:Syne,sans-serif;font-weight:800;font-size:0.86rem">Coord. '+c.name+'</div>'
        +'<div style="font-size:0.67rem;color:var(--muted);margin-top:2px">Zona '+c.zona+' · '+c.ops+' ops</div>'
        +'<div style="font-family:Syne,sans-serif;font-weight:800;font-size:1.25rem;color:var(--lime-dk);margin-top:8px">'+c.pts.toLocaleString()+'</div>'
        +'<div style="font-size:0.63rem;color:var(--muted)">puntos</div>'
        +'<div style="display:flex;justify-content:center;gap:5px;margin-top:8px">'+pill('p-ok',c.cumpl+'% cumpl.')+pill('p-bl','Score '+c.score)+'</div>'
        +'</div>';
    }).join('')
    +'</div>'
    +'<div class="card">'
    +'<div class="card-hd"><div><div class="ct">Clasificación completa — 18 coordinadores</div><div class="cs">Ordenado por puntos de productividad</div></div>'
    +'<select id="rank-zona" onchange="filterRanking()" style="font-size:0.75rem"><option value="">Todas las zonas</option><option>Norte</option><option>Centro</option><option>Sur</option></select></div>'
    +'<div class="ovx"><table><thead><tr><th>Pos.</th><th>Cambio</th><th>Coordinador</th><th>Zona</th><th>Cumplimiento</th><th>Score</th><th>Vencidos</th><th>Puntos</th></tr></thead><tbody id="rank-tbody">'+buildRankingRows(CR)+'</tbody></table></div>'
    +'</div>'
    +'<div class="card" style="background:var(--black);border:0.5px solid rgba(208,223,0,0.15)">'
    +'<div class="ct" style="color:#fff;margin-bottom:0.875rem">¿Cómo ganan puntos los coordinadores?</div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'
    +[['📈','Cada 1% de cumplimiento','50 pts',false],['⭐','Operador con score +90','10 pts/op',false],['📚','Curso completado en equipo','30 pts',false],['🚫','Cero vencidos en el mes','500 pts bonus',false],['🏆','Top 3 del mes','300 pts extra',false],['📉','Curso vencido en equipo','-20 pts',true]].map(function(r){
      return '<div style="background:rgba(255,255,255,0.05);border-radius:4px;padding:0.65rem;display:flex;align-items:center;gap:8px"><div style="font-size:1.1rem;flex-shrink:0">'+r[0]+'</div><div><div style="font-size:0.72rem;color:rgba(255,255,255,0.65)">'+r[1]+'</div><div style="font-family:Syne,sans-serif;font-weight:800;font-size:0.85rem;color:'+(r[3]?'var(--red)':'var(--lime)')+'">'+r[2]+'</div></div></div>';
    }).join('')
    +'</div></div></div></div>';
}

/* --- COORD HOME --- */
function pageCoordHome(u){
  var me=myCoordData();var mypool=myOps();
  var atRisk=mypool.filter(function(o){return o.status!=='Al corriente';});
  var top5=mypool.slice().sort(function(a,b){return b.pts-a.pts;}).slice(0,5);
  var leader=CR[0];
  return '<div class="page" id="p-coord-home"><div class="pi">'
    +'<div class="hero-dark" style="display:flex;gap:1.5rem;flex-wrap:wrap">'
    +'<div style="flex:1;min-width:200px">'
    +'<div class="hero-label">MI PANEL DE COORDINADOR · LIPU MOVILIDAD</div>'
    +'<div class="hero-title">'+u.name+'</div>'
    +'<div class="hero-sub">'+u.role+' · '+mypool.length+' operadores a mi cargo</div>'
    +'<div style="display:flex;gap:1.5rem;margin-top:0.875rem;padding-top:0.875rem;border-top:1px solid rgba(255,255,255,0.08);flex-wrap:wrap">'
    +'<div class="hero-stat"><div class="hero-stat-n">'+me.pts.toLocaleString()+'</div><div class="hero-stat-l">Puntos este mes</div></div>'
    +'<div class="hero-stat"><div class="hero-stat-n" style="color:'+cl(me.cumpl)+'">'+me.cumpl+'%</div><div class="hero-stat-l">Cumplimiento</div></div>'
    +'<div class="hero-stat"><div class="hero-stat-n">'+me.rank+'°</div><div class="hero-stat-l">Ranking</div></div>'
    +'<div class="hero-stat"><div class="hero-stat-n" style="color:'+cl(me.score)+'">'+me.score+'</div><div class="hero-stat-l">Score promedio</div></div>'
    +'</div></div>'
    +'<div style="background:rgba(208,223,0,0.08);border:1px solid rgba(208,223,0,0.2);border-radius:4px;padding:0.875rem 1rem;flex-shrink:0;min-width:155px;text-align:center">'
    +'<div style="font-size:0.58rem;color:rgba(208,223,0,0.5);font-family:Syne,sans-serif;font-weight:700;letter-spacing:0.07em;margin-bottom:5px">PARA SER #1</div>'
    +'<div style="font-family:Syne,sans-serif;font-weight:800;font-size:1.3rem;color:var(--lime)">'+(leader.pts-me.pts).toLocaleString()+'</div>'
    +'<div style="font-size:0.68rem;color:rgba(255,255,255,0.35);margin-top:2px">pts de diferencia con</div>'
    +'<div style="font-size:0.72rem;color:rgba(255,255,255,0.55);margin-top:1px">Coord. '+leader.name+'</div>'
    +'<div class="pbar" style="margin-top:8px;height:5px"><div class="pfill" style="width:'+Math.round(me.pts/leader.pts*100)+'%;background:var(--lime)"></div></div>'
    +'</div></div>'
    +'<div class="g4">'
    +kpi('Mis operadores',mypool.length,'Bajo mi coordinación','neu')
    +kpi('Al corriente',mypool.filter(function(o){return o.status==='Al corriente';}).length,'▲ Sin pendientes','up')
    +kpi('Con pendientes/vencidos','<span style="color:var(--red)">'+atRisk.length+'</span>','▼ Requieren acción','dn')
    +kpi('Score promedio',me.score,'Meta: 80 pts',me.score>=80?'up':'dn')
    +'</div>'
    +'<div class="g2">'
    +'<div class="card" style="margin-bottom:0"><div class="card-hd"><div><div class="ct">Mis operadores</div><div class="cs">Solo tu equipo · '+mypool.length+' conductores</div></div>'
    +'<input type="text" id="ops-search" placeholder="Buscar..." oninput="filterOps()" style="width:110px"></div>'
    +'<div id="ops-list" style="max-height:400px;overflow-y:auto"></div></div>'
    +'<div>'
    +'<div class="card" style="margin-bottom:1rem"><div class="card-hd"><div><div class="ct">Alertas de tu equipo</div><div class="cs">Requieren atención hoy</div></div></div>'
    +(atRisk.length===0?'<div style="text-align:center;padding:1rem;font-size:0.8rem;color:var(--green)">✓ Todo al corriente en tu equipo</div>'
    :atRisk.slice(0,5).map(function(o){return '<div class="notif-row"><div class="ndot" style="background:'+(o.status==='Vencido'?'var(--red)':'var(--amber)')+'"></div><div style="flex:1"><div style="font-size:0.77rem;font-weight:500">'+o.nombre+' — '+o.status+'</div><div style="font-size:0.67rem;color:var(--muted)">'+o.id+' · Score: '+o.score+'</div></div>'+pill(o.status==='Vencido'?'p-dn':'p-am',o.status)+'</div>';}).join(''))
    +'</div>'
    +'<div class="card" style="margin-bottom:0"><div class="ct" style="margin-bottom:0.5rem">Top 5 — mis mejores operadores</div>'
    +top5.map(function(o,i){return '<div class="rank-row"><div style="font-family:Syne,sans-serif;font-weight:800;font-size:0.77rem;color:var(--muted);min-width:14px">'+(i+1)+'</div><div style="flex:1;font-size:0.78rem;font-weight:500">'+o.nombre+'</div><div class="pbar" style="flex:1;margin:0 8px"><div class="pfill" style="width:'+Math.round(o.pts/4820*100)+'%;background:var(--lime)"></div></div><div style="font-family:Syne,sans-serif;font-weight:700;font-size:0.77rem">'+o.pts.toLocaleString()+'</div></div>';}).join('')
    +'</div></div></div></div></div>';
}

/* --- MIS OPS (coord detail) --- */
function pageMisOps(u){
  var mypool=myOps();
  return '<div class="page" id="p-mis-ops"><div class="pi">'
    +'<div class="g4">'
    +kpi('Mis operadores',mypool.length,'Solo tu equipo','neu')
    +kpi('Al corriente',mypool.filter(function(o){return o.status==='Al corriente';}).length,'▲ del total','up')
    +kpi('Score promedio',Math.round(mypool.reduce(function(s,o){return s+o.score;},0)/mypool.length),'Meta: 80','neu')
    +kpi('Pts Rewards',mypool.reduce(function(s,o){return s+o.pts;},0).toLocaleString(),'Emitidos este mes','neu')
    +'</div>'
    +'<div class="card"><div class="card-hd"><div><div class="ct">Directorio de mis operadores</div><div class="cs">Equipo completo bajo tu coordinación</div></div>'
    +'<div style="display:flex;gap:6px"><input type="text" id="ops-search" placeholder="Buscar..." oninput="filterOps()" style="width:130px"><select id="ops-filter" onchange="filterOps()"><option value="">Todos</option><option>Al corriente</option><option>Pendiente</option><option>Vencido</option></select></div></div>'
    +'<div id="ops-list2" style="max-height:520px;overflow-y:auto"></div>'
    +'</div></div></div>';
}

/* ===== CONDUCTOR PAGES ===== */
function pageDashCond(u){
