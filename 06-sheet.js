"use strict";
/* ===== Foglio ===== */
function buildLyricLine(li,line){
  var chr=h("div",{class:"chord-row",id:"chr-"+li});
  var lyr=h("div",{class:"lyric-row",id:"lyr-"+li});
  for(var ci=0;ci<line.length;ci++){
    (function(ci){lyr.appendChild(h("span",{class:"lch",onClick:function(){openChordEditor(li,ci);}},line.charAt(ci)));})(ci);
  }
  return h("div",{class:"line"},chr,lyr);
}
function buildEmptyLine(li){
  return h("div",{class:"emptyline"},h("button",{class:"addinstr",onClick:function(){convertToInstrumental(li);}},"♩ "+T("addInstr")));
}
function sectionType(label){
  var s=(label||"").toLowerCase();
  if(/pre[-\s]?chorus|chorus|refrain|rit\b|ritornello/.test(s))return "chorus";
  if(/verse|strofa|couplet/.test(s))return "verse";
  if(/bridge|ponte/.test(s))return "bridge";
  if(/intro/.test(s))return "intro";
  if(/outro|coda|finale|ending/.test(s))return "outro";
  if(/solo|assolo/.test(s))return "solo";
  return "other";
}
function buildSectionLine(li,line){
  var label=line.replace(/^\s*\[|\]\s*$/g,"");
  var style={};
  if(state.highlight){
    var col=(state.sectionColors&&state.sectionColors[sectionType(label)])||state.sectionColor||"#E6B8A2";
    style.background=col;style.borderColor=col;
  }
  return h("div",{class:"section-line"+(state.highlight?" on":""),style:style},label);
}
function renderChips(container,seq){
  container.innerHTML="";
  var toks=parseSeq(seq);
  if(toks.length===0){container.appendChild(h("span",{class:"instr-empty"},T("instrEmpty")));return;}
  toks.forEach(function(tk){container.appendChild(tk==="|"?h("span",{class:"bar-sep"},"|"):h("span",{class:"chord-chip"},tk));});
}
function buildInstrBlock(li){
  var inst=state.instrumentals[li];
  var labelInput=h("input",{class:"instr-label",placeholder:T("instrPh")});
  labelInput.value=inst.label||"";
  labelInput.addEventListener("input",function(){state.instrumentals[li].label=labelInput.value;});
  var addBtn=h("button",{class:"instr-icon-btn add",title:T("addBelow"),onClick:function(){insertInstrumentalAfter(li);}},"+");
  var rmBtn=h("button",{class:"instr-icon-btn rm",title:T("removeInstr"),onClick:function(){removeInstrumental(li);},html:"&times;"});
  var chips=h("div",{class:"instr-chips"});renderChips(chips,inst.seq);
  var seqInput=h("input",{class:"instr-seq",placeholder:T("seqPh")});
  seqInput.value=inst.seq||"";
  seqInput.addEventListener("input",function(){state.instrumentals[li].seq=seqInput.value;renderChips(chips,seqInput.value);refreshDiagrams();});
  return h("div",{class:"instr-block"},
    h("div",{class:"instr-top"},h("span",{class:"instr-badge",html:"&#9833;"}),labelInput,h("div",{class:"instr-btns"},addBtn,rmBtn)),
    chips,seqInput);
}

function fillSheet(){
  var sheet=document.getElementById("sheet");
  if(!sheet)return;
  sheet.style.fontFamily=state.fontFamily;sheet.style.fontSize=state.fontSize+"px";
  sheet.innerHTML="";state.charPos={};
  var lines=state.rawText.split("\n");
  lines.forEach(function(line,li){
    if(state.instrumentals[li])sheet.appendChild(buildInstrBlock(li));
    else if(isSection(line))sheet.appendChild(buildSectionLine(li,line));
    else if(line.length===0)sheet.appendChild(buildEmptyLine(li));
    else sheet.appendChild(buildLyricLine(li,line));
  });
  lines.forEach(function(line,li){
    if(state.instrumentals[li]||line.length===0||isSection(line))return;
    var row=document.getElementById("lyr-"+li);if(!row)return;
    var arr=[],sp=row.children;
    for(var k=0;k<sp.length;k++)arr.push(sp[k].offsetLeft);
    if(sp.length){var last=sp[sp.length-1];arr.push(last.offsetLeft+last.offsetWidth);}else arr.push(0);
    state.charPos[li]=arr;
    refreshLineChords(li);
  });
}

function refreshLineChords(li){
  var chr=document.getElementById("chr-"+li);if(!chr)return;
  chr.innerHTML="";
  var pos=state.charPos[li]||[],line=lineAt(li);
  Object.keys(state.chords).forEach(function(key){
    var p=key.split("-"),l=+p[0],c=+p[1];
    if(l!==li||c>Math.max(0,line.length))return;
    if(state.editing&&state.editing.li===li&&state.editing.ci===c)return;
    var sel=state.selectedChord&&state.selectedChord.li===li&&state.selectedChord.ci===c;
    var btn=h("button",{class:"chord"+(sel?" selected":""),style:{left:(pos[c]||0)+"px"}},chordText(li,c));
    attachChordDrag(btn,li,c);
    chr.appendChild(btn);
  });
  if(state.editing&&state.editing.li===li){
    var ci=state.editing.ci;
    var inp=h("input",{class:"chord-popup",placeholder:T("chordPh"),style:{left:(pos[ci]||0)+"px"}});
    inp.value=chordText(li,ci)||"";
    inp.addEventListener("input",function(){acShow(inp);});
    inp.addEventListener("keydown",function(e){
      if(e.key==="ArrowDown"){e.preventDefault();acMove(1);}
      else if(e.key==="ArrowUp"){e.preventDefault();acMove(-1);}
      else if(e.key==="Enter"){e.preventDefault();if(acIndex>=0)acAccept(inp);else acClose();commitChord();}
      else if(e.key==="Escape"){if(acBox){acClose();}else cancelChord();}
    });
    inp.addEventListener("blur",function(){setTimeout(function(){acClose();commitChord();},120);});
    chr.appendChild(inp);
    setTimeout(function(){inp.focus();inp.select();acShow(inp);},0);
  }
  var lyr=document.getElementById("lyr-"+li);
  if(lyr)for(var i=0;i<lyr.children.length;i++){
    var sp=lyr.children[i];
    if(chordText(li,i))sp.classList.add("marked");else sp.classList.remove("marked");
    if(state.editing&&state.editing.li===li&&state.editing.ci===i)sp.classList.add("cursor");else sp.classList.remove("cursor");
  }
}

function openChordEditor(li,ci){if(state.mode!=="chords")return;commitChord();state.editing={li:li,ci:ci};refreshLineChords(li);}
function commitChord(){
  if(!state.editing)return;
  var li=state.editing.li,ci=state.editing.ci;
  var chr=document.getElementById("chr-"+li);
  var inp=chr?chr.querySelector(".chord-popup"):null;
  var val=inp?inp.value.trim():"";
  var key=li+"-"+ci;
  if(val)state.chords[key]={text:val,anchor:lineAt(li)};else delete state.chords[key];
  state.editing=null;refreshLineChords(li);refreshDiagrams();updateKeyDisplay();scheduleSave();
}
function cancelChord(){if(!state.editing)return;var li=state.editing.li;state.editing=null;refreshLineChords(li);}

function transposeAll(semis){
  commitChord();
  Object.keys(state.chords).forEach(function(k){state.chords[k].text=transposeChord(state.chords[k].text,semis);});
  Object.keys(state.instrumentals).forEach(function(l){state.instrumentals[l].seq=transposeSeq(state.instrumentals[l].seq,semis);});
  rebuildSheet();
}
function clearAll(){
  if((Object.keys(state.chords).length||Object.keys(state.instrumentals).length)&&window.confirm(T("confirmClear"))){
    state.chords={};state.instrumentals={};state.editing=null;rebuildSheet();
  }
}
function addInstrumental(){
  commitChord();
  var ls=state.rawText===""?[]:state.rawText.split("\n");ls.push("");
  var idx=ls.length-1;state.rawText=ls.join("\n");state.instrumentals[idx]={label:"",seq:""};
  rebuildSheet();flash(T("addedInstr"));
}
function convertToInstrumental(li){commitChord();state.instrumentals[li]={label:"",seq:""};rebuildSheet();}
function removeInstrumental(li){delete state.instrumentals[li];rebuildSheet();}
function insertInstrumentalAfter(li){
  commitChord();
  var ls=state.rawText.split("\n");ls.splice(li+1,0,"");
  var nc={};
  Object.keys(state.chords).forEach(function(k){var p=k.split("-"),l=+p[0],c=+p[1];nc[(l>li?l+1:l)+"-"+c]=state.chords[k];});
  state.chords=nc;
  var ni={};
  Object.keys(state.instrumentals).forEach(function(l){var L=+l;ni[(L>li?L+1:L)]=state.instrumentals[l];});
  ni[li+1]={label:"",seq:""};state.instrumentals=ni;
  state.rawText=ls.join("\n");rebuildSheet();
}
function rebuildSheet(){commitChord();fillSheet();fillDiagrams();updateKeyDisplay();scheduleSave();}

