"use strict";
/* ===== Audio: riproduzione accordi (Web Audio, nessuna libreria) ===== */
var AC=null, currentPlay=null;
function ensureAudio(){
  if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C();
    var comp=AC.createDynamicsCompressor();
    comp.threshold.value=-10;comp.knee.value=20;comp.ratio.value=8;comp.attack.value=0.003;comp.release.value=0.25;
    comp.connect(AC.destination);AC.__comp=comp;}
  if(AC.state==="suspended")AC.resume();
  return AC;
}
function midiToFreq(m){return 440*Math.pow(2,(m-69)/12);}
var OPEN_STR=[40,45,50,55,59,64]; /* 6a..1a corda, accordatura standard */
function guitarMidi(name){
  var d=GUITAR[name]||genGuitar(name);if(!d)return null;
  var out=[];
  for(var i=0;i<6;i++){var fr=d.s[i];if(fr>=0)out.push(OPEN_STR[i]+fr);}
  out.sort(function(a,b){return a-b;});
  return out.length?out:null;
}
function pianoMidi(name){
  var pcs=chordNotes(name);if(!pcs)return null;
  var out=[],prev=-1;
  pcs.forEach(function(pc){var m=48+pc;while(m<=prev)m+=12;out.push(m);prev=m;});
  return out.length?out:null;
}
function voice(ctx,master,freq,when,dur,instrument,oscs){
  var g=ctx.createGain();g.connect(master);
  var o=ctx.createOscillator();o.frequency.value=freq;
  if(instrument==="guitar"){
    o.type="sawtooth";
    var lp=ctx.createBiquadFilter();lp.type="lowpass";
    lp.frequency.setValueAtTime(3200,when);lp.frequency.exponentialRampToValueAtTime(900,when+dur);
    o.connect(lp);lp.connect(g);
    g.gain.setValueAtTime(0.0001,when);
    g.gain.exponentialRampToValueAtTime(0.5,when+0.006);
    g.gain.exponentialRampToValueAtTime(0.0001,when+dur);
    oscs.push(o);
  }else{
    o.type="triangle";o.connect(g);
    var o2=ctx.createOscillator();o2.type="sine";o2.frequency.value=freq*2;
    var g2=ctx.createGain();g2.gain.value=0.0001;o2.connect(g2);g2.connect(master);
    g.gain.setValueAtTime(0.0001,when);
    g.gain.exponentialRampToValueAtTime(0.7,when+0.008);
    g.gain.exponentialRampToValueAtTime(0.0001,when+dur);
    g2.gain.setValueAtTime(0.0001,when);
    g2.gain.exponentialRampToValueAtTime(0.2,when+0.008);
    g2.gain.exponentialRampToValueAtTime(0.0001,when+dur*0.7);
    o2.start(when);o2.stop(when+dur+0.05);oscs.push(o2);oscs.push(o);
  }
  o.start(when);o.stop(when+dur+0.05);
}
function stopCurrent(now){
  if(!currentPlay)return;
  try{
    var g=currentPlay.gain;
    g.gain.cancelScheduledValues(now);
    g.gain.setValueAtTime(Math.max(0.0001,g.gain.value||0.0001),now);
    g.gain.exponentialRampToValueAtTime(0.0001,now+0.05);
    currentPlay.oscs.forEach(function(o){try{o.stop(now+0.06);}catch(e){}});
  }catch(e){}
  currentPlay=null;
}
function playChord(notes,instrument,btn){
  var ctx=ensureAudio();if(!ctx||!notes)return;
  var now=ctx.currentTime;
  stopCurrent(now);
  var sp=state.arpSpeed||1;
  var t0=now+0.03,step,dur;
  if(state.arpeggio){step=0.16*sp;dur=0.72;}  /* arpeggiato (solo se attivo) */
  else {step=0;dur=1.4;}                       /* accordo pieno (default) */
  var master=ctx.createGain();master.gain.value=(state.volume==null?1:state.volume);
  master.connect(ctx.__comp||ctx.destination);
  var oscs=[];
  notes.forEach(function(m,i){voice(ctx,master,midiToFreq(m),t0+i*step,dur,instrument,oscs);});
  var endT=t0+(state.arpeggio?(notes.length-1)*step:0)+dur;
  currentPlay={gain:master,oscs:oscs,endTime:endT,btn:btn};
}
function handlePlay(instrument,name,btn){
  var notes=instrument==="guitar"?guitarMidi(name):pianoMidi(name);
  playChord(notes,instrument,btn);
}
function playButton(instrument,name){
  var b=h("button",{class:"play-btn play-"+instrument,title:(instrument==="guitar"?T("dGuitar"):T("dPiano")),"aria-label":"Play "+name});
  b.innerHTML='<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M7 5v14l12-7z" fill="currentColor"/></svg>';
  b.addEventListener("click",function(e){e.stopPropagation();handlePlay(instrument,name,b);
    b.classList.add("pulsing");setTimeout(function(){b.classList.remove("pulsing");},220);});
  return b;
}
