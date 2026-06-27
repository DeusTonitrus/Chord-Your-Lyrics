"use strict";
/* --- avvio con ripristino --- */
var _restored=false;
try{_restored=loadSaved();}catch(e){}
renderApp();
updateKeyDisplay();
if(_restored)setTimeout(function(){flash(T("restored"));},300);
