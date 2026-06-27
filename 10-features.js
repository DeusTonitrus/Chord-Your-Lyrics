"use strict";
/* ============ NUOVE FUNZIONALITÀ ============ */

/* --- traduzioni aggiuntive --- */
var I18N_EXTRA={
 it:{keyLabel:"Tonalità",hl:"Evidenzia sezioni",hlDisc:"Scrivi le sezioni tra parentesi quadre: [Verse], [Chorus], [Bridge]…",color:"Colore",
   expUG:"Esporta Ultimate Guitar",expCP:"Esporta ChordPro",find:"Sostituisci accordi",frFrom:"Da",frTo:"A",frDo:"Sostituisci tutto",frDone:"Accordi sostituiti",frNone:"Nessun accordo da sostituire",frSearch:"Cerca accordo",frPreview:"{n} accordi verranno sostituiti",close:"Chiudi",
   live:"Live",liveSpeed:"Velocità",liveBPM:"BPM (facoltativo)",sSlow:"Lenta",sMed:"Media",sFast:"Veloce",sVFast:"Molto veloce",liveStart:"Avvia",livePause:"Pausa",liveExit:"Esci",liveStop:"Stop",liveReset:"Riavvia",zoom:"Zoom",
   vol:"Volume",arp:"Arpeggio",aFast:"Veloce",aMed:"Medio",aSlow:"Lento",dropHint:"Trascina qui un file di testo per importarlo",restored:"Sessione ripristinata",help:"Istruzioni"},
 en:{keyLabel:"Key",hl:"Highlight sections",hlDisc:"Write sections in square brackets: [Verse], [Chorus], [Bridge]…",color:"Color",
   expUG:"Export Ultimate Guitar",expCP:"Export ChordPro",find:"Replace chords",frFrom:"From",frTo:"To",frDo:"Replace all",frDone:"Chords replaced",frNone:"No chords to replace",frSearch:"Search chord",frPreview:"{n} chords will be replaced",close:"Close",
   live:"Live",liveSpeed:"Speed",liveBPM:"BPM (optional)",sSlow:"Slow",sMed:"Medium",sFast:"Fast",sVFast:"Very fast",liveStart:"Start",livePause:"Pause",liveExit:"Exit",liveStop:"Stop",liveReset:"Reset",zoom:"Zoom",
   vol:"Volume",arp:"Arpeggio",aFast:"Fast",aMed:"Medium",aSlow:"Slow",dropHint:"Drag a text file here to import it",restored:"Session restored",help:"Instructions"},
 fr:{keyLabel:"Tonalité",hl:"Surligner les sections",hlDisc:"Écrivez les sections entre crochets : [Verse], [Chorus], [Bridge]…",color:"Couleur",
   expUG:"Exporter Ultimate Guitar",expCP:"Exporter ChordPro",find:"Remplacer les accords",frFrom:"De",frTo:"À",frDo:"Tout remplacer",frDone:"Accords remplacés",frNone:"Aucun accord à remplacer",frSearch:"Chercher un accord",frPreview:"{n} accords seront remplacés",close:"Fermer",
   live:"Live",liveSpeed:"Vitesse",liveBPM:"BPM (facultatif)",sSlow:"Lente",sMed:"Moyenne",sFast:"Rapide",sVFast:"Très rapide",liveStart:"Démarrer",livePause:"Pause",liveExit:"Quitter",liveStop:"Stop",liveReset:"Recommencer",zoom:"Zoom",
   vol:"Volume",arp:"Arpège",aFast:"Rapide",aMed:"Moyen",aSlow:"Lent",dropHint:"Glissez un fichier texte ici pour l'importer",restored:"Session restaurée",help:"Instructions"},
 de:{keyLabel:"Tonart",hl:"Abschnitte hervorheben",hlDisc:"Schreibe Abschnitte in eckigen Klammern: [Verse], [Chorus], [Bridge]…",color:"Farbe",
   expUG:"Ultimate Guitar exportieren",expCP:"ChordPro exportieren",find:"Akkorde ersetzen",frFrom:"Von",frTo:"Zu",frDo:"Alle ersetzen",frDone:"Akkorde ersetzt",frNone:"Keine Akkorde zu ersetzen",frSearch:"Akkord suchen",frPreview:"{n} Akkorde werden ersetzt",close:"Schließen",
   live:"Live",liveSpeed:"Geschwindigkeit",liveBPM:"BPM (optional)",sSlow:"Langsam",sMed:"Mittel",sFast:"Schnell",sVFast:"Sehr schnell",liveStart:"Start",livePause:"Pause",liveExit:"Beenden",liveStop:"Stopp",liveReset:"Zurücksetzen",zoom:"Zoom",
   vol:"Lautstärke",arp:"Arpeggio",aFast:"Schnell",aMed:"Mittel",aSlow:"Langsam",dropHint:"Textdatei hierher ziehen zum Importieren",restored:"Sitzung wiederhergestellt",help:"Anleitung"},
 es:{keyLabel:"Tonalidad",hl:"Resaltar secciones",hlDisc:"Escribe las secciones entre corchetes: [Verse], [Chorus], [Bridge]…",color:"Color",
   expUG:"Exportar Ultimate Guitar",expCP:"Exportar ChordPro",find:"Reemplazar acordes",frFrom:"De",frTo:"A",frDo:"Reemplazar todo",frDone:"Acordes reemplazados",frNone:"No hay acordes que reemplazar",frSearch:"Buscar acorde",frPreview:"{n} acordes serán reemplazados",close:"Cerrar",
   live:"Live",liveSpeed:"Velocidad",liveBPM:"BPM (opcional)",sSlow:"Lenta",sMed:"Media",sFast:"Rápida",sVFast:"Muy rápida",liveStart:"Iniciar",livePause:"Pausa",liveExit:"Salir",liveStop:"Detener",liveReset:"Reiniciar",zoom:"Zoom",
   vol:"Volumen",arp:"Arpegio",aFast:"Rápido",aMed:"Medio",aSlow:"Lento",dropHint:"Arrastra aquí un archivo de texto para importarlo",restored:"Sesión restaurada",help:"Instrucciones"},
 zh:{keyLabel:"调性",hl:"高亮段落",hlDisc:"用方括号写段落：[Verse]、[Chorus]、[Bridge]…",color:"颜色",
   expUG:"导出 Ultimate Guitar",expCP:"导出 ChordPro",find:"替换和弦",frFrom:"从",frTo:"到",frDo:"全部替换",frDone:"和弦已替换",frNone:"没有可替换的和弦",frSearch:"搜索和弦",frPreview:"将替换 {n} 个和弦",close:"关闭",
   live:"现场",liveSpeed:"速度",liveBPM:"BPM（可选）",sSlow:"慢",sMed:"中",sFast:"快",sVFast:"很快",liveStart:"开始",livePause:"暂停",liveExit:"退出",liveStop:"停止",liveReset:"重置",zoom:"缩放",
   vol:"音量",arp:"琶音",aFast:"快",aMed:"中",aSlow:"慢",dropHint:"将文本文件拖到此处导入",restored:"会话已恢复",help:"使用说明"},
 ja:{keyLabel:"調",hl:"セクションを強調",hlDisc:"セクションは角括弧で記述：[Verse]、[Chorus]、[Bridge]…",color:"色",
   expUG:"Ultimate Guitar に書き出し",expCP:"ChordPro に書き出し",find:"コードを置換",frFrom:"置換前",frTo:"置換後",frDo:"すべて置換",frDone:"コードを置換しました",frNone:"置換するコードがありません",frSearch:"コードを検索",frPreview:"{n} 個のコードが置換されます",close:"閉じる",
   live:"ライブ",liveSpeed:"速度",liveBPM:"BPM（任意）",sSlow:"遅い",sMed:"普通",sFast:"速い",sVFast:"非常に速い",liveStart:"開始",livePause:"一時停止",liveExit:"終了",liveStop:"停止",liveReset:"リセット",zoom:"ズーム",
   vol:"音量",arp:"アルペジオ",aFast:"速い",aMed:"普通",aSlow:"遅い",dropHint:"テキストファイルをここにドラッグして読み込み",restored:"セッションを復元しました",help:"使い方"},
 uk:{keyLabel:"Тональність",hl:"Підсвітити секції",hlDisc:"Пишіть секції у квадратних дужках: [Verse], [Chorus], [Bridge]…",color:"Колір",
   expUG:"Експорт Ultimate Guitar",expCP:"Експорт ChordPro",find:"Замінити акорди",frFrom:"З",frTo:"На",frDo:"Замінити всі",frDone:"Акорди замінено",frNone:"Немає акордів для заміни",frSearch:"Шукати акорд",frPreview:"{n} акордів буде замінено",close:"Закрити",
   live:"Live",liveSpeed:"Швидкість",liveBPM:"BPM (необов’язково)",sSlow:"Повільно",sMed:"Середньо",sFast:"Швидко",sVFast:"Дуже швидко",liveStart:"Старт",livePause:"Пауза",liveExit:"Вийти",liveStop:"Стоп",liveReset:"Скинути",zoom:"Масштаб",
   vol:"Гучність",arp:"Арпеджіо",aFast:"Швидко",aMed:"Середньо",aSlow:"Повільно",dropHint:"Перетягніть сюди текстовий файл для імпорту",restored:"Сесію відновлено",help:"Інструкція"},
 ru:{keyLabel:"Тональность",hl:"Подсветить секции",hlDisc:"Пишите секции в квадратных скобках: [Verse], [Chorus], [Bridge]…",color:"Цвет",
   expUG:"Экспорт Ultimate Guitar",expCP:"Экспорт ChordPro",find:"Заменить аккорды",frFrom:"С",frTo:"На",frDo:"Заменить все",frDone:"Аккорды заменены",frNone:"Нет аккордов для замены",frSearch:"Искать аккорд",frPreview:"{n} аккордов будет заменено",close:"Закрыть",
   live:"Live",liveSpeed:"Скорость",liveBPM:"BPM (необязательно)",sSlow:"Медленно",sMed:"Средне",sFast:"Быстро",sVFast:"Очень быстро",liveStart:"Старт",livePause:"Пауза",liveExit:"Выход",liveStop:"Стоп",liveReset:"Сброс",zoom:"Масштаб",
   vol:"Громкость",arp:"Арпеджио",aFast:"Быстро",aMed:"Средне",aSlow:"Медленно",dropHint:"Перетащите сюда текстовый файл для импорта",restored:"Сессия восстановлена",help:"Инструкция"},
 ro:{keyLabel:"Tonalitate",hl:"Evidențiază secțiunile",hlDisc:"Scrie secțiunile în paranteze pătrate: [Verse], [Chorus], [Bridge]…",color:"Culoare",
   expUG:"Exportă Ultimate Guitar",expCP:"Exportă ChordPro",find:"Înlocuiește acordurile",frFrom:"Din",frTo:"În",frDo:"Înlocuiește tot",frDone:"Acorduri înlocuite",frNone:"Niciun acord de înlocuit",frSearch:"Caută acord",frPreview:"{n} acorduri vor fi înlocuite",close:"Închide",
   live:"Live",liveSpeed:"Viteză",liveBPM:"BPM (opțional)",sSlow:"Lentă",sMed:"Medie",sFast:"Rapidă",sVFast:"Foarte rapidă",liveStart:"Pornește",livePause:"Pauză",liveExit:"Ieși",liveStop:"Stop",liveReset:"Resetează",zoom:"Zoom",
   vol:"Volum",arp:"Arpegiu",aFast:"Rapid",aMed:"Mediu",aSlow:"Lent",dropHint:"Trage aici un fișier text pentru a-l importa",restored:"Sesiune restaurată",help:"Instrucțiuni"},
 sq:{keyLabel:"Tonaliteti",hl:"Thekso seksionet",hlDisc:"Shkruaj seksionet në kllapa katrore: [Verse], [Chorus], [Bridge]…",color:"Ngjyra",
   expUG:"Eksporto Ultimate Guitar",expCP:"Eksporto ChordPro",find:"Zëvendëso akordet",frFrom:"Nga",frTo:"Në",frDo:"Zëvendëso të gjitha",frDone:"Akordet u zëvendësuan",frNone:"Asnjë akord për të zëvendësuar",frSearch:"Kërko akord",frPreview:"{n} akorde do të zëvendësohen",close:"Mbyll",
   live:"Live",liveSpeed:"Shpejtësia",liveBPM:"BPM (opsionale)",sSlow:"Ngadalë",sMed:"Mesatare",sFast:"Shpejt",sVFast:"Shumë shpejt",liveStart:"Nis",livePause:"Pauzë",liveExit:"Dil",liveStop:"Ndalo",liveReset:"Rinis",zoom:"Zmadhim",
   vol:"Volumi",arp:"Arpexho",aFast:"Shpejt",aMed:"Mesatar",aSlow:"Ngadalë",dropHint:"Tërhiq këtu një skedar teksti për ta importuar",restored:"Sesioni u rikthye",help:"Udhëzime"},
 el:{keyLabel:"Τονικότητα",hl:"Επισήμανση ενοτήτων",hlDisc:"Γράψε τις ενότητες σε αγκύλες: [Verse], [Chorus], [Bridge]…",color:"Χρώμα",
   expUG:"Εξαγωγή Ultimate Guitar",expCP:"Εξαγωγή ChordPro",find:"Αντικατάσταση συγχορδιών",frFrom:"Από",frTo:"Σε",frDo:"Αντικατάσταση όλων",frDone:"Οι συγχορδίες αντικαταστάθηκαν",frNone:"Δεν υπάρχουν συγχορδίες προς αντικατάσταση",frSearch:"Αναζήτηση συγχορδίας",frPreview:"{n} συγχορδίες θα αντικατασταθούν",close:"Κλείσιμο",
   live:"Live",liveSpeed:"Ταχύτητα",liveBPM:"BPM (προαιρετικό)",sSlow:"Αργή",sMed:"Μέτρια",sFast:"Γρήγορη",sVFast:"Πολύ γρήγορη",liveStart:"Έναρξη",livePause:"Παύση",liveExit:"Έξοδος",liveStop:"Διακοπή",liveReset:"Επαναφορά",zoom:"Ζουμ",
   vol:"Ένταση",arp:"Άρπισμα",aFast:"Γρήγορο",aMed:"Μέτριο",aSlow:"Αργό",dropHint:"Σύρε εδώ ένα αρχείο κειμένου για εισαγωγή",restored:"Η συνεδρία επαναφέρθηκε",help:"Οδηγίες"}
};
(function(){for(var L in I18N_EXTRA){if(!I18N[L])I18N[L]={};var s=I18N_EXTRA[L];for(var k in s)I18N[L][k]=s[k];}})();

/* --- stato aggiuntivo --- */
state.selectedChord=null;
state.highlight=false;
state.sectionColor="#E6B8A2";
state.sectionColors={verse:"#CFE0F0",chorus:"#F2D9CC",bridge:"#D6E8D2",intro:"#E4DCF2",outro:"#F2EBCF",solo:"#F2CFDD",other:"#E6B8A2"};
state.volume=1.0;
state.arpSpeed=1;
state.arpeggio=false;

/* --- AUTOSALVATAGGIO (localStorage) --- */
var SAVE_KEY="cyl_autosave_v2";
function saveState(){
  try{
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      title:state.title,rawText:state.rawText,chords:state.chords,instrumentals:state.instrumentals,
      fontFamily:state.fontFamily,fontSize:state.fontSize,lang:state.lang,diagram:state.diagram,
      highlight:state.highlight,sectionColor:state.sectionColor,sectionColors:state.sectionColors,volume:state.volume,arpSpeed:state.arpSpeed,arpeggio:state.arpeggio,mode:state.mode
    }));
  }catch(e){}
}
function scheduleSave(){if(scheduleSave._t)clearTimeout(scheduleSave._t);scheduleSave._t=setTimeout(saveState,400);}
function loadSaved(){
  try{
    var s=localStorage.getItem(SAVE_KEY);if(!s)return false;
    var d=JSON.parse(s);if(!d)return false;
    if(d.title!=null)state.title=d.title;
    if(d.rawText!=null)state.rawText=d.rawText;
    if(d.chords)state.chords=d.chords;
    if(d.instrumentals)state.instrumentals=d.instrumentals;
    if(d.fontFamily)state.fontFamily=d.fontFamily;
    if(d.fontSize)state.fontSize=d.fontSize;
    if(d.lang&&I18N[d.lang])state.lang=d.lang;
    if(d.diagram)state.diagram=d.diagram;
    if(d.highlight!=null)state.highlight=d.highlight;
    if(d.sectionColor)state.sectionColor=d.sectionColor;
    if(d.sectionColors){for(var sk in d.sectionColors)state.sectionColors[sk]=d.sectionColors[sk];}
    if(d.volume!=null)state.volume=d.volume;
    if(d.arpSpeed!=null)state.arpSpeed=d.arpSpeed;
    if(d.arpeggio!=null)state.arpeggio=d.arpeggio;
    if(d.mode&&(state.rawText.trim()||Object.keys(state.instrumentals).length))state.mode=d.mode;
    return !!(state.rawText.trim()||Object.keys(state.instrumentals).length);
  }catch(e){return false;}
}

/* --- RILEVAMENTO TONALITÀ --- */
function detectKey(){
  var names=getAllChords();if(!names.length)return null;
  var chs=names.map(function(n){
    var mm=n.match(/^([A-G][b#]?)(.*)$/);if(!mm)return null;
    var pc=NOTE_PC[mm[1]];if(pc==null)return null;
    var q=mm[2],qual=/dim|°|m7b5|ø/.test(q)?"dim":(/^(m|min|-)(?!aj)/.test(q)?"min":"maj");
    return {pc:pc,qual:qual};
  }).filter(Boolean);
  if(!chs.length)return null;
  var MAJ=[[0,"maj"],[2,"min"],[4,"min"],[5,"maj"],[7,"maj"],[9,"min"],[11,"dim"]];
  var MIN=[[0,"min"],[2,"dim"],[3,"maj"],[5,"min"],[7,"min"],[8,"maj"],[10,"maj"]];
  var best=null,bestScore=-1;
  for(var tonic=0;tonic<12;tonic++){
    [["",MAJ],["m",MIN]].forEach(function(mode){
      var degQ={};mode[1].forEach(function(d){degQ[(tonic+d[0])%12]=d[1];});
      var score=0,tonicPresent=false;
      chs.forEach(function(c){
        var exp=degQ[c.pc];
        if(exp===undefined)score-=0.5;          /* fuori scala */
        else if(exp===c.qual)score+=2;          /* grado e qualità giusti */
        else score+=0.5;                         /* in scala ma qualità diversa */
        if(c.pc===tonic&&c.qual===(mode[0]==="m"?"min":"maj"))tonicPresent=true;
        if(c.pc===tonic)score+=0.5;
        if(c.pc===(tonic+7)%12&&c.qual==="maj")score+=0.5;  /* dominante */
      });
      if(tonicPresent)score+=3;
      if(mode[0]==="")score+=0.1;                /* lieve preferenza maggiore in caso di parità */
      if(score>bestScore){bestScore=score;best={t:tonic,s:mode[0]};}
    });
  }
  return best?SHARP[best.t]+best.s:null;
}
function updateKeyDisplay(){
  var el=document.getElementById("key-display");if(!el)return;
  var k=detectKey();
  if(k){el.textContent=T("keyLabel")+": "+k;el.style.display="";}
  else{el.textContent="";el.style.display="none";}
}

/* --- AUTOCOMPLETAMENTO ACCORDI --- */
var AC_ROOTS=["C","D","E","F","G","A","B","C#","Db","D#","Eb","F#","Gb","G#","Ab","A#","Bb"];
var AC_SUFF=["","m","7","m7","maj7","6","m6","9","m9","11","13","sus2","sus4","add9","madd9","dim","aug","7sus4","5"];
var AC_ALL=[];(function(){for(var i=0;i<AC_ROOTS.length;i++)for(var j=0;j<AC_SUFF.length;j++)AC_ALL.push(AC_ROOTS[i]+AC_SUFF[j]);})();
var acBox=null,acItems=[],acIndex=-1,acInput=null,acScrollH=null;
function acReposition(){
  if(!acBox||!acInput)return;
  var r=acInput.getBoundingClientRect();
  if(r.bottom<0||r.top>window.innerHeight){acBox.style.display="none";return;}
  acBox.style.display="";
  acBox.style.left=r.left+"px";acBox.style.top=(r.bottom+4)+"px";acBox.style.minWidth=Math.max(120,r.width)+"px";
}
function acClose(){
  if(acScrollH){window.removeEventListener("scroll",acScrollH,true);window.removeEventListener("resize",acScrollH);acScrollH=null;}
  if(acBox&&acBox.parentNode)acBox.parentNode.removeChild(acBox);acBox=null;acItems=[];acIndex=-1;acInput=null;
}
function acFilter(val){
  val=(val||"").trim();
  var list;
  if(!val)list=AC_ROOTS.slice(0,12).map(function(r){return r;});
  else list=AC_ALL.filter(function(c){return c.toLowerCase().indexOf(val.toLowerCase())===0;});
  var seen={},out=[];
  list.forEach(function(c){if(!seen[c]){seen[c]=1;out.push(c);}});
  return out.slice(0,12);
}
function acShow(input){
  acInput=input;
  var sugg=acFilter(input.value);
  if(!sugg.length){acClose();return;}
  if(!acBox){acBox=document.createElement("div");acBox.className="ac-box";document.body.appendChild(acBox);}
  acBox.innerHTML="";acItems=[];acIndex=-1;
  sugg.forEach(function(c,i){
    var it=document.createElement("div");it.className="ac-item";it.textContent=c;
    it.addEventListener("mousedown",function(e){e.preventDefault();input.value=c;acClose();});
    acBox.appendChild(it);acItems.push(it);
  });
  var r=input.getBoundingClientRect();
  acBox.style.left=r.left+"px";acBox.style.top=(r.bottom+4)+"px";acBox.style.minWidth=Math.max(120,r.width)+"px";
  if(!acScrollH){acScrollH=function(){acReposition();};window.addEventListener("scroll",acScrollH,true);window.addEventListener("resize",acScrollH);}
}
function acMove(d){
  if(!acItems.length)return;
  if(acIndex>=0&&acItems[acIndex])acItems[acIndex].classList.remove("active");
  acIndex=(acIndex+d+acItems.length)%acItems.length;
  acItems[acIndex].classList.add("active");
  acItems[acIndex].scrollIntoView({block:"nearest"});
}
function acAccept(input){if(acIndex>=0&&acItems[acIndex]){input.value=acItems[acIndex].textContent;acClose();return true;}acClose();return false;}

/* --- SEZIONI --- */
function isSection(line){return /^\s*\[[^\]]+\]\s*$/.test(line||"");}

/* --- ESPORTAZIONI --- */
function downloadFile(name,content){
  var blob=new Blob([content],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob);
  var a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
}
function exportUG(){
  /* formato Ultimate Guitar: accordi su riga sopra il testo, sezioni tra [] */
  var out=state.title?("["+state.title+"]\n\n"):"";
  var lines=state.rawText.split("\n");
  lines.forEach(function(line,li){
    if(state.instrumentals[li]){
      var lab=(state.instrumentals[li].label||"").trim(),s=(state.instrumentals[li].seq||"").trim();
      if(lab)out+="["+lab+"]\n";
      if(s)out+=s+"\n";
      if(!lab&&!s)out+="\n";
      return;
    }
    var lc=chordsForLine(li,line),cl=lc.length?buildChordTextLine(lc):"";
    if(cl)out+=cl+"\n";
    out+=line+"\n";
  });
  downloadFile((state.title.trim()||"chord-your-lyrics")+"_UG.txt",out.replace(/\n+$/,"\n"));
  flash(T("downloaded"));
}
function exportChordPro(){
  var out="";
  if(state.title)out+="{title: "+state.title+"}\n";
  var k=detectKey();if(k)out+="{key: "+k+"}\n";
  out+="\n";
  var lines=state.rawText.split("\n");
  lines.forEach(function(line,li){
    if(state.instrumentals[li]){
      var lab=(state.instrumentals[li].label||"").trim(),s=(state.instrumentals[li].seq||"").trim();
      if(lab)out+="{comment: "+lab+"}\n";
      if(s)out+=s.split(/\s+/).filter(function(t){return t&&t!=="|";}).map(function(t){return "["+t+"]";}).join(" ")+"\n";
      return;
    }
    if(isSection(line)){out+="{comment: "+line.replace(/^\s*\[|\]\s*$/g,"")+"}\n";return;}
    /* inserisci [accordo] alle posizioni dei caratteri */
    var lc=chordsForLine(li,line).slice().sort(function(a,b){return b.ci-a.ci;});
    var s2=line;
    lc.forEach(function(o){var pos=Math.min(o.ci,s2.length);s2=s2.slice(0,pos)+"["+o.text+"]"+s2.slice(pos);});
    out+=s2+"\n";
  });
  downloadFile((state.title.trim()||"chord-your-lyrics")+".cho",out.replace(/\n+$/,"\n"));
  flash(T("downloaded"));
}

/* --- RICERCA / SOSTITUZIONE ACCORDI --- */
function chordSet(){
  var s={};
  Object.keys(state.chords).forEach(function(k){s[state.chords[k].text]=1;});
  Object.keys(state.instrumentals).forEach(function(li){parseSeq(state.instrumentals[li].seq).forEach(function(t){if(t!=="|")s[t]=1;});});
  return Object.keys(s).sort();
}
function doReplaceAll(from,to){
  from=(from||"").trim();to=(to||"").trim();
  if(!from||!to)return 0;
  var n=0;
  Object.keys(state.chords).forEach(function(k){if(state.chords[k].text===from){state.chords[k].text=to;n++;}});
  Object.keys(state.instrumentals).forEach(function(li){
    var toks=parseSeq(state.instrumentals[li].seq),changed=false;
    toks=toks.map(function(t){if(t===from){n++;changed=true;return to;}return t;});
    if(changed)state.instrumentals[li].seq=toks.join(" ");
  });
  return n;
}
function countMatches(from){
  from=(from||"").trim();if(!from)return 0;var n=0;
  Object.keys(state.chords).forEach(function(k){if(state.chords[k].text===from)n++;});
  Object.keys(state.instrumentals).forEach(function(li){parseSeq(state.instrumentals[li].seq).forEach(function(t){if(t===from)n++;});});
  return n;
}
function openReplace(){
  var existing=chordSet();
  var dl=h("datalist",{id:"fr-chords"});
  existing.forEach(function(c){dl.appendChild(h("option",{value:c}));});
  var fromInp=h("input",{class:"fr-input",placeholder:existing[0]||"Am",list:"fr-chords"});
  var toInp=h("input",{class:"fr-input",placeholder:"Bm"});
  var preview=h("div",{class:"fr-preview"});
  function upd(){var n=countMatches(fromInp.value);preview.textContent=T("frPreview").replace("{n}",n);preview.classList.toggle("none",n===0);}
  fromInp.addEventListener("input",upd);
  var dlg=h("div",{class:"dlg"},
    h("div",{class:"dlg-title"},T("find")),
    h("div",{class:"fr-row"},h("label",null,T("frSearch")),fromInp),
    h("div",{class:"fr-row"},h("label",null,T("frTo")),toInp),
    dl,
    preview,
    h("div",{class:"dlg-actions"},
      h("button",{class:"btn-ghost",onClick:closeOverlay},T("close")),
      h("button",{class:"btn-primary",onClick:function(){
        var n=doReplaceAll(fromInp.value,toInp.value);
        closeOverlay();
        if(n>0){rebuildSheet();scheduleSave();flash(T("frDone"));}else flash(T("frNone"));
      }},T("frDo"))
    )
  );
  showOverlay(dlg);
  upd();
}

/* --- OVERLAY generico --- */
var overlayEl=null;
function showOverlay(node){
  closeOverlay();
  overlayEl=h("div",{class:"overlay",onClick:function(e){if(e.target===overlayEl)closeOverlay();}},node);
  document.body.appendChild(overlayEl);
}
function closeOverlay(){if(overlayEl&&overlayEl.parentNode)overlayEl.parentNode.removeChild(overlayEl);overlayEl=null;}

/* --- GUIDA / ISTRUZIONI --- */
var HELP_GUIDE={
 it:[
  ["Due modalità","Usa le schede <b>Testo</b> e <b>Accordi</b> in alto. In <b>Testo</b> incolli o scrivi il testo della canzone; in <b>Accordi</b> lo trasformi in uno spartito interattivo."],
  ["Inserire un accordo","Nella scheda Accordi, <b>clicca su una lettera o su uno spazio</b> del testo: sopra comparirà un campo per scrivere l'accordo. Mentre digiti compare l'<b>autocompletamento</b> (frecce + Invio, oppure mouse, per scegliere)."],
  ["Modificare e spostare","<b>Clic singolo</b> su un accordo = modifica. <b>Tieni premuto e trascina</b> in orizzontale = sposti l'accordo carattere per carattere, mantenendo sempre l'allineamento con il testo."],
  ["Trasporre","I pulsanti <b>+</b> e <b>−</b> alzano o abbassano tutti gli accordi di un semitono."],
  ["Sezioni strumentali","Su una riga vuota usa <b>+ Strumentale</b> per inserire un giro di accordi senza testo (puoi separare le battute con |)."],
  ["Diagrammi e Play","In fondo scegli se mostrare i diagrammi di <b>chitarra</b>, <b>piano</b> o entrambi. Ogni diagramma ha un pulsante <b>▶</b> che riproduce l'accordo. Se sono presenti entrambi gli strumenti, c'è un Play per ciascuno: così scegli quale ascoltare."],
  ["Accordo pieno o arpeggio","Di default il Play suona l'<b>accordo pieno</b>. Attiva l'interruttore <b>Arpeggio</b> (nella riga dei controlli audio) per sentirlo arpeggiato; con il menu accanto regoli la velocità. Lo slider <b>Volume</b> alza o abbassa il volume del player."],
  ["Tonalità automatica","In alto viene mostrata la <b>tonalità</b> più probabile, calcolata automaticamente dagli accordi presenti nel brano."],
  ["Evidenziazione sezioni","Scrivi i titoli di sezione tra parentesi quadre: <b>[Intro]</b>, <b>[Verse]</b>, <b>[Chorus]</b>, <b>[Bridge]</b>… Attiva l'interruttore <b>Evidenzia sezioni</b> e scegli un colore: tutto il testo fino alla sezione successiva viene evidenziato con quel colore."],
  ["Sostituire accordi","Con <b>Sostituisci accordi</b> cambi automaticamente un accordo con un altro in tutto il brano (es. tutti i G → G7), senza modificare il testo."],
  ["Esportazioni","Puoi esportare in <b>.txt</b>, <b>PDF</b> (con i diagrammi), <b>Ultimate Guitar</b> e <b>ChordPro</b>, mantenendo allineamento, testo e struttura."],
  ["Modalità Live","Il pulsante <b>▶ Live</b> apre una vista a schermo intero con scorrimento automatico: quattro velocità predefinite oppure BPM manuali (facoltativi), più lo zoom."],
  ["Salvataggio automatico","Il lavoro viene salvato da solo nel browser: se chiudi la pagina, alla riapertura ritrovi automaticamente l'ultima versione."],
  ["Lingua","Dal menu in alto a destra cambi la lingua dell'interfaccia (12 lingue disponibili)."]
 ],
 en:[
  ["Two modes","Use the <b>Text</b> and <b>Chords</b> tabs at the top. In <b>Text</b> you paste or type the song lyrics; in <b>Chords</b> you turn them into an interactive chart."],
  ["Add a chord","In the Chords tab, <b>click on a letter or a space</b> in the lyrics: a field appears above it to type the chord. As you type, an <b>autocomplete</b> list shows up (arrows + Enter, or mouse, to pick)."],
  ["Edit and move","A <b>single click</b> on a chord = edit. <b>Press and drag</b> horizontally = move the chord character by character, always keeping it aligned with the lyrics."],
  ["Transpose","The <b>+</b> and <b>−</b> buttons raise or lower every chord by one semitone."],
  ["Instrumental sections","On an empty line use <b>+ Instrumental</b> to add a chord progression with no lyrics (separate bars with |)."],
  ["Diagrams and Play","At the bottom choose whether to show <b>guitar</b>, <b>piano</b> or both diagrams. Each diagram has a <b>▶</b> button that plays the chord. When both instruments are shown, there is one Play for each, so you choose which to hear."],
  ["Full chord or arpeggio","By default Play sounds the <b>full chord</b>. Turn on the <b>Arpeggio</b> switch (in the audio controls row) to hear it arpeggiated; the menu next to it sets the speed. The <b>Volume</b> slider raises or lowers the player volume."],
  ["Automatic key","The most likely <b>key</b> is shown at the top, calculated automatically from the chords in the song."],
  ["Section highlighting","Write section titles in square brackets: <b>[Intro]</b>, <b>[Verse]</b>, <b>[Chorus]</b>, <b>[Bridge]</b>… Turn on the <b>Highlight sections</b> switch and pick a color: all the text up to the next section is highlighted with it."],
  ["Replace chords","With <b>Replace chords</b> you automatically swap one chord for another across the whole song (e.g. all G → G7), without changing the lyrics."],
  ["Exports","You can export to <b>.txt</b>, <b>PDF</b> (with diagrams), <b>Ultimate Guitar</b> and <b>ChordPro</b>, keeping alignment, lyrics and structure."],
  ["Live mode","The <b>▶ Live</b> button opens a full-screen view with auto-scroll: four preset speeds or manual BPM (optional), plus zoom."],
  ["Auto-save","Your work is saved automatically in the browser: if you close the page, the latest version is restored when you reopen it."],
  ["Language","Use the menu at the top right to change the interface language (12 available)."]
 ]
};
function openHelp(){
  commitChord&&(state.mode==="chords")&&commitChord();
  var lang=HELP_GUIDE[state.lang]?state.lang:"en";
  var secs=HELP_GUIDE[lang];
  var body=h("div",{class:"help-body"});
  secs.forEach(function(s,i){
    var sec=h("div",{class:"help-sec"});
    sec.appendChild(h("h3",{class:"help-h"},(i+1)+". "+s[0]));
    var p=h("p",{class:"help-p"});p.innerHTML=s[1];sec.appendChild(p);
    body.appendChild(sec);
  });
  var panel=h("div",{class:"dlg help-dlg"},
    h("div",{class:"help-head"},
      h("div",{class:"dlg-title"},T("help")),
      h("button",{class:"help-x",onClick:closeOverlay,"aria-label":T("close")},"✕")
    ),
    body,
    h("div",{class:"dlg-actions"},h("button",{class:"btn-primary",onClick:closeOverlay},T("close")))
  );
  showOverlay(panel);
}

/* --- MODALITÀ LIVE --- */
var liveRAF=null,liveScroller=null,livePlaying=false,liveSpeedPx=40,liveZoom=1.3;
function liveSpeedFromBPM(bpm){return Math.max(8,Math.min(260,bpm*0.6));}
function openLive(){
  commitChord();
  var sheet=document.getElementById("sheet");
  var clone=sheet?sheet.cloneNode(true):h("div",null,state.rawText);
  /* rimuovi interattività residua */
  var btns=clone.querySelectorAll(".play-btn");for(var i=0;i<btns.length;i++)btns[i].parentNode&&btns[i].parentNode.removeChild(btns[i]);
  var inner=h("div",{class:"live-inner",style:{transform:"scale("+liveZoom+")"}});
  if(state.title)inner.appendChild(h("div",{class:"live-title"},state.title));
  inner.appendChild(clone);
  liveScroller=h("div",{class:"live-scroller"},inner);
  livePlaying=false;

  function setSpeed(px){liveSpeedPx=px;}
  var speedBtns=[["sSlow",18],["sMed",40],["sFast",72],["sVFast",115]].map(function(o){
    return h("button",{class:"live-speed-btn",onClick:function(){
      setSpeed(o[1]);bpmInp.value="";
      var all=bar.querySelectorAll(".live-speed-btn");for(var i=0;i<all.length;i++)all[i].classList.remove("on");
      this.classList.add("on");
    }},T(o[0]));
  });
  speedBtns[1].classList.add("on");liveSpeedPx=40;
  var bpmInp=h("input",{class:"live-bpm",type:"number",min:"30",max:"300",placeholder:T("liveBPM")});
  bpmInp.addEventListener("input",function(){var v=parseFloat(bpmInp.value);if(v>0){liveSpeedPx=liveSpeedFromBPM(v);var all=bar.querySelectorAll(".live-speed-btn");for(var i=0;i<all.length;i++)all[i].classList.remove("on");}});
  var zoomInp=h("input",{type:"range",min:"90",max:"260",value:String(liveZoom*100),class:"live-zoom"});
  zoomInp.addEventListener("input",function(){liveZoom=(+zoomInp.value)/100;inner.style.transform="scale("+liveZoom+")";});
  function setPlaying(p){livePlaying=p;playBtn.innerHTML=livePlaying?("⏸&nbsp; "+T("livePause")):("▶&nbsp; "+T("liveStart"));playBtn.classList.toggle("primary",!livePlaying);}
  var playBtn=h("button",{class:"live-ctrl-btn primary"});
  playBtn.addEventListener("click",function(){setPlaying(!livePlaying);});
  var stopBtn=h("button",{class:"live-ctrl-btn",title:T("liveStop"),"aria-label":T("liveStop")},"⏹");
  stopBtn.addEventListener("click",function(){setPlaying(false);if(liveScroller)liveScroller.scrollTop=0;});
  var resetBtn=h("button",{class:"live-ctrl-btn",title:T("liveReset"),"aria-label":T("liveReset")},"↺");
  resetBtn.addEventListener("click",function(){if(liveScroller)liveScroller.scrollTop=0;});
  var exitBtn=h("button",{class:"live-back",onClick:closeLive,title:T("liveExit")},"‹ "+T("liveExit"));
  var bar=h("div",{class:"live-bar"},
    exitBtn,
    playBtn,stopBtn,resetBtn,
    h("span",{class:"toolbar-label"},T("liveSpeed")),speedBtns,
    bpmInp,
    h("div",{style:{flex:"1"}}),
    h("span",{class:"toolbar-label"},T("zoom")),zoomInp
  );
  setPlaying(false);
  var ov=h("div",{class:"live-overlay"},bar,liveScroller);
  document.body.appendChild(ov);
  ov.id="live-overlay";
  var last=null;
  function step(ts){
    if(!document.getElementById("live-overlay")){liveRAF=null;return;}
    if(last==null)last=ts;
    var dt=(ts-last)/1000;last=ts;
    if(livePlaying&&liveScroller)liveScroller.scrollTop+=liveSpeedPx*dt;
    liveRAF=requestAnimationFrame(step);
  }
  liveRAF=requestAnimationFrame(step);
}
function closeLive(){
  var ov=document.getElementById("live-overlay");if(ov&&ov.parentNode)ov.parentNode.removeChild(ov);
  if(liveRAF)cancelAnimationFrame(liveRAF);liveRAF=null;livePlaying=false;
}

/* --- DRAG ACCORDI --- */
function nearestCi(li,relX){
  var pos=state.charPos[li]||[];if(!pos.length)return 0;
  var best=0,bd=Infinity;
  for(var i=0;i<pos.length;i++){var d=Math.abs(pos[i]-relX);if(d<bd){bd=d;best=i;}}
  return best;
}
function attachChordDrag(btn,li,c){
  var dragging=false,moved=false,pendingCi=c,startX=0;
  btn.addEventListener("pointerdown",function(e){
    if(e.button!==undefined&&e.button!==0)return;
    dragging=true;moved=false;pendingCi=c;startX=e.clientX;
    try{btn.setPointerCapture(e.pointerId);}catch(err){}
  });
  btn.addEventListener("pointermove",function(e){
    if(!dragging)return;
    if(Math.abs(e.clientX-startX)>3){moved=true;e.preventDefault();btn.classList.add("dragging");}
    if(!moved)return;
    var chr=btn.parentNode;if(!chr)return;
    var rect=chr.getBoundingClientRect();
    var ci=nearestCi(li,e.clientX-rect.left);
    pendingCi=ci;
    var pos=state.charPos[li]||[];
    btn.style.left=(pos[ci]||0)+"px";
  });
  function endDrag(e){
    if(!dragging)return;dragging=false;btn.classList.remove("dragging");
    try{btn.releasePointerCapture(e.pointerId);}catch(err){}
    if(moved&&pendingCi!==c){
      var oldKey=li+"-"+c,newKey=li+"-"+pendingCi;
      var data=state.chords[oldKey];
      if(data){delete state.chords[oldKey];data.anchor=lineAt(li);state.chords[newKey]=data;}
      state.selectedChord={li:li,ci:pendingCi};
      refreshLineChords(li);updateKeyDisplay();scheduleSave();
    }else if(!moved){
      openChordEditor(li,c);   /* clic singolo -> modifica accordo */
    }
  }
  btn.addEventListener("pointerup",endDrag);
  btn.addEventListener("pointercancel",endDrag);
}

/* --- IMPORT DRAG & DROP file di testo --- */
function setupDrop(el){
  el.addEventListener("dragover",function(e){e.preventDefault();el.classList.add("drag-over");});
  el.addEventListener("dragleave",function(e){el.classList.remove("drag-over");});
  el.addEventListener("drop",function(e){
    e.preventDefault();el.classList.remove("drag-over");
    var f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(!f)return;
    var r=new FileReader();
    r.onload=function(){
      var old=state.rawText;
      state.rawText=String(r.result||"").replace(/\r\n/g,"\n");
      reanchorChords(old);pruneInstrumentals();
      if(el.tagName==="TEXTAREA")el.value=state.rawText;
      scheduleSave();
      if(state.mode==="chords")rebuildSheet();
    };
    r.readAsText(f);
  });
}

/* --- CONTROLLI PLAYER (volume + arpeggio) nella sezione "Accordi utilizzati" --- */
function buildDiagramAudio(){
  var cur=Math.round((state.volume==null?1:state.volume)*100);
  var pct=h("span",{class:"vol-pct"},cur+"%");
  var vol=h("input",{type:"range",min:"0",max:"150",value:String(cur),class:"vol-slider","aria-label":T("vol")});
  vol.addEventListener("input",function(){state.volume=(+vol.value)/100;pct.textContent=vol.value+"%";if(currentPlay&&currentPlay.gain){try{currentPlay.gain.gain.value=state.volume;}catch(e){}}scheduleSave();});
  var arpSel=h("select");
  [["aFast",0.6],["aMed",1],["aSlow",1.6]].forEach(function(o){var op=h("option",{value:o[1]},T(o[0]));if(+o[1]===+state.arpSpeed)op.selected=true;arpSel.appendChild(op);});
  arpSel.addEventListener("change",function(){state.arpSpeed=+arpSel.value;scheduleSave();});
  var arpWrap=h("div",{class:"fake-select"+(state.arpeggio?"":" disabled")},arpSel);
  var tgl=h("input",{type:"checkbox",class:"arp-toggle"});tgl.checked=!!state.arpeggio;
  tgl.addEventListener("change",function(){state.arpeggio=tgl.checked;arpWrap.classList.toggle("disabled",!state.arpeggio);scheduleSave();});
  var tglLabel=h("label",{class:"switch-mini"},tgl,h("span",{class:"switch-mini-track"},h("span",{class:"switch-mini-knob"})));
  return h("div",{class:"diagram-audio"},
    h("span",{class:"toolbar-label"},T("vol")),vol,pct,
    h("span",{class:"toolbar-label"},T("arp")),tglLabel,arpWrap
  );
}


