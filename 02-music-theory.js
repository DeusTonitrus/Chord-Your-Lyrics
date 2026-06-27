"use strict";
/* ===== Trasposizione ===== */
var SHARP=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var FLAT2SHARP={Db:"C#",Eb:"D#",Gb:"F#",Ab:"G#",Bb:"A#",Cb:"B",Fb:"E","E#":"F","B#":"C"};
function shiftRoot(root,semis){var r=FLAT2SHARP[root]||root,i=SHARP.indexOf(r);return i<0?root:SHARP[(((i+semis)%12)+12)%12];}
function transposeChord(chord,semis){
  if(!chord||semis===0)return chord;
  return chord.split("/").map(function(part){var m=part.match(/^([A-G][b#]?)(.*)$/);return m?shiftRoot(m[1],semis)+m[2]:part;}).join("/");
}
function parseSeq(seq){return(seq||"").trim().split(/\s+/).filter(Boolean);}
function transposeSeq(seq,semis){
  return parseSeq(seq).map(function(tk){if(tk==="|")return "|";return /^[A-G][b#]?/.test(tk)?transposeChord(tk,semis):tk;}).join(" ");
}

/* ===== Diagrammi chitarra =====
   s = posizione tasto per ogni corda da 6a (Mi basso) a 1a (Mi cantino)
   -1 = corda muta, 0 = corda a vuoto, n = tasto. base = primo tasto del riquadro.
   barre = {fret, from, to} posizione barré (corde 0..5). */
var GUITAR={
 "C":{s:[-1,3,2,0,1,0],base:1},
 "Cm":{s:[-1,3,5,5,4,3],base:1,barre:{fret:3,from:1,to:5}},
 "C#":{s:[-1,4,6,6,6,4],base:1,barre:{fret:4,from:1,to:5}},
 "Db":{s:[-1,4,6,6,6,4],base:1,barre:{fret:4,from:1,to:5}},
 "C#m":{s:[-1,4,6,6,5,4],base:1,barre:{fret:4,from:1,to:5}},
 "D":{s:[-1,-1,0,2,3,2],base:1},
 "Dm":{s:[-1,-1,0,2,3,1],base:1},
 "D#":{s:[-1,6,8,8,8,6],base:1,barre:{fret:6,from:1,to:5}},
 "Eb":{s:[-1,6,8,8,8,6],base:1,barre:{fret:6,from:1,to:5}},
 "D#m":{s:[-1,6,8,8,7,6],base:1,barre:{fret:6,from:1,to:5}},
 "E":{s:[0,2,2,1,0,0],base:1},
 "Em":{s:[0,2,2,0,0,0],base:1},
 "F":{s:[1,3,3,2,1,1],base:1,barre:{fret:1,from:0,to:5}},
 "Fm":{s:[1,3,3,1,1,1],base:1,barre:{fret:1,from:0,to:5}},
 "F#":{s:[2,4,4,3,2,2],base:1,barre:{fret:2,from:0,to:5}},
 "Gb":{s:[2,4,4,3,2,2],base:1,barre:{fret:2,from:0,to:5}},
 "F#m":{s:[2,4,4,2,2,2],base:1,barre:{fret:2,from:0,to:5}},
 "G":{s:[3,2,0,0,0,3],base:1},
 "Gm":{s:[3,5,5,3,3,3],base:1,barre:{fret:3,from:0,to:5}},
 "G#":{s:[4,6,6,5,4,4],base:1,barre:{fret:4,from:0,to:5}},
 "Ab":{s:[4,6,6,5,4,4],base:1,barre:{fret:4,from:0,to:5}},
 "G#m":{s:[4,6,6,4,4,4],base:1,barre:{fret:4,from:0,to:5}},
 "A":{s:[-1,0,2,2,2,0],base:1},
 "Am":{s:[-1,0,2,2,1,0],base:1},
 "A#":{s:[-1,1,3,3,3,1],base:1,barre:{fret:1,from:1,to:5}},
 "Bb":{s:[-1,1,3,3,3,1],base:1,barre:{fret:1,from:1,to:5}},
 "A#m":{s:[-1,1,3,3,2,1],base:1,barre:{fret:1,from:1,to:5}},
 "Bbm":{s:[-1,1,3,3,2,1],base:1,barre:{fret:1,from:1,to:5}},
 "B":{s:[-1,2,4,4,4,2],base:1,barre:{fret:2,from:1,to:5}},
 "Bm":{s:[-1,2,4,4,3,2],base:1,barre:{fret:2,from:1,to:5}},
 "C7":{s:[-1,3,2,3,1,0],base:1},
 "Cmaj7":{s:[-1,3,2,0,0,0],base:1},
 "Cm7":{s:[-1,3,5,3,4,3],base:1,barre:{fret:3,from:1,to:5}},
 "D7":{s:[-1,-1,0,2,1,2],base:1},
 "Dmaj7":{s:[-1,-1,0,2,2,2],base:1},
 "Dm7":{s:[-1,-1,0,2,1,1],base:1},
 "E7":{s:[0,2,0,1,0,0],base:1},
 "Emaj7":{s:[0,2,1,1,0,0],base:1},
 "Em7":{s:[0,2,0,0,0,0],base:1},
 "F7":{s:[1,3,1,2,1,1],base:1,barre:{fret:1,from:0,to:5}},
 "Fmaj7":{s:[-1,-1,3,2,1,0],base:1},
 "Fm7":{s:[1,3,1,1,1,1],base:1,barre:{fret:1,from:0,to:5}},
 "G7":{s:[3,2,0,0,0,1],base:1},
 "Gmaj7":{s:[3,2,0,0,0,2],base:1},
 "Gm7":{s:[3,5,3,3,3,3],base:1,barre:{fret:3,from:0,to:5}},
 "A7":{s:[-1,0,2,0,2,0],base:1},
 "Amaj7":{s:[-1,0,2,1,2,0],base:1},
 "Am7":{s:[-1,0,2,0,1,0],base:1},
 "B7":{s:[-1,2,1,2,0,2],base:1},
 "Bmaj7":{s:[-1,2,4,3,4,2],base:1,barre:{fret:2,from:1,to:5}},
 "Bm7":{s:[-1,2,4,2,3,2],base:1,barre:{fret:2,from:1,to:5}},
 "Csus2":{s:[-1,3,0,0,1,3],base:1},
 "Csus4":{s:[-1,3,3,0,1,1],base:1},
 "Dsus2":{s:[-1,-1,0,2,3,0],base:1},
 "Dsus4":{s:[-1,-1,0,2,3,3],base:1},
 "Esus4":{s:[0,2,2,2,0,0],base:1},
 "Asus2":{s:[-1,0,2,2,0,0],base:1},
 "Asus4":{s:[-1,0,2,2,3,0],base:1},
 "Cdim":{s:[-1,3,4,2,4,2],base:1},
 "Adim":{s:[-1,0,1,2,1,-1],base:1}
};

/* ===== Note accordi pianoforte (pitch class 0..11) ===== */
var NOTE_PC={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11};
function chordNotes(chord){
  var m=chord.match(/^([A-G][b#]?)(.*)$/);
  if(!m) return null;
  var root=NOTE_PC[m[1]];
  if(root==null) return null;
  var q=m[2];
  var iv;
  if(/^maj7|^M7|^Δ/.test(q)) iv=[0,4,7,11];
  else if(/^maj9/.test(q)) iv=[0,4,7,11];
  else if(/^maj|^M(?![a-z])/.test(q)) iv=[0,4,7];        /* triade maggiore esplicita (maj, M) */
  else if(/^m7b5|^min7b5|^ø/.test(q)) iv=[0,3,6,10];
  else if(/^dim7/.test(q)) iv=[0,3,6,9];
  else if(/^dim|^°/.test(q)) iv=[0,3,6];
  else if(/^aug|^\+/.test(q)) iv=[0,4,8];
  else if(/^m7|^min7|^-7/.test(q)) iv=[0,3,7,10];
  else if(/^m6|^min6/.test(q)) iv=[0,3,7,9];
  else if(/^m9|^min9/.test(q)) iv=[0,3,7,10];
  else if(/^6/.test(q)) iv=[0,4,7,9];
  else if(/^7|^9|^dom/.test(q)) iv=[0,4,7,10];
  else if(/^sus2/.test(q)) iv=[0,2,7];
  else if(/^sus4|^sus/.test(q)) iv=[0,5,7];
  else if(/^m|^min|^-/.test(q)) iv=[0,3,7];
  else iv=[0,4,7];
  return iv.map(function(x){return (root+x)%12;});
}

