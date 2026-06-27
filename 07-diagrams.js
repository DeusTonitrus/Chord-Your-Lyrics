"use strict";
/* ===== Diagrammi ===== */
function getAllChords(){
  var set={};
  Object.keys(state.chords).forEach(function(k){var tx=state.chords[k].text;if(tx)set[tx]=true;});
  Object.keys(state.instrumentals).forEach(function(li){parseSeq(state.instrumentals[li].seq).forEach(function(tk){if(tk!=="|")set[tk]=true;});});
  return Object.keys(set).sort(function(a,b){
    var ia=SHARP.indexOf((FLAT2SHARP[(a.match(/^[A-G][b#]?/)||[""])[0]])||(a.match(/^[A-G][b#]?/)||[""])[0]);
    var ib=SHARP.indexOf((FLAT2SHARP[(b.match(/^[A-G][b#]?/)||[""])[0]])||(b.match(/^[A-G][b#]?/)||[""])[0]);
    if(ia!==ib)return ia-ib;return a.localeCompare(b);
  });
}
function refreshDiagrams(){fillDiagrams();}
function fillDiagrams(){
  var sec=document.getElementById("diagrams");if(!sec)return;
  sec.innerHTML="";
  var selector=h("div",{class:"diagram-selector"});
  [["none",T("dNone")],["chord",T("dGuitar")],["piano",T("dPiano")],["both",T("dBoth")]].forEach(function(o){
    selector.appendChild(h("button",{class:"diagram-opt"+(state.diagram===o[0]?" active":""),onClick:function(){state.diagram=o[0];fillDiagrams();}},o[1]));
  });
  sec.appendChild(h("div",{class:"diagram-head"},h("div",{class:"diagram-title"},T("diagrams")),selector,buildDiagramAudio()));
  if(state.diagram==="none")return;
  var chords=getAllChords();
  if(chords.length===0){sec.appendChild(h("div",{class:"diagram-empty"},T("noChords")));return;}
  var grid=h("div",{class:"diagrams-grid"});
  var minw=(state.diagram==="piano"||state.diagram==="both")?"300px":"150px";
  grid.style.gridTemplateColumns="repeat(auto-fill,minmax("+minw+",1fr))";
  chords.forEach(function(name){
    var card=h("div",{class:"diagram-card"});
    card.appendChild(h("div",{class:"diagram-chord-name"},name));
    var wrap=h("div",{class:"diagram-svg-wrap"});
    var any=false;
    if(state.diagram==="chord"||state.diagram==="both"){var g=guitarSVG(name);if(g){wrap.appendChild(h("div",{class:"diagram-instr"},g,playButton("guitar",name)));any=true;}}
    if(state.diagram==="piano"||state.diagram==="both"){var p=pianoSVG(name);if(p){wrap.appendChild(h("div",{class:"diagram-instr"},p,playButton("piano",name)));any=true;}}
    if(!any)wrap.appendChild(h("div",{class:"diagram-unknown"},T("unknown")));
    card.appendChild(wrap);
    grid.appendChild(card);
  });
  sec.appendChild(grid);
}

function svgEl(s){var d=document.createElement("div");d.innerHTML=s.trim();return d.firstChild;}

/* qualità riconosciuta -> chiave del template forma movibile */
function normQuality(q){
  q=q||"";
  if(/^maj7|^M7|^Δ/.test(q))return "maj7";
  if(/^maj|^M(?![a-z])/.test(q))return "maj";
  if(/^m7b5|^ø/.test(q))return "m7";       /* approssimazione visiva */
  if(/^dim7|^dim|^°/.test(q))return "dim";
  if(/^aug|^\+/.test(q))return "aug";
  if(/^m7|^min7|^-7/.test(q))return "m7";
  if(/^m6|^min6/.test(q))return "m6";
  if(/^m9|^min9/.test(q))return "m7";
  if(/^6/.test(q))return "6";
  if(/^7|^9|^dom/.test(q))return "7";
  if(/^sus2/.test(q))return "sus2";
  if(/^sus4|^sus/.test(q))return "sus4";
  if(/^m|^min|^-/.test(q))return "m";
  if(q==="")return "maj";
  return "maj";
}
/* forme movibili: offset (in tasti) rispetto al barré, corde [6..1]; -1 = muta */
var SHAPE_E={maj:[0,2,2,1,0,0],m:[0,2,2,0,0,0],"7":[0,2,0,1,0,0],m7:[0,2,0,0,0,0],maj7:[0,2,1,1,0,0],
  sus4:[0,2,2,2,0,0],sus2:[0,2,4,4,0,0],"6":[0,2,2,1,2,0],m6:[0,2,2,0,2,0],aug:[0,3,2,1,1,0],dim:[0,1,2,0,2,0]};
var SHAPE_A={maj:[-1,0,2,2,2,0],m:[-1,0,2,2,1,0],"7":[-1,0,2,0,2,0],m7:[-1,0,2,0,1,0],maj7:[-1,0,2,1,2,0],
  sus4:[-1,0,2,2,3,0],sus2:[-1,0,2,2,0,0],"6":[-1,0,2,2,2,2],m6:[-1,0,2,2,1,2],aug:[-1,0,3,2,2,-1],dim:[-1,0,1,2,1,-1]};
function genGuitar(name){
  var m=name.match(/^([A-G][b#]?)(.*)$/);if(!m)return null;
  var pc=NOTE_PC[m[1]];if(pc==null)return null;
  var q=normQuality(m[2]);
  var fE=(((pc-4)%12)+12)%12, fA=(((pc-9)%12)+12)%12; /* tasto radice su 6a / 5a corda */
  var useE=fE<=fA;
  var tmpl=useE?(SHAPE_E[q]||SHAPE_E.maj):(SHAPE_A[q]||SHAPE_A.maj);
  var barreFret=useE?fE:fA, lowStr=useE?0:1;
  var s=[];
  for(var i=0;i<6;i++){var off=tmpl[i];s.push(off===-1?-1:off+barreFret);}
  var res={s:s, base:barreFret===0?1:barreFret};
  if(barreFret>0)res.barre={fret:barreFret, from:lowStr, to:5};
  return res;
}

function guitarSVG(name){
  var d=GUITAR[name]||genGuitar(name);if(!d)return null;
  var W=120,H=150,padX=18,padTop=30,gw=W-padX*2,gh=100,frets=5,strings=6;
  var sx=gw/(strings-1),fy=gh/frets;
  var ink="#1A1714",blue="#1A50D8";
  var svg='<svg viewBox="0 0 '+W+' '+H+'" width="110" height="138" xmlns="http://www.w3.org/2000/svg">';
  // nut o indicatore tasto base
  var base=d.base||1;
  if(base===1){svg+='<rect x="'+padX+'" y="'+(padTop-4)+'" width="'+gw+'" height="4" fill="'+ink+'"/>';}
  else{svg+='<text x="'+(padX-12)+'" y="'+(padTop+fy*0.72)+'" font-family="JetBrains Mono,monospace" font-weight="700" font-size="11" fill="'+ink+'">'+base+'</text>';}
  // tasti
  for(var f=0;f<=frets;f++){svg+='<line x1="'+padX+'" y1="'+(padTop+f*fy)+'" x2="'+(padX+gw)+'" y2="'+(padTop+f*fy)+'" stroke="'+ink+'" stroke-width="1"/>';}
  // corde
  for(var st=0;st<strings;st++){svg+='<line x1="'+(padX+st*sx)+'" y1="'+padTop+'" x2="'+(padX+st*sx)+'" y2="'+(padTop+gh)+'" stroke="'+ink+'" stroke-width="1"/>';}
  // barré
  if(d.barre){
    var bf=d.barre.fret-(base-1);
    var x1=padX+d.barre.from*sx,x2=padX+d.barre.to*sx,by=padTop+(bf-0.5)*fy;
    svg+='<rect x="'+(x1-5)+'" y="'+(by-5)+'" width="'+(x2-x1+10)+'" height="10" rx="5" fill="'+blue+'" opacity="0.85"/>';
  }
  // pallini, aperte, mute
  for(var s2=0;s2<strings;s2++){
    var fr=d.s[s2];var x=padX+s2*sx;
    if(fr===-1){svg+='<text x="'+(x-3.5)+'" y="'+(padTop-8)+'" font-family="JetBrains Mono,monospace" font-size="10" fill="'+ink+'">×</text>';}
    else if(fr===0){svg+='<circle cx="'+x+'" cy="'+(padTop-11)+'" r="4" fill="none" stroke="'+ink+'" stroke-width="1.3"/>';}
    else{
      var rel=fr-(base-1);
      if(d.barre&&fr===d.barre.fret)continue;
      svg+='<circle cx="'+x+'" cy="'+(padTop+(rel-0.5)*fy)+'" r="5.5" fill="'+blue+'"/>';
    }
  }
  svg+='</svg>';
  return svgEl(svg);
}

function pianoSVG(name){
  var pcs=chordNotes(name);if(!pcs)return null;
  var setm={};pcs.forEach(function(p){setm[p]=true;});
  /* due ottave, tasti larghi e ben distanziati */
  var wkw=20, wkh=84, bkw=12, bkh=52, startX=8, topY=8, gap=0;
  var nWhite=14;
  var W=startX*2+nWhite*wkw, H=topY+wkh+6;
  var ink="#1A1714", blue="#1A50D8", violet="#6D40E0", surf="#FDFCF9", onWhite="#CFDDFF";
  var whitePc=[0,2,4,5,7,9,11,0,2,4,5,7,9,11];
  var svg='<svg viewBox="0 0 '+W+' '+H+'" width="'+(W*0.92)+'" height="'+(H*0.92)+'" xmlns="http://www.w3.org/2000/svg">';
  /* tasti bianchi */
  for(var i=0;i<nWhite;i++){
    var pc=whitePc[i], on=setm[pc], x=startX+i*wkw;
    svg+='<rect x="'+x+'" y="'+topY+'" width="'+(wkw-1)+'" height="'+wkh+'" rx="2" fill="'+(on?onWhite:surf)+'" stroke="'+ink+'" stroke-width="1.2"/>';
    if(on)svg+='<circle cx="'+(x+(wkw-1)/2)+'" cy="'+(topY+wkh-12)+'" r="5" fill="'+blue+'"/>';
  }
  /* tasti neri: dopo i bianchi con indice 0,1,3,4,5 in ogni ottava */
  var blackPc={0:1,1:3,3:6,4:8,5:10,7:1,8:3,10:6,11:8,12:10};
  for(var wi=0;wi<nWhite-1;wi++){
    var bpc=blackPc[wi];if(bpc==null)continue;
    var on2=setm[bpc], x2=startX+(wi+1)*wkw-bkw/2;
    svg+='<rect x="'+x2+'" y="'+topY+'" width="'+bkw+'" height="'+bkh+'" rx="2" fill="'+(on2?violet:ink)+'" stroke="'+ink+'" stroke-width="1"/>';
    if(on2)svg+='<circle cx="'+(x2+bkw/2)+'" cy="'+(topY+bkh-10)+'" r="3.6" fill="'+surf+'"/>';
  }
  svg+='</svg>';
  return svgEl(svg);
}

