"use strict";
/* ===== STATO =====
   chords: { "li-ci": {text, anchor} } dove anchor = testo della parola/riga ancorata
   In realtà ancoriamo alla RIGA: ogni accordo memorizza la stringa della riga
   su cui è stato messo, così possiamo riassociarlo se il testo cambia. */
var state={
  title:"", rawText:"", mode:"edit",
  fontFamily:FONTS[0].value, fontSize:16,
  chords:{}, instrumentals:{}, charPos:{}, editing:null,
  lang:"it", diagram:"none"
};

var root=document.getElementById("root");
var toastEl=null;

function T(k){return (I18N[state.lang]&&I18N[state.lang][k])||I18N.it[k]||k;}

function h(tag,attrs){
  var e=document.createElement(tag),k;
  if(attrs)for(k in attrs){
    if(!attrs.hasOwnProperty(k))continue;
    var v=attrs[k]; if(v==null)continue;
    if(k==="class")e.className=v;
    else if(k==="html")e.innerHTML=v;
    else if(k==="style"&&typeof v==="object"){for(var s in v)e.style[s]=v[s];}
    else if(k.indexOf("on")===0&&typeof v==="function")e.addEventListener(k.slice(2).toLowerCase(),v);
    else e.setAttribute(k,v);
  }
  for(var i=2;i<arguments.length;i++){
    var kid=arguments[i]; if(kid==null||kid===false)continue;
    if(kid instanceof Array){for(var j=0;j<kid.length;j++){if(kid[j]!=null&&kid[j]!==false)e.appendChild(typeof kid[j]==="string"?document.createTextNode(kid[j]):kid[j]);}}
    else e.appendChild(typeof kid==="string"?document.createTextNode(kid):kid);
  }
  return e;
}
function flash(msg,ms){
  if(ms===undefined)ms=1800;
  if(!toastEl){toastEl=h("div",{class:"toast"});document.body.appendChild(toastEl);}
  toastEl.textContent=msg; toastEl.className="toast show";
  if(flash._t)clearTimeout(flash._t);
  if(ms)flash._t=setTimeout(function(){toastEl.className="toast";},ms);
}
function hasText(){return state.rawText.trim().length>0||Object.keys(state.instrumentals).length>0;}
function lineAt(li){return state.rawText.split("\n")[li]||"";}

/* ===== ANCORAGGIO ACCORDI AL TESTO =====
   Ogni accordo è { text, anchor } dove anchor è la riga di testo su cui è stato
   posizionato. Quando il testo cambia (in modalità Testo), riassociamo gli accordi:
   per ogni accordo cerchiamo la riga il cui contenuto corrisponde all'anchor e
   manteniamo la posizione del carattere se ancora valida; altrimenti l'accordo
   viene eliminato. Così gli accordi seguono il testo e spariscono se il testo
   a cui erano legati viene rimosso. */
function reanchorChords(oldText){
  var newLines=state.rawText.split("\n");
  var oldLines=(oldText||"").split("\n");
  var used={}; // newLineIndex -> true (per non assegnare due accordi-riga allo stesso target ambiguo)
  var next={};
  // raggruppa accordi per riga originale
  var byLine={};
  Object.keys(state.chords).forEach(function(key){
    var p=key.split("-"), li=+p[0], ci=+p[1];
    (byLine[li]=byLine[li]||[]).push({ci:ci, ch:state.chords[key]});
  });
  Object.keys(byLine).forEach(function(oli){
    oli=+oli;
    var anchorText=(byLine[oli][0]&&byLine[oli][0].ch.anchor!=null)?byLine[oli][0].ch.anchor:oldLines[oli];
    // trova la nuova riga corrispondente all'anchor (prima non ancora usata)
    var target=-1;
    for(var n=0;n<newLines.length;n++){
      if(used[n])continue;
      if(newLines[n]===anchorText){target=n;break;}
    }
    if(target===-1)return; // riga eliminata -> accordi eliminati
    used[target]=true;
    byLine[oli].forEach(function(o){
      if(o.ci<=newLines[target].length){
        next[target+"-"+o.ci]={text:o.ch.text,anchor:newLines[target]};
      }
    });
  });
  state.chords=next;
}

/* normalizza eventuali accordi salvati come stringa (compatibilità) */
function chordText(li,ci){var c=state.chords[li+"-"+ci];if(!c)return null;return typeof c==="string"?c:c.text;}

