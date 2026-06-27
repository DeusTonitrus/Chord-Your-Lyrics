# Chord Your Lyrics — struttura multi-file

App per scrivere accordi sopra il testo delle canzoni. Nessun framework, nessuna build: sono semplici file statici. Per usarla apri **`index.html`** in un browser (oppure servila con un qualsiasi web server statico).

> Serve la connessione solo per i font Google e per le librerie PDF (caricate al volo da CDN). Tutto il resto funziona offline.

## Mappa dei file

```
index.html            Pagina principale: monta #root e carica gli script in ordine
css/
  styles.css          Tutto lo stile (variabili colore in :root, layout, modali, Live…)
assets/
  logo-icon.png       Icona (chitarra + foglio) in alto a sinistra
  logo-word.png       Scritta "Chord Your Lyrics"
js/
  01-logo.js          Percorsi dei due loghi (LOGO_ICON / LOGO_WORD)
  02-music-theory.js  Trasposizione, tabella accordi chitarra, note degli accordi
  03-config-i18n.js   Font, dimensioni, testo d'esempio, traduzioni base (12 lingue)
  04-core-state.js    Oggetto `state`, helper h()/T(), flash(), ancoraggio accordi
  05-render.js        renderApp(), nav, barre strumenti, vista Testo/Accordi
  06-sheet.js         Foglio: righe, sezioni, editor accordi, strumentali, rebuild
  07-diagrams.js      Diagrammi chitarra/piano (SVG), forme movibili, fillDiagrams
  08-audio.js         Motore Web Audio: play accordo/arpeggio, MIDI chitarra/piano
  09-export.js        Copia testo, export .txt e PDF
  10-features.js      Traduzioni extra, autosalvataggio, tonalità, autocompletamento,
                      sezioni, export UG/ChordPro, sostituzione, Istruzioni, Live,
                      drag accordi, import file, controlli volume/arpeggio
  11-init.js          Avvio: ripristino salvataggio + primo render
```

## Note per lo sviluppo

- Gli script sono **classici** (non moduli ES) e condividono lo stesso scope globale:
  l'ordine di caricamento in `index.html` rispetta le dipendenze.
- Aggiungendo un nuovo file JS, inseriscilo nel punto giusto della lista in `index.html`.
- Le variabili colore stanno in `:root` dentro `css/styles.css`: cambiando lì il tema
  cambia ovunque, comprese le finestre modali e la modalità Live.
- Le 12 lingue: stringhe base in `03-config-i18n.js` (`I18N`), aggiunte in
  `10-features.js` (`I18N_EXTRA`, unite a runtime). Ogni nuova etichetta va tradotta
  in tutte le lingue.
