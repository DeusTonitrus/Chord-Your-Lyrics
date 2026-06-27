"use strict";
function chordsForLine(li,line){
  var res=[];
  Object.keys(state.chords).forEach(function(k){var p=k.split("-"),l=+p[0],c=+p[1];if(l===li&&c<=Math.max(0,line.length))res.push({ci:c,text:state.chords[k].text});});
  return res;
}
function buildChordTextLine(lineChords){
  var out="";
  lineChords.slice().sort(function(a,b){return a.ci-b.ci;}).forEach(function(o){
    var start=o.ci<out.length?out.length+1:o.ci;
    out+=new Array(Math.max(0,start-out.length)+1).join(" ")+o.text;
  });
  return out.replace(/\s+$/,"");
}
function buildText(){
  var result=state.title?state.title+"\n\n":"";
  var lines=state.rawText.split("\n");
  lines.forEach(function(line,li){
    if(state.instrumentals[li]){
      var lab=(state.instrumentals[li].label||"").trim(),s=(state.instrumentals[li].seq||"").trim();
      if(lab||s)result+=(lab?lab+":  ":"")+s+"\n";else result+="\n";return;
    }
    var lc=chordsForLine(li,line),cl=lc.length?buildChordTextLine(lc):"";
    if(cl)result+=cl+"\n";result+=line+"\n";
  });
  return result.replace(/\n+$/,"\n");
}
function copyText(){
  var text=buildText();
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(function(){flash(T("copied"));},function(){fallbackCopy(text);});
  else fallbackCopy(text);
}
function fallbackCopy(text){
  try{var ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.left="-9999px";document.body.appendChild(ta);ta.focus();ta.select();document.execCommand("copy");document.body.removeChild(ta);flash(T("copied"));}
  catch(e){flash(T("copyFail"));}
}
function downloadText(){
  var blob=new Blob([buildText()],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob);
  var a=document.createElement("a");a.href=url;a.download=(state.title.trim()||"chord-your-lyrics")+".txt";
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);flash(T("downloaded"));
}
function loadScript(src){
  return new Promise(function(res,rej){
    for(var i=0;i<document.scripts.length;i++)if(document.scripts[i].src===src)return res();
    var s=document.createElement("script");s.src=src;s.onload=function(){res();};s.onerror=function(){rej(new Error("fail"));};document.head.appendChild(s);
  });
}
function exportPDF(){
  commitChord();flash(T("genPdf"),0);
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js")
  .then(function(){return loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");})
  .then(function(){
    var p=document.createElement("div");
    p.style.position="fixed";p.style.left="-99999px";p.style.top="0";p.style.background="#FDFCF9";
    p.style.color="#17181c";p.style.padding="40px 80px 40px 44px";p.style.fontFamily=state.fontFamily;p.style.fontSize=state.fontSize+"px";p.style.width="max-content";
    if(state.title){var ti=document.createElement("div");ti.textContent=state.title;ti.style.fontFamily="Georgia,serif";ti.style.fontStyle="italic";ti.style.fontWeight="700";ti.style.fontSize="1.6em";ti.style.marginBottom="22px";p.appendChild(ti);}
    var lines=state.rawText.split("\n");
    lines.forEach(function(line,li){
      if(state.instrumentals[li]){
        var inst=state.instrumentals[li],lab=(inst.label||"").trim(),toks=parseSeq(inst.seq);
        if(!lab&&toks.length===0){var g=document.createElement("div");g.style.height=".7em";p.appendChild(g);return;}
        var row=document.createElement("div");row.style.margin="8px 0";row.style.display="flex";row.style.flexWrap="wrap";row.style.gap="14px";row.style.alignItems="baseline";
        if(lab){var b=document.createElement("b");b.textContent=lab;b.style.fontFamily="Inter,sans-serif";row.appendChild(b);}
        toks.forEach(function(tk){var s=document.createElement("span");s.textContent=tk;s.style.color=tk==="|"?"#9aa0ab":"#1A50D8";if(tk!=="|")s.style.fontWeight="700";row.appendChild(s);});
        p.appendChild(row);return;
      }
      var ln=document.createElement("div");ln.style.marginBottom="2px";
      var cr=document.createElement("div");cr.style.position="relative";cr.style.height="1.5em";
      var pos=state.charPos[li]||[];
      chordsForLine(li,line).forEach(function(o){var s=document.createElement("span");s.textContent=o.text;s.style.position="absolute";s.style.left=(pos[o.ci]||0)+"px";s.style.bottom="0";s.style.color="#1A50D8";s.style.fontWeight="700";cr.appendChild(s);});
      var lr=document.createElement("div");lr.textContent=line.length?line:"\u00A0";lr.style.whiteSpace="pre";lr.style.lineHeight="1.7";
      ln.appendChild(cr);ln.appendChild(lr);p.appendChild(ln);
    });
    /* diagrammi accordi in fondo, secondo lo strumento scelto */
    if(state.diagram&&state.diagram!=="none"){
      var chs=getAllChords();
      if(chs.length){
        var dt=document.createElement("div");
        dt.textContent=T("diagrams");
        dt.style.fontFamily="Georgia,serif";dt.style.fontStyle="italic";dt.style.fontWeight="700";
        dt.style.fontSize="1.3em";dt.style.margin="34px 0 16px";dt.style.color="#17181c";
        p.appendChild(dt);
        var grid=document.createElement("div");
        grid.style.display="flex";grid.style.flexWrap="wrap";grid.style.gap="18px";grid.style.alignItems="flex-start";
        chs.forEach(function(nm){
          var card=document.createElement("div");
          card.style.border="1px solid #D2CCC0";card.style.borderRadius="10px";
          card.style.padding="12px 10px";card.style.textAlign="center";card.style.background="#fff";
          var cn=document.createElement("div");cn.textContent=nm;
          cn.style.fontFamily=state.fontFamily;cn.style.fontWeight="700";cn.style.fontSize="15px";cn.style.marginBottom="8px";cn.style.color="#17181c";
          card.appendChild(cn);
          var wrap=document.createElement("div");wrap.style.display="flex";wrap.style.flexDirection="column";wrap.style.alignItems="center";wrap.style.gap="10px";
          var any=false,g,pi;
          if(state.diagram==="chord"||state.diagram==="both"){g=guitarSVG(nm);if(g){wrap.appendChild(g);any=true;}}
          if(state.diagram==="piano"||state.diagram==="both"){pi=pianoSVG(nm);if(pi){wrap.appendChild(pi);any=true;}}
          if(!any){var u=document.createElement("div");u.textContent=T("unknown");u.style.color="#7A756E";u.style.fontSize="12px";wrap.appendChild(u);}
          card.appendChild(wrap);
          grid.appendChild(card);
        });
        p.appendChild(grid);
      }
    }
    document.body.appendChild(p);
    return window.html2canvas(p,{scale:2,backgroundColor:"#FDFCF9"}).then(function(canvas){
      document.body.removeChild(p);
      var jsPDF=window.jspdf.jsPDF,pdf=new jsPDF({unit:"pt",format:"a4"});
      var pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight(),margin=36,cw=pw-margin*2,ratio=cw/canvas.width,pageH=(ph-margin*2)/ratio,srcY=0,page=0;
      while(srcY<canvas.height){
        var sliceH=Math.min(pageH,canvas.height-srcY),tmp=document.createElement("canvas");
        tmp.width=canvas.width;tmp.height=sliceH;var tc=tmp.getContext("2d");tc.fillStyle="#FDFCF9";tc.fillRect(0,0,tmp.width,sliceH);
        tc.drawImage(canvas,0,srcY,canvas.width,sliceH,0,0,canvas.width,sliceH);
        if(page>0)pdf.addPage();
        pdf.addImage(tmp.toDataURL("image/png"),"PNG",margin,margin,cw,sliceH*ratio);
        srcY+=sliceH;page++;
      }
      pdf.save((state.title.trim()||"chord-your-lyrics")+".pdf");flash(T("pdfDone"));
    });
  }).catch(function(){flash(T("pdfFail"),2600);});
}

function loadSample(){
  state.rawText=SAMPLE;
  state.chords={
    "0-0":{text:"Em",anchor:"Sotto la luce gialla del lampione"},
    "0-15":{text:"G",anchor:"Sotto la luce gialla del lampione"},
    "1-0":{text:"C",anchor:"canto una strofa che non sa finire"},
    "1-22":{text:"D",anchor:"canto una strofa che non sa finire"},
    "3-12":{text:"Em",anchor:"e intanto la città comincia a dormire"}
  };
  state.instrumentals={};state.mode="chords";scheduleSave();renderApp();
}

function buildFooter(){
  return h("footer",{class:"footer"},
    h("span",null,"© 2025 Chord Your Lyrics"),
    h("span",{class:"footer-sep"},"·"),
    h("span",null,T("footerNote"))
  );
}

