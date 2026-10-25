(function(){
'use strict';
var A='assets/';
var brl=function(v){return 'R$ '+v.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');};
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
var qs=new URLSearchParams(location.search);

var P={
  kit:{n:'Kit Sutura Pro Medicina',p:379.9,de:449.9,img:A+'kit/01.webp',tipo:'kits',cursos:['medicina','enfermagem'],perso:'med'},
  vet:{n:'Kit Sutura Pro Veterinária',p:379.9,de:449.9,img:A+'p/vet.webp',tipo:'kits',cursos:['veterinaria'],perso:'vet'},
  odonto:{n:'Kit Sutura Pro Odonto',p:297.9,img:A+'p/odonto.webp',tipo:'kits',cursos:['odontologia'],perso:'odonto'},
  semestre:{n:'Kit Semestre Completo',p:499.9,de:659.6,img:A+'p/semestre.webp',tipo:'kits',cursos:['medicina','veterinaria'],perso:'med'},
  estojo:{n:'Estojo inox com gravação',p:239.9,img:A+'p/estojo.webp',tipo:'acessorios',cursos:['medicina','veterinaria','odontologia','enfermagem'],perso:'med'},
  puncao:{n:'Simulador de punção venosa',p:199.9,img:A+'p/puncao.webp',tipo:'simuladores',cursos:['enfermagem','medicina'],cat:'Simulador · Enfermagem',
    d:'Simulador para treinar punção venosa em casa, antes das aulas práticas e do estágio.'},
  coleta:{n:'Simulador de coleta',titulo:'Simulador de coleta SkillMed',p:199.9,img:A+'p/coleta.webp',fotos:[A+'p/coleta.webp',A+'coleta/02.webp',A+'coleta/03.webp',A+'coleta/04.webp'],tipo:'simuladores',cursos:['enfermagem'],nota:'4,8 · 6 avaliações',cat:'Simulador · Enfermagem',
    d:'Simulador anatômico em silicone para treinar coleta de sangue, com camadas de espessura calibrada e resposta tátil próxima à pele humana.',
    caixa:['Simulador de veia realista','Seringas de 10 ml e 1 ml','2 scalps: coleta convencional e a vácuo','Tubo de coleta','Corante simulador de sangue'],caixaT:'O que vem na caixa · 8 peças',
    specs:[['Material','Silicone resistente'],['Uso','Reutilizável e atóxico'],['Conteúdo','8 peças'],['Indicação','Exclusivo para treinamento']]},
  dental:{n:'Simulador dental',p:97.9,img:A+'p/dental.webp',tipo:'simuladores',cursos:['odontologia'],cat:'Simulador · Odontologia',d:'Simulador dental para treinar sutura e procedimentos de odontologia.'},
  pele:{n:'Pele simuladora + 6 fios',titulo:'Pele simuladora SkillMed + 6 fios de nylon de brinde',p:119.9,img:A+'p/pele.webp',tipo:'acessorios',cursos:['medicina','veterinaria','refis'],cat:'Refil · Sutura',
    d:'Pele simuladora com 3 camadas de densidades diferentes, que reproduzem epiderme, derme e hipoderme. Acompanha 6 fios de nylon de brinde.'},
  fios24:{n:'Caixa com 24 fios de nylon 4-0',p:99.9,img:A+'p/fios24.webp',tipo:'acessorios',cursos:['medicina','veterinaria','odontologia','refis'],cat:'Refil · Sutura',d:'Caixa com 24 fios de nylon 4-0 para treino de sutura durante o semestre.'},
  laminas:{n:'Lâminas de bisturi nº 15',p:59.9,img:A+'p/laminas.webp',tipo:'acessorios',cursos:['medicina','veterinaria','refis'],cat:'Refil · Sutura',d:'Caixa de lâminas de bisturi nº 15 para treinamento, compatíveis com cabo nº 3.'},
  fios5:{n:'Kit com 5 fios de nylon 4-0',p:19.9,img:A+'p/fios5.webp',tipo:'acessorios',cursos:['medicina','veterinaria','odontologia','refis'],cat:'Refil · Sutura',d:'Kit com 5 fios de nylon 4-0 para treino de sutura.'}
};
var url=function(id){return P[id].perso?'kit.html?id='+id:'produto.html?id='+id;};

/* carrinho */
var KEY='sm-carrinho-v5';
var cart={get:function(){try{return JSON.parse(localStorage.getItem(KEY))||[];}catch(e){return [];}},
  set:function(c){localStorage.setItem(KEY,JSON.stringify(c));badge();},
  add:function(item){var c=cart.get();var key=item.id+'|'+(item.nome||'')+'|'+(item.arte||'')+'|'+(item.curso||'')+'|'+(item.presente?1:0);
    var f=c.filter(function(x){return x.key===key;})[0];if(f)f.q+=item.q||1;else{item.key=key;item.q=item.q||1;c.push(item);}cart.set(c);}};
function badge(){var n=cart.get().reduce(function(a,i){return a+i.q;},0);$$('[data-count]').forEach(function(b){b.textContent=n;b.hidden=!n;});}
function toast(msg){var t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);}
  t.innerHTML=esc(msg)+' <a href="carrinho.html">Ver carrinho</a>';t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('show');},3200);}
document.addEventListener('click',function(e){var b=e.target.closest('[data-add]');if(!b)return;e.preventDefault();var id=b.getAttribute('data-add');cart.add({id:id,q:1});toast(P[id].n+' adicionado.');});

/* menu */
var dr=$('.drawer');
$$('[data-menu]').forEach(function(b){b.addEventListener('click',function(){dr.classList.toggle('open');});});
if(dr)dr.addEventListener('click',function(e){if(e.target.classList.contains('drawer-bg'))dr.classList.remove('open');});

function card(id){var p=P[id];var u=url(id);
  return '<div class="card"><a class="card-img" href="'+u+'" style="background-image:url('+p.img+')">'+
    (p.de&&p.perso?'<span class="tag tag-top">Economize '+brl(p.de-p.p)+'</span>':'')+
    (p.perso?'<span class="tag tag-bot">Gravação grátis</span>':'')+'</a>'+
    '<div class="card-row"><div style="display:flex;flex-direction:column;gap:4px"><a class="card-name" href="'+u+'">'+esc(p.n)+'</a>'+
    (p.nota?'<span class="stars">★ '+p.nota+'</span>':'')+
    '<span class="card-price"><b>'+brl(p.p)+'</b>'+(p.de?'<s>'+brl(p.de)+'</s>':'')+'</span></div>'+
    (p.perso?'':'<button class="plus" data-add="'+id+'" aria-label="Adicionar '+esc(p.n)+' ao carrinho">+</button>')+'</div>'+
    (p.perso?'<a class="go" href="'+u+'">Personalizar →</a><a class="card-btn" href="'+u+'">Personalizar</a>':'<button class="card-btn add" data-add="'+id+'">Adicionar</button>')+'</div>';}
$$('[data-cards]').forEach(function(el){el.innerHTML=el.getAttribute('data-cards').split(',').map(card).join('');});

/* coleção */
var COLS={todos:['Todos os produtos','Kits de sutura, simuladores, refis e acessórios para estudantes da área da saúde.',A+'col/todos'],
  medicina:['Medicina','Kit de sutura com seu nome gravado no estojo, simulador de punção e refis para o semestre.',A+'col/medicina'],
  veterinaria:['Veterinária','Kit de sutura para veterinária com estojo inox gravado a laser e pele simuladora de brinde.',A+'col/veterinaria'],
  odontologia:['Odontologia','Kit de sutura para odontologia, simulador dental e fios para treinar.',A+'col/odontologia'],
  enfermagem:['Enfermagem','Simuladores de punção venosa e de coleta para treinar o acesso antes do estágio.',A+'col/enfermagem'],
  refis:['Refis e acessórios','Pele simuladora, fios de nylon 4-0 e lâminas nº 15 para continuar treinando.',A+'col/refis']};
var grid=$('[data-colecao]');
if(grid){var st={c:COLS[qs.get('c')]?qs.get('c'):'todos',t:'all'};
  var cc=$('[data-col-chips]'),tt=$('[data-tipos]');
  cc.innerHTML=Object.keys(COLS).map(function(k){return '<button class="chip" data-c="'+k+'">'+(k==='todos'?'Todos':k==='refis'?'Refis':COLS[k][0])+'</button>';}).join('');
  tt.innerHTML=[['all','Tudo'],['kits','Kits'],['simuladores','Simuladores'],['acessorios','Acessórios']].map(function(t){return '<button data-t="'+t[0]+'">'+t[1]+'</button>';}).join('');
  var draw=function(){var col=COLS[st.c];$('[data-col-nome]').textContent=col[0];$$('[data-col-nome2]').forEach(function(e){e.textContent=col[0];});$('[data-col-txt]').textContent=col[1];$('[data-col-img]').style.backgroundImage='url('+col[2]+'.webp)';$('[data-col-img-m]').src=col[2]+'.webp';$('[data-col-img-m]').alt=col[0];
    var ids=Object.keys(P).filter(function(id){var p=P[id];return (st.c==='todos'||p.cursos.indexOf(st.c)>-1)&&(st.t==='all'||p.tipo===st.t);});
    grid.innerHTML=ids.length?ids.map(card).join(''):'<p class="muted" style="grid-column:1/-1;padding:40px 0">Nenhum produto neste filtro.</p>';
    $('[data-n]').textContent=ids.length+(ids.length===1?' produto':' produtos');
    $$('[data-c]',cc).forEach(function(b){b.classList.toggle('on',b.getAttribute('data-c')===st.c);});
    $$('[data-t]',tt).forEach(function(b){b.classList.toggle('on',b.getAttribute('data-t')===st.t);});
    $$('.nav a[data-nav]').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-nav')===st.c);});
    history.replaceState(null,'','?c='+st.c);document.title=col[0]+' | SkillMed';};
  cc.addEventListener('click',function(e){var b=e.target.closest('[data-c]');if(b){st.c=b.getAttribute('data-c');draw();}});
  tt.addEventListener('click',function(e){var b=e.target.closest('[data-t]');if(b){st.t=b.getAttribute('data-t');draw();}});
  draw();}

/* galeria */
function galeria(fotos){var main=$('[data-gal-main]');if(!main)return;var th=$('[data-thumbs]'),dots=$('[data-dots]'),i=0;
  th.innerHTML=fotos.map(function(f,k){return '<button aria-label="Foto '+(k+1)+'" style="background-image:url('+f+')"></button>';}).join('');
  dots.innerHTML=fotos.map(function(f,k){return '<button aria-label="Foto '+(k+1)+'"></button>';}).join('');
  var go=function(k){i=(k+fotos.length)%fotos.length;main.style.backgroundImage='url('+fotos[i]+')';[th,dots].forEach(function(c){$$('button',c).forEach(function(b,j){b.classList.toggle('on',j===i);});});};
  [th,dots].forEach(function(c){c.addEventListener('click',function(e){var b=e.target.closest('button');if(b)go($$('button',c).indexOf(b));});});
  var x0=null;main.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  main.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));x0=null;});
  go(0);}

/* kit personalizado */
var six=function(f){return ['01','02','03','04','05','06'].map(f);};
var CUR={med:{n:'Medicina',tampa:'Medicina',pid:'kit',artes:['B','01','02','03','04','05','06','07','08'],fotos:six(function(n){return A+'kit/'+n+'.webp';})},
  vet:{n:'Veterinária',tampa:'Medicina Veterinária',pid:'vet',artes:['01','02','03','04','05','06','07','08'],fotos:six(function(n){return A+'gal/vet-'+n+'.webp';})},
  odonto:{n:'Odontologia',tampa:'Odontologia',pid:'odonto',artes:[],semTampa:true,fotos:six(function(n){return A+'gal/odonto-'+n+'.webp';})},
  enf:{n:'Enfermagem',tampa:'Enfermagem',pid:'kit',artes:['01'],ref:true,fotos:six(function(n){return A+'kit/'+n+'.webp';})}};
var artThumb=function(c,a){return a==='B'?A+'v2/med-00.jpg':A+'art/'+c+'-'+a+'.webp';};
var artBig=function(c,a){return a==='B'?A+'art/simbolo-med-ref.png':A+'art/big-'+c+'-'+a+'.png';};
var artNome=function(c,a){return a==='B'?'Bastão com serpente':CUR[c].ref?'Referência':'Desenho '+a;};
var kitEl=$('[data-kit]');
if(kitEl){var qid=qs.get('id');var modoCurso=!qid||qid==='kit'||qid==='vet'||qid==='odonto';
  var fixo=modoCurso?null:(P[qid]&&P[qid].perso?qid:'kit');
  var inicial=qs.get('curso')&&CUR[qs.get('curso')]?qs.get('curso'):(qid==='vet'?'vet':qid==='odonto'?'odonto':'med');
  var k={curso:inicial,arte:CUR[inicial].artes[0]||'',nome:'',presente:qs.get('presente')==='1'};
  var prodAtual=function(){return P[fixo||CUR[k.curso].pid];};
  $('[data-k-presente]').checked=k.presente;
  var cards=$('[data-k-cursos]');
  cards.innerHTML=Object.keys(CUR).filter(function(c){return modoCurso||!CUR[c].semTampa;}).map(function(c){var pr=P[fixo||CUR[c].pid];
    return '<button type="button" data-cur="'+c+'"><img src="'+CUR[c].fotos[0]+'" alt="" width="64" height="64"><span><b>'+CUR[c].n+'</b>'+(modoCurso?'<small>'+brl(pr.p)+'</small>':'')+'</span></button>';}).join('');
  var lastCur=null;
  var draw2=function(){var c=CUR[k.curso],prod=prodAtual();
    if(c.artes.indexOf(k.arte)<0)k.arte=c.artes[0]||'';
    $$('[data-cur]',cards).forEach(function(b){var on=b.getAttribute('data-cur')===k.curso;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);});
    var tit=fixo?prod.n+' com seu nome gravado':'Kit Sutura Pro '+(k.curso==='odonto'?'Odonto':c.n)+' com seu nome gravado';
    $$('[data-k-titulo]').forEach(function(e){e.textContent=tit;});document.title=tit+' | SkillMed';
    $$('[data-k-preco]').forEach(function(e){e.textContent=brl(prod.p);});
    $$('[data-k-de]').forEach(function(e){e.hidden=!prod.de;if(prod.de)e.textContent=brl(prod.de);});
    $$('[data-k-save]').forEach(function(e){e.hidden=!prod.de;if(prod.de)e.textContent='Economize '+brl(prod.de-prod.p);});
    $$('[data-k-curso-lbl]').forEach(function(e){e.textContent=c.n;});
    var ag=$('[data-k-artes]');
    if(lastCur!==k.curso){ag.innerHTML=c.artes.map(function(a){return '<button type="button" data-arte="'+a+'" aria-label="'+artNome(k.curso,a)+'"><img src="'+artThumb(k.curso,a)+'" alt="" width="300" height="150" loading="lazy"><i>'+(a==='B'?'Bastão':a)+'</i></button>';}).join('');
      galeria(fixo?[prod.img]:c.fotos);lastCur=k.curso;
      if(!fixo)history.replaceState(null,'','?curso='+k.curso);}
    $$('[data-arte]',ag).forEach(function(b){var on=b.getAttribute('data-arte')===k.arte;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);});
    $('[data-k-step-arte]').hidden=!c.artes.length;$('[data-k-nlbl]').textContent=c.semTampa?'2. Nome para personalizar':'3. Nome no estojo';
    $('[data-k-artelbl]').textContent=c.ref?'Referência enviada pelo dono':k.arte==='B'?'Bastão com serpente':'Desenho '+k.arte+' de 08';
    $('.tampa').hidden=!!c.semTampa;$('[data-k-odonto]').hidden=!c.semTampa;
    $('.t-curso').textContent=c.tampa;
    $('.t-arte').style.backgroundImage=c.artes.length&&!c.ref?'url('+artBig(k.curso,k.arte)+')':c.ref?'url('+A+'art/enf-01.webp)':'none';
    $('.t-arte').classList.toggle('t-arte-ref',!!c.ref);
    $('.t-nome').textContent=k.nome.trim()||'Seu nome aqui';
    $('[data-k-conta]').textContent=k.nome.length+'/22';
    $$('[data-k-itens]').forEach(function(e){e.hidden=e.getAttribute('data-k-itens')!==(k.curso==='odonto'?'odonto':'inox');});
    var tot=prod.p+(k.presente?29.9:0);$$('[data-k-total]').forEach(function(e){e.textContent=brl(tot);});};
  cards.addEventListener('click',function(e){var b=e.target.closest('[data-cur]');if(b){k.curso=b.getAttribute('data-cur');k.arte=CUR[k.curso].artes[0]||'';draw2();}});
  $('[data-k-artes]').addEventListener('click',function(e){var b=e.target.closest('[data-arte]');if(b){k.arte=b.getAttribute('data-arte');draw2();}});
  var inp=$('[data-k-nome]');inp.addEventListener('input',function(){k.nome=inp.value;inp.removeAttribute('aria-invalid');$('[data-k-erro]').hidden=true;draw2();});
  $('[data-k-presente]').addEventListener('change',function(e){k.presente=e.target.checked;draw2();});
  $$('[data-k-comprar]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();
    if(!k.nome.trim()){inp.setAttribute('aria-invalid','true');$('[data-k-erro]').hidden=false;var top=inp.getBoundingClientRect().top+window.scrollY-140;window.scrollTo({top:top,behavior:'smooth'});inp.focus({preventScroll:true});return;}
    var c=CUR[k.curso];cart.add({id:fixo||c.pid,q:1,perso:true,curso:c.n,arte:c.artes.length?artNome(k.curso,k.arte):'A confirmar com a equipe',nome:k.nome.trim(),presente:k.presente});
    location.href='carrinho.html';});});
  var sb=$('.sticky-buy'),alvo=$$('[data-k-esconde-barra]');
  if(sb&&'IntersectionObserver' in window){var vis=new Set();var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting)vis.add(x.target);else vis.delete(x.target);});sb.classList.toggle('sb-off',vis.size>0);});alvo.forEach(function(t){io.observe(t);});}
  draw2();}

/* produto normal */
var pe=$('[data-produto]');
if(pe){var id=P[qs.get('id')]&&!P[qs.get('id')].perso?qs.get('id'):'coleta';var p=P[id];var q=1;
  document.title=(p.titulo||p.n)+' | SkillMed';
  $$('[data-p-nome]').forEach(function(e){e.textContent=p.titulo||p.n;});
  $$('[data-p-crumb]').forEach(function(e){e.textContent=p.n;});
  $$('[data-p-cat]').forEach(function(e){e.textContent=p.cat||'';});
  $$('[data-p-preco]').forEach(function(e){e.textContent=brl(p.p);});
  $$('[data-p-desc]').forEach(function(e){e.textContent=p.d||'';});
  $$('[data-p-nota]').forEach(function(e){if(p.nota)e.textContent='★ '+p.nota;else e.remove();});
  var bx=$('[data-p-caixa]');if(p.caixa){$('[data-p-caixa-t]').textContent=p.caixaT;bx.innerHTML=p.caixa.map(function(t){return '<li><svg class="icon icon-g" viewBox="0 0 24 24" style="width:18px;height:18px;margin-top:2px"><path d="m5 12 4 4 10-10"/></svg>'+esc(t)+'</li>';}).join('');}else $('[data-p-caixa-box]').remove();
  var sp=$('[data-p-specs]');if(p.specs){sp.innerHTML=p.specs.map(function(s){return '<div><span class="muted">'+s[0]+'</span><span>'+s[1]+'</span></div>';}).join('');}else $('[data-p-specs-box]').remove();
  galeria(p.fotos||[p.img]);
  var upd=function(){$$('[data-q]').forEach(function(e){e.textContent=q;});$$('[data-p-total]').forEach(function(e){e.textContent=brl(p.p*q);});};
  $$('[data-q-menos]').forEach(function(b){b.addEventListener('click',function(){q=Math.max(1,q-1);upd();});});
  $$('[data-q-mais]').forEach(function(b){b.addEventListener('click',function(){q=Math.min(20,q+1);upd();});});
  $$('[data-p-add]').forEach(function(b){b.addEventListener('click',function(){cart.add({id:id,q:q});toast(q+'× '+p.n+' adicionado.');});});
  upd();}

/* carrinho */
var ce=$('[data-carrinho]');
if(ce){var cupom=localStorage.getItem('sm-cupom')==='1',conferi=false;
  var render=function(){var c=cart.get();var sub=c.reduce(function(a,i){return a+(P[i.id].p+(i.presente?29.9:0))*i.q;},0);
    var n=c.reduce(function(a,i){return a+i.q;},0);
    $$('[data-c-n]').forEach(function(e){e.textContent=n+(n===1?' item':' itens');});
    $('[data-c-vazio]').hidden=!!c.length;$('[data-c-cheio]').hidden=!c.length;
    if(!c.length){badge();return;}
    var falta=159.9-sub;
    $$('[data-c-frete-msg]').forEach(function(e){e.textContent=falta>0?'Faltam '+brl(falta)+' para o frete grátis':'Você ganhou frete grátis';});
    $$('[data-c-bar]').forEach(function(e){e.style.width=Math.min(100,sub/159.9*100)+'%';});
    $('[data-c-lista]').innerHTML=c.map(function(i,ix){var p=P[i.id];var un=p.p+(i.presente?29.9:0);
      return '<div class="line"><a class="line-img" href="'+url(i.id)+'" style="background-image:url('+p.img+')"></a><div style="display:flex;flex-direction:column;gap:8px"><a href="'+url(i.id)+'" style="font:600 18px/1.3 Figtree">'+esc(p.n)+'</a>'+
        (i.perso?'<div class="line-det"><span>Curso</span><span>'+esc(i.curso)+'</span><span>Desenho</span><span>'+esc(i.arte)+'</span><span>Nome</span><strong>'+esc(i.nome)+'</strong>'+(i.presente?'<span>Presente</span><span>Embalagem com cartão (+ R$ 29,90)</span>':'')+'</div>':'')+
        '<button class="rm" data-rm="'+ix+'">Remover</button></div>'+
        '<div class="qty"><button data-menos="'+ix+'" aria-label="Diminuir">−</button><span>'+i.q+'</span><button data-mais="'+ix+'" aria-label="Aumentar">+</button></div>'+
        '<span class="line-tot" style="font:700 18px Figtree;text-align:right">'+brl(un*i.q)+'</span></div>';}).join('');
    $('[data-c-bump]').hidden=c.some(function(i){return i.id==='fios24';});
    var desc=cupom?sub*.1:0,tot=sub-desc;
    $$('[data-c-sub]').forEach(function(e){e.textContent=brl(sub);});
    $$('[data-c-desc-row]').forEach(function(e){e.hidden=!cupom;});
    $$('[data-c-desc]').forEach(function(e){e.textContent='− '+brl(desc);});
    $$('[data-c-frete]').forEach(function(e){e.textContent=falta>0?'Calculado no checkout':'Grátis';});
    $$('[data-c-total]').forEach(function(e){e.textContent=brl(tot);});
    $$('[data-c-parc]').forEach(function(e){e.textContent='ou 12x de '+brl(tot/12)+' no cartão';});
    var nomes=c.filter(function(i){return i.perso;}).map(function(i){return i.nome;});
    $$('[data-c-conf-box]').forEach(function(e){e.hidden=!nomes.length;});
    $$('[data-c-nomes]').forEach(function(e){e.textContent=nomes.join(', ');});
    var ok=!nomes.length||conferi;$$('[data-c-fin]').forEach(function(b){b.disabled=!ok;});
    $$('[data-c-cupmsg]').forEach(function(e){e.textContent=cupom?'Cupom PRIMEIRA10 aplicado: 10% OFF.':'Primeira compra? Use PRIMEIRA10.';e.style.color=cupom?'#0A7D3B':'';});
    badge();};
  ce.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var c=cart.get();
    if(b.hasAttribute('data-rm')){c.splice(+b.getAttribute('data-rm'),1);cart.set(c);render();}
    else if(b.hasAttribute('data-mais')){c[+b.getAttribute('data-mais')].q=Math.min(20,c[+b.getAttribute('data-mais')].q+1);cart.set(c);render();}
    else if(b.hasAttribute('data-menos')){var j=+b.getAttribute('data-menos');c[j].q=Math.max(1,c[j].q-1);cart.set(c);render();}
    else if(b.hasAttribute('data-c-addbump')){cart.add({id:'fios24',q:1});render();}
    else if(b.hasAttribute('data-c-aplicar')){var v=($(b.getAttribute('data-c-aplicar')).value||'').trim().toUpperCase();cupom=v==='PRIMEIRA10';localStorage.setItem('sm-cupom',cupom?'1':'0');render();
      if(!cupom)$$('[data-c-cupmsg]').forEach(function(e){e.textContent='Cupom não encontrado.';e.style.color='#B42318';});}
    else if(b.hasAttribute('data-c-fin')){alert('Aqui o pedido segue para o checkout da Yampi com o nome da gravação em cada item.');}});
  $$('[data-c-conferi]').forEach(function(x){x.addEventListener('change',function(){conferi=x.checked;$$('[data-c-conferi]').forEach(function(y){y.checked=conferi;});render();});});
  render();}

badge();
})();
