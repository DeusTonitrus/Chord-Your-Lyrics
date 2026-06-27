"use strict";
/* ===== RENDER ===== */
function renderApp(){
  document.documentElement.lang=state.lang;
  root.innerHTML="";
  root.appendChild(buildNav());
  root.appendChild(h("div",{class:"gradient-rule"}));
  var main=h("main",{class:"main"});
  main.appendChild(buildTitle());
  main.appendChild(state.mode==="edit"?buildEditView():buildChordsView());
  root.appendChild(main);
  root.appendChild(buildFooter());
  if(!toastEl){toastEl=h("div",{class:"toast"});}
  root.appendChild(toastEl);
  if(state.mode==="chords")rebuildSheet();
}

function buildNav(){
  function tab(label,m){
    var b=h("button",{class:"tab"+(state.mode===m?" active":""),onClick:function(){
      if(m==="chords"&&!hasText()){flash(T("pasteFirst"));return;}
      commitChord();state.mode=m;renderApp();
    }},label);
    if(m==="chords"&&!hasText())b.disabled=true;
    return b;
  }
  var actions=h("div",{class:"nav-actions"});
  if(state.mode==="chords"){
    actions.appendChild(h("span",{class:"key-display",id:"key-display"}));
    actions.appendChild(h("button",{class:"btn-ghost sm",onClick:openLive},"▶ "+T("live")));
    actions.appendChild(h("button",{class:"btn-ghost sm",onClick:copyText},T("copy")));
    actions.appendChild(h("button",{class:"btn-ghost sm",onClick:downloadText},T("txt")));
    actions.appendChild(h("button",{class:"btn-primary sm",onClick:exportPDF},T("pdf")));
    actions.appendChild(h("button",{class:"btn-ghost sm danger",onClick:clearAll},T("clear")));
  }
  var sel=h("select",{class:"lang-select","aria-label":T("language"),onChange:function(){state.lang=sel.value;renderApp();}});
  LANG_ORDER.forEach(function(code){
    var op=h("option",{value:code},I18N[code].lname);
    if(code===state.lang)op.selected=true;
    sel.appendChild(op);
  });
  actions.appendChild(h("button",{class:"btn-ghost sm",onClick:openHelp,title:T("help")},"❔ "+T("help")));
  actions.appendChild(sel);
  return h("nav",{class:"nav"},
    h("div",{class:"nav-logo"},h("img",{class:"nav-logo-icon",src:LOGO_ICON,alt:""}),h("img",{class:"nav-logo-word",src:LOGO_WORD,alt:"Chord Your Lyrics"})),
    h("div",{class:"nav-tabs"},tab(T("text"),"edit"),tab(T("chords"),"chords")),
    h("div",{class:"nav-spacer"}),
    actions
  );
}

function buildTitle(){
  var i=h("input",{class:"song-title",placeholder:T("titlePh")});
  i.value=state.title;
  i.addEventListener("input",function(){state.title=i.value;scheduleSave();});
  return h("div",{class:"song-title-wrap"},i);
}

function buildEditView(){
  var ta=h("textarea",{class:"textarea",placeholder:T("editorHint")});
  ta.spellcheck=false;ta.value=state.rawText;
  ta.addEventListener("input",function(){
    var old=state.rawText;
    state.rawText=ta.value;
    reanchorChords(old);
    pruneInstrumentals();
    scheduleSave();
  });
  setupDrop(ta);
  var dropHint=h("p",{class:"drop-hint"},T("dropHint"));
  var kids=[];
  if(!hasText())kids.push(h("button",{class:"btn-ghost",onClick:loadSample},T("sample")));
  kids.push(h("button",{class:"btn-primary",onClick:function(){
    if(!hasText()){flash(T("pasteFirst"));return;}
    state.mode="chords";renderApp();
  }},T("toChords")));
  return h("div",{class:"editbox"},ta,dropHint,h("div",{class:"editbar"},kids));
}

function pruneInstrumentals(){
  var nLines=state.rawText.split("\n").length;
  Object.keys(state.instrumentals).forEach(function(li){if(+li>=nLines)delete state.instrumentals[li];});
}

function buildFakeSelect(labelText,options,current,onChange){
  var sel=h("select");
  options.forEach(function(o){var op=h("option",{value:o.value},o.label);if(String(o.value)===String(current))op.selected=true;sel.appendChild(op);});
  sel.addEventListener("change",function(){onChange(sel.value);});
  return h("div",{class:"fake-select"},h("span",{class:"toolbar-label"},labelText),sel);
}

function buildChordsView(){
  var toolbar=h("div",{class:"toolbar"},
    h("div",{class:"toolbar-group"},
      h("span",{class:"toolbar-label"},T("transpose")),
      h("button",{class:"pill-btn",onClick:function(){transposeAll(-1);}},"−"),
      h("button",{class:"pill-btn",onClick:function(){transposeAll(1);}},"+")
    ),
    h("div",{class:"toolbar-sep"}),
    buildFakeSelect(T("font"),FONTS,state.fontFamily,function(v){state.fontFamily=v;rebuildSheet();}),
    buildFakeSelect(T("size"),SIZES.map(function(s){return{label:s+" px",value:s};}),state.fontSize,function(v){state.fontSize=+v;rebuildSheet();}),
    h("div",{class:"toolbar-sep"}),
    h("div",{class:"toolbar-group"},
      h("span",{class:"toolbar-label"},T("instrumental")),
      h("button",{class:"pill-btn add",onClick:addInstrumental},"&#9833; +".replace("&#9833;","♩"))
    )
  );
  var hint=h("p",{class:"hint"},T("hint"));

  /* seconda riga strumenti: sezioni, audio, esportazioni, sostituzione */
  var hlToggle=h("label",{class:"switch"},
    (function(){var c=h("input",{type:"checkbox"});if(state.highlight)c.checked=true;
      c.addEventListener("change",function(){state.highlight=c.checked;rebuildSheet();});return c;})(),
    h("span",{class:"switch-track"}),h("span",{class:"toolbar-label"},T("hl")));
  var SEC_TYPES=[["verse","Verse"],["chorus","Chorus"],["bridge","Bridge"],["intro","Intro"],["outro","Outro"],["solo","Solo"]];
  var secColors=h("div",{class:"sec-colors"});
  SEC_TYPES.forEach(function(t){
    var ci=h("input",{type:"color",value:(state.sectionColors&&state.sectionColors[t[0]])||"#E6B8A2",class:"color-inp sm","aria-label":t[1]});
    ci.addEventListener("input",function(){state.sectionColors[t[0]]=ci.value;if(state.highlight)rebuildSheet();else scheduleSave();});
    secColors.appendChild(h("label",{class:"sec-color-item"},h("span",{class:"sec-color-name"},t[1]),ci));
  });
  var toolbar2=h("div",{class:"toolbar toolbar2"},
    h("div",{class:"toolbar-group sec-hl-group"},hlToggle,secColors),
    h("div",{class:"toolbar-sep"}),
    h("button",{class:"btn-ghost sm",onClick:openReplace},T("find")),
    h("button",{class:"btn-ghost sm",onClick:exportUG},T("expUG")),
    h("button",{class:"btn-ghost sm",onClick:exportChordPro},T("expCP"))
  );
  var disc=h("p",{class:"hl-disc"+(state.highlight?" show":"")},T("hlDisc"));

  var sheet=h("div",{class:"sheet",id:"sheet"});
  var diagrams=h("div",{class:"diagram-section",id:"diagrams"});
  return h("div",null,toolbar,toolbar2,disc,hint,sheet,diagrams);
}

