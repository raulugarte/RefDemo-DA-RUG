# Projekt-Briefing: refdemo-da-rug (Vireon Energy Demo)

Dieses Dokument fasst den aktuellen Stand des Projekts zusammen, damit Claude Code ohne weitere Rückfragen produktiv starten kann.

## Projekt-Identität

- **da.live Content-Projekt:** `raulugarte/refdemo-da-rug` (https://da.live/#/raulugarte/refdemo-da-rug)
- **GitHub Code-Repo (vermutlich):** `github.com/raulugarte/refdemo-da-rug` - bitte verifizieren, siehe Aufgabe 0.
- **Preview-Domain:** https://main--refdemo-da-rug--raulugarte.aem.page/
- **Live-Domain:** https://main--refdemo-da-rug--raulugarte.aem.live/
- **Basis:** AEM Edge Delivery Services, WKND-Boilerplate (Standard-Blockstruktur: `blocks/<name>/<name>.{js,css}`, globale Styles in `styles/styles.css`)

## Aufgabe 0 - Verifizieren

Vor allem anderen: bestätigen, dass das lokale Repo tatsächlich `raulugarte/refdemo-da-rug` ist (`git remote -v`), und dass ein `main`-Branch existiert, der auf aem.page/aem.live deployt.

---

## Bereits vorhandene Blocks im Repo (bestätigt via GitHub-Dateiliste)

`accordion, cards, carousel, columns, dynamicmedia-template, embed, footer, form, fragment, header, hero, modal, quote, search, table, tabs, teaser, video`

### Bestätigter Funktions-/CSS-Stand (durch Code-Review geprüft, nicht raten)

**hero.css** - vorhanden, funktioniert. Aufbau: 3-zeilige Tabelle (Bild / H1-Titel / Textabsatz+Link), keine Merge-Notwendigkeit.

**cards.css** - vorhanden, sehr ausgebaut, mehrere Varianten: `image-top`, `image-bottom`, `image-left`, `image-right`, `teaser-overlay`, `teaser-card`, `gradient`. Titel in der Textzelle muss als H1 formatiert sein (siehe `.cards-card-body h1` Selektor). **WICHTIG, live in da.live bestätigt:** Jede Kartenzeile braucht zwingend **drei Spalten** - Bild | Text | dritte Spalte leer lassen -, nicht nur zwei. `cards.js` liest den ersten Absatz der jeweils *letzten* Zellen-Spalte als Varianten-Klasse und **entfernt anschließend diese ganze Spalte**. Bei nur zwei Spalten ist das die Textspalte - Titel, Text und Link verschwinden dadurch komplett aus der gerenderten Karte. Die dritte Spalte leer lassen schützt die Textspalte davor (sie selbst wird nicht sichtbar gerendert); nur bei tatsächlich gewünschter Variante (z. B. `image-top`, `teaser-overlay`) das entsprechende Stichwort in diese dritte Spalte eintragen (siehe `component-models.json`, Modell `card`, Feld "Variant"). **Nachgeprüft: der Blockname-Suffix in der Kopfzeile (z. B. "Cards (image-top)") wird von `cards.js` nirgends ausgelesen** - die Variante wirkt ausschließlich über die dritte Spalte pro Zeile. Einzige Ausnahme ist `gradient`, die einzige Variante mit einer echten Block-Level-CSS-Regel (`.cards.gradient .cards-card-image`, kein `li`-Selektor) - für alle anderen Varianten gibt es keine solche Regel, ein Suffix in der Kopfzeile ist dort wirkungslos. Kopfzeilen in den Templates unten daher einheitlich als reines `Cards` ohne Suffix.

**table.css** - vorhanden, funktioniert, inkl. `striped`-, `no-header`- und `bordered`-Varianten. WICHTIG: Autoren müssen **eine einzige, zusammenhängende Tabelle** anlegen (Kopfzeile "Table (striped)" über beide Spalten gemerged, direkt gefolgt von den echten Datenzeilen in derselben Tabelle) - table.js konvertiert das zu echtem `<table><thead><tbody>`. Zwei separate Tabellen (Aktivierung + Daten getrennt) funktionieren NICHT.

**accordion.css** - vorhanden, funktioniert nativ über `<details>/<summary>`, keine eigene JS-Toggle-Logik nötig. Einfache 2-spaltige Tabelle reicht (Frage | Antwort).

**teaser.css/teaser.js** - vorhanden, aber strukturell komplett anders als in früheren Notizen angenommen: kein "Bild + H2 + Text + Link"-Muster, und **keine `teaser-overlay`-Variante** - die gehört zu `cards.css` (dort korrekt als Karten-Variante gelistet), wurde hier fälschlich auch dem `teaser`-Block zugeschrieben. Stattdessen liest der Block ein festes Key/Value-Schema: `imageRef`/`imageAlt` (Bild-Modus) oder `videoReference`+`videoBehavior` (Video-Modus, wenn `teaserStyle = video`), ein einzelner `teaserBlurb`-Rich-Text-Block (wird als `<h1>` gerendert, kein separater Absatz), plus `btn-text`/`btn-style`/`btn-link` für den einen Button-Link (siehe `component-models.json`, Eintrag `id: teaser`). Layout ist fix: große kreisrunde "Swoosh"-Grafik (595x595px) neben Titel+Button, feste Blockhöhe 538px - keine Bild-links/Text-rechts-Bannervariante. **Für die Vireon-Templates aktuell nicht genutzt** - dort wird stattdessen `cards` (Varianten `teaser-overlay`/`image-top`) verwendet, siehe `vireon-energy-templates.md`.

**Section Metadata** (in `styles/styles.css`, kein eigener Block-Ordner):
- Feld `Style` → wird zu CSS-Klasse. Gültige Werte: `light`, `highlight`, `bg-default`, `bg-theme`, `bg-dark`, `bg-light` - plus zwei neu ergänzte Werte `text-center` und `split-feature` (siehe `vireon-energy-templates.md`, Abschnitt "Neue Blocks - Spezifikation", dort auch der genaue CSS-Code zum Einfügen).
- Feld `Sec Spacing` → wird zu `data-sec-spacing`. Werte: `section-none`, `section-xtiny`, `section-tiny`, `section-xxsmall`, `section-xsmall`, `section-regular`, `section-small`, `section-medium`, `section-large`, `section-xlarge`, `section-huge`, `section-xhuge`
- Feld `Sec Spacing Bottom` → analog, `data-sec-spacing-bottom`
- Feld `Sec Full Width` → `data-sec-full-width`, Wert `true`
- Autocomplete/Farb-Swatch-Vorschläge beim Eintippen dieser Werte in da.live funktionieren NICHT (getestet, kein Ergebnis) - rein kosmetisches Feature, hat keinen Einfluss auf die tatsächliche Funktion.

**Drei neue Blocks für die volle Startseiten-Struktur** (noch nicht im Repo, Spezifikation in `vireon-energy-templates.md`): `link-list`, `news-list`, `key-figures`. Vor Beginn der Umsetzung dort die genaue Tabellenstruktur und das erwartete Rendering-Verhalten lesen.

**Icons** (`/icons/*.svg`, Code-Asset, kein da.live-Inhalt): `cancel`, `next`, `prev`, `search`, `search-light`, `search-white`, `teaser_innerswoosh`, `teaser_outerswoosh`, `video-pause`, `video-play` (Duplikat `video_play.svg` mit Unterstrich vorhanden, vermutlich Altlast). Eingebunden im Dokument über `:iconname:`, wird von `scripts.js` automatisch durch das SVG ersetzt.

### Noch ungeprüfte, vorhandene Blocks (nicht angefasst, nur zur Kenntnis)
`carousel, columns, dynamicmedia-template, embed, footer, form, fragment, header, modal, quote, search, tabs, video` - `quote` und `columns` werden in den Vireon-Templates unten verwendet, ihr genaues CSS wurde noch nicht geprüft. Bei Bedarf zuerst deren `.css`/`.js` lesen, bevor Inhalt eingefügt wird - nicht blind von Standard-Markup ausgehen (siehe Table/Accordion-Beispiel oben, wo die Realität von der Doku-Annahme abwich; `teaser` ist ein weiteres Beispiel dafür, siehe oben - dort ebenfalls die reale Struktur geprüft statt angenommen).

---

## da.live Library-Konfiguration (bereits eingerichtet und bestätigt funktionierend)

Config-Sheet (`https://da.live/config#/raulugarte/refdemo-da-rug/`), Tab `library`:

| title | path |
|---|---|
| Blocks | https://content.da.live/raulugarte/refdemo-da-rug/library/blocks.json |
| Templates | https://content.da.live/raulugarte/refdemo-da-rug/library/templates.json |
| Icons | https://content.da.live/raulugarte/refdemo-da-rug/library/icons.json |
| Placeholders | https://content.da.live/raulugarte/refdemo-da-rug/library/placeholders.json |

Bestätigt funktionierend: Blocks (alle 5 Basis-Blocks), Icons. Noch offen: Templates (Inhalt siehe unten), Placeholders (noch nicht begonnen).

---

## Vireon Energy Branding (Farb-Override)

Eure `styles/styles.css` hat bereits einen vorbereiteten, aktuell auskommentierten Override-Mechanismus für genau diesen Zweck (ganz oben in der Datei, vor dem Haupt-`:root`-Block). Diesen Block **einkommentieren und mit folgenden Werten ersetzen** - keine neue CSS-Struktur nötig, das bestehende System übernimmt den Rest automatisch (Section-Metadata-Klassen wie `bg-dark`/`bg-light`/`bg-theme`, Link-Farben, Button-Farben leiten sich alle von diesen Variablen ab):

```css
:root {
  --brand-theme-color: #1B7A70;
  --brand-dark-color: #10242E;
  --brand-light-color: #E7F0EC;
  --brand-link-color: #10242E;
  --brand-link-hover-color: #1B7A70;
  --brand-text-color: #16222A;
  --brand-light-text-color: #FFFFFF;
}
```

**Herkunft/Begründung:** Angelehnt an den öffentlich bekannten RWE-Markenblauton (`#1D4276`, nicht offiziell von RWE bestätigt, aus dem Logo abgeleitet), aber bewusst in eine eigenständige, leicht grünlich-teal Richtung verschoben (`#1B7A70`) statt identisch übernommen - passend zur Positionierung von Vireon Energy auf erneuerbare Energien statt reinem Konzern-Blau.

---

## Aufgabe: Vireon Energy Demo-Inhalte

**Kontext:** Demo-Firma "Vireon Energy" (fiktiv, erneuerbare Energien: Wind/Solar/Batterie/Wasserstoff, gegründet 1968, Sitz Bremen), Struktur angelehnt an den Seitenaufbau typischer Energiekonzern-Websites (Hero → Statement → Geschäftsbereiche als Kacheln → Nachhaltigkeits-Block → CTA → Footer). Kein Bezug zu einer realen Firma, aller Text frei erfunden.

### Referenzstruktur - vollständig, aus Screenshot-Analyse (generisch beschrieben, keine Original-Texte)

Diese Struktur ist deutlich umfangreicher als die aktuell umgesetzten Vireon-Templates unten - sie dient als vollständige Referenz, falls die Seite später erweitert werden soll. Beschreibung bewusst auf Modultyp/Layout reduziert, keine Original-Formulierungen übernommen.

**Navigation** (zweistufiges Flyout-Menü, kein einfaches Dropdown):
- Sichtbare Nav-Leiste: links Hamburger-Menüpunkt, "Contact"-Icon+Label, "Apps & Tools"-Icon+Label; mittig Logo; rechts Regions-/Sprachlink mit Globus-Icon, Such-Icon, Sprachauswahl-Dropdown.
- Geöffnetes Menü: linke Spalte = Liste der Hauptkategorien (ca. 9 Einträge). Rechte Spalte = kontextabhängiges Untermenü zur aktuell gewählten Hauptkategorie, bis zu zwei Verschachtelungsebenen (Unterpunkt → weitere Unter-Unterpunkte). Zusätzlich oben rechts im Menü eine kleine, vom gewählten Punkt unabhängige Promo-Karte (Bild + Kurztext + Link).
- **Technisch wichtig:** Auf der Startseite liegt die Nav-Leiste transparent ÜBER dem Hero-Bild, kein eigener solider Hintergrundbalken. Muss geprüft werden, ob `header.css` aktuell eine transparente/Overlay-Variante unterstützt, oder ob das neu gebaut werden muss.

**Hero** (Screenshot 1):
- Full-Bleed Bild/Carousel, sehr hoch (nahezu volle Viewport-Höhe), Navigation liegt transparent darüber (siehe oben) - das Bild liegt technisch hinter der Nav, nicht darunter.
- Ein einzelnes, halbtransparentes helles Content-Panel, linksbündig positioniert (nicht zentriert), vertikal etwa mittig: fette Überschrift, ein Untertitel-Satz, ein CTA-Button (teal).
- Am unteren Bildrand: Karussell-Steuerung (Punkte-Indikator zentriert, Pfeil-Navigation links).
- **Block-Empfehlung:** vorhandener `carousel`-Block passt strukturell (mehrere Slides, je Slide Bild+Text+CTA). Die transparente Nav-Überlagerung ist wahrscheinlich eine Anpassung in `header.css`, nicht im Carousel-Block selbst.

**Sektionen unterhalb des Heros, der Reihe nach** (Screenshots 2+3):

| # | Modul | Layout | Naheliegender Block |
|---|---|---|---|
| 1 | Kurzmeldung/Spotlight | Text links + kleines Bild rechts, schmal | `columns` oder `teaser` |
| 2 | Zitat/Statement | Große zentrierte Überschrift, ein Satz | `quote` |
| 3 | Text + Video | 2-spaltig: Text+CTA links, Video-Thumbnail mit Play-Icon rechts | `columns` + `embed`/`video` |
| 4 | Zentrierte Sektionsüberschrift + Intro | Reiner Text, kein Bild, zentriert | Freitext (H2+Absatz, kein Block) |
| 5 | Asymmetrischer Bild-Block mit Sidebar | Großes Bild (~60%) mit Text-Overlay unten links + schmalere farbige Box (~40%) mit vertikaler Link-Liste (Zielgruppen) | `cards` (teaser-overlay) + eigene Linkliste (kein direkter Block vorhanden) |
| 6 | Themen-Kachelraster, 2x3 | 6 reine Text-Karten ohne Bild (Titel+Text+Link) | `cards` (Variante ohne Bild) |
| 7 | Zentrierte Sektionsüberschrift + Intro (2.) | wie #4, anderes Thema | Freitext |
| 8 | Vollflächiges dunkles Banner | Dunkler Hintergrund/Bild, Überschrift+Text+CTA | `cards` (teaser-overlay, bereits vorhanden) |
| 9 | 3er-Kachelreihe mit Bild | 3 Karten: Bild oben, Titel, Text, Link | `cards` (image-top, bereits vorhanden) |
| 10 | Zentrierte Überschrift + Text + hervorgehobener Satz | Text mit einer fett gesetzten Kernaussage | Freitext |
| 11 | Feature-Split (Karriere-Art) | Großes Bild mit dunklem Overlay (Text+CTA) + danebenstehende 3er-Kartenreihe (je Bild+Titel+Text+eigener Link) | `cards` (teaser-overlay) + `cards` (image-top) |
| 12 | Media/Kennzahlen | Überschrift+Intro+"Alle anzeigen"-Link; darunter 2-spaltig: News-Liste (Datums-Badge+Titel+Link) links, Kurs-/Kennzahlen-Box (Wert, Veränderung, Volumen, Mini-Chart) rechts | **Kein passender Block vorhanden** - News-Liste ggf. `fragment`, Kennzahlen-Box vermutlich individuelle Entwicklung oder externes Embed (Live-Daten) |
| 13 | Kontakt-Icon-Reihe | Zentrierte Überschrift, 3 Spalten mit Icon+Titel+Text+Link | `columns` (3 schmale Spalten) |

**Footer** (Screenshot 5):
- Dunkler Hintergrund, 3 Spalten mit Linklisten unter je einer Kategorie-Überschrift.
- Darunter schmale Fußzeile: links eine Reihe rechtlicher Links (Disclaimer/Impressum/Datenschutz/Richtlinien/Cookies), rechts Copyright-Vermerk + kleines Logo.
- **Umgesetzt, bewusst abweichend von der RWE-Referenz:** `footer`-Block geprüft, unterstützte ursprünglich keine Spalten (nur einzeilige Linkliste) - dafür `footer.css` um die Section-Metadata-Klasse `footer-columns` ergänzt und den `link-list`-Block mehrfach nebeneinander genutzt. **Bewusste Entscheidung:** Vireon nutzt gleichwertige Link-List-Spalten (inkl. einer eigenen "Rechtliches"-Spalte) statt "3 Kategorie-Spalten + separate schmale Rechtlich-Zeile" wie im RWE-Vorbild - kein offener Fehler, nicht ändern. **Technischer Hinweis:** `footer-columns` ist in `footer.css` aktuell als festes `grid-template-columns: repeat(3, 1fr)` implementiert - bei genau 3 Link-List-Blocks (wie in `test-rug`) passend, bei 4 Spalten (wie in der finalen Referenzabbildung: Energiequellen/Unternehmen/Karriere/Rechtliches) müsste die Spaltenzahl im CSS angepasst werden.

**Für Claude Code, bevor an dieser vollen Struktur gebaut wird:** Zeile 12 (Media/Kennzahlen) und die Sidebar-Linkliste in Zeile 5 haben keinen 1:1 passenden Block im Repo - das sind die einzigen Stellen, an denen tatsächlich neue Blocks entwickelt werden müssten, nicht nur vorhandene befüllt werden. Alles andere lässt sich mit `cards`, `columns`, `quote`, `carousel`, `embed` abdecken (der reine `teaser`-Block bleibt vorerst ungenutzt, siehe Befund oben) - aber wie immer zuerst das jeweilige `.css`/`.js` lesen, nicht nur von der Doku-Struktur ausgehen (siehe Table/Accordion-Lehre von vorhin, `teaser` ist ein weiteres Beispiel dafür).

### Was zu tun ist

1. Für jede der drei Seiten unten prüfen, ob die verwendeten Blocks (`quote`, `columns`) im Repo bereits die erwartete Struktur unterstützen (Zellenanzahl, ob H1/H2 nötig ist, welche Varianten-Suffixe existieren) - genauso, wie es für hero/cards/table/accordion/teaser schon gemacht wurde (`teaser` passte strukturell nicht und wurde durch `cards` ersetzt, siehe Befund oben). NICHT ungeprüft von der unten stehenden Tabellenstruktur ausgehen.
2. Falls Claude Code Zugriff auf die da.live Admin-API hat (Bearer-Token vom Nutzer nötig, PUT auf `https://admin.da.live/source/raulugarte/refdemo-da-rug/templates/<name>.html`): die drei Seiten direkt als Dokumente anlegen. Falls kein API-Zugriff besteht: die Inhalte als lokale `.html`- oder `.docx`-Referenzdateien vorbereiten, die der Nutzer manuell in da.live einfügt.
3. Nach dem Anlegen: `library/templates` Sheet mit den drei Einträgen befüllen (siehe Tabelle unten), Preview + Publish für alle Dokumente und das Sheet.

### Template-Inhalte

#### Startseite (`templates/vireon-startseite`)

**Hero:** Bild (Windpark/Solarfeld) | Text: Eyebrow "Vireon Energy", H1 "Energie, die bleibt.", Absatz "Wir bauen die Infrastruktur für eine Versorgung, die nicht von fossilen Reserven abhängt - mit Wind, Sonne und Speichertechnologie, die heute schon trägt.", Link "Unsere Energiequellen entdecken" → `/energiequellen`
Section Metadata: `Sec Full Width = true`

**Quote:** "Wir denken in Jahrzehnten, nicht in Quartalen. Jede Anlage, die wir heute bauen, versorgt noch die Generation nach uns." - Mara Lindqvist, CEO Vireon Energy
Section Metadata: `Style = bg-light`, `Sec Spacing = section-large`

**Cards, 4 Karten:** *(jede Kartenzeile 3 Spalten: Bild | Text | "image-top" - Kopfzeile bleibt reines "Cards", der Suffix wirkt nur über die 3. Spalte, siehe cards.css-Befund oben)*
- Windenergie / "Onshore- und Offshore-Windparks in sieben Ländern, mit einer Gesamtleistung von über 4 Gigawatt."
- Solarenergie / "Freiflächenanlagen und Dachsysteme - von der Einzelanlage bis zum industriellen Solarpark."
- Batteriespeicher / "Großspeicher, die überschüssige Energie puffern und bei Bedarf ins Netz zurückspeisen."
- Wasserstoff / "Grüner Wasserstoff für Industrieprozesse, die sich nicht direkt elektrifizieren lassen."
Section Metadata: `Sec Spacing = section-xlarge`

**Columns:** Bild (Landschaft) | H2 "Klimaneutral bis 2038", Text "Wir haben unseren Weg zur Klimaneutralität extern zertifizieren lassen. Das bedeutet: keine Kompensation durch Zertifikate, sondern echte Emissionsreduktion in jedem Geschäftsbereich.", Link "Unseren Fortschritt sehen" → `/nachhaltigkeit`
Section Metadata: `Style = bg-dark`, `Sec Spacing = section-huge`

**Teaser (teaser-overlay):** Bild (Team auf Anlage) | H2 "Bau mit uns die Energiewende", Text "Vireon Energy sucht Ingenieurinnen, Techniker und Projektleiter für Anlagen in ganz Europa.", Link "Offene Stellen ansehen" → `/karriere`

#### Über uns (`templates/vireon-ueber-uns`)

**Hero:** Bild (Firmenzentrale Bremen) | H1 "Über Vireon Energy", Text "Seit 1968 in der Energieversorgung - seit 2011 ausschließlich in erneuerbaren Quellen."

**Columns:** Bild (Archiv/Zeitstrahl) | H2 "Von der Kohle zur Kilowattstunde aus Wind", Text "Vireon Energy wurde 1968 als regionaler Energieversorger in Bremen gegründet. 2011 fiel die Entscheidung, vollständig auf erneuerbare Quellen umzusteigen - ein Prozess, der 2019 abgeschlossen wurde."
Section Metadata: `Style = bg-light`

**Cards, 3 Karten (Icons statt Bilder):** *(jede Kartenzeile 3 Spalten: Icon | Text | dritte Spalte leer lassen, Kopfzeile "Cards" - siehe cards.css-Befund oben)*
- Verantwortung / "Wir bauen Anlagen, die 30 Jahre und länger laufen - und stehen für ihren Rückbau genauso ein wie für ihren Bau."
- Innovation / "Ein eigenes Forschungsteam arbeitet an Speichertechnologien der nächsten Generation."
- Partnerschaft / "Wir bauen Anlagen gemeinsam mit den Gemeinden, in denen sie stehen - mit Beteiligungsmodellen für Anwohner."

**Quote:** "Ich habe elf Jahre in der Kohleverstromung gearbeitet, bevor ich zu Vireon gewechselt bin. Der Unterschied ist, dass ich meinen Kindern jetzt erklären kann, was ich beruflich mache, ohne zu zögern." - Jonas Wetterling, Anlagentechniker, Windpark Nordsee
Section Metadata: `Style = bg-dark`

#### Nachhaltigkeit (`templates/vireon-nachhaltigkeit`)

**Hero:** Bild (Naturaufnahme/Windpark) | H1 "Nachhaltigkeit ist kein Abteilungsname", Text "Sie steckt in jeder Entscheidung, vom Standort einer neuen Anlage bis zur Wahl unserer Lieferanten."

**Columns:** Bild (Diagramm Emissionsreduktion) | H2 "Klimaneutral bis 2038", Text "Extern zertifiziert, jährlich überprüft. Unser Reduktionspfad ist öffentlich einsehbar und deckt alle drei Emissions-Scopes ab."

**Accordion, 3 Punkte:**
- "Was bedeutet 'klimaneutral' bei Vireon konkret?" / "Wir reduzieren Emissionen direkt in der Erzeugung, im Fuhrpark und in der Lieferkette - Kompensation über Zertifikate nutzen wir nur für den nicht vermeidbaren Rest, nicht als Hauptstrategie."
- "Wie transparent ist der Fortschritt?" / "Wir veröffentlichen jährlich einen geprüften Nachhaltigkeitsbericht mit denselben Kennzahlen wie im Vorjahr, damit sich der Verlauf nachvollziehen lässt."
- "Was passiert mit alten Anlagen?" / "Rückbau ist von Anfang an Teil der Projektkalkulation, nicht ein nachträgliches Problem."

**Cards, 4 Karten:** *(jede Kartenzeile 3 Spalten: Bild | Text | "image-top" - Kopfzeile bleibt reines "Cards", der Suffix wirkt nur über die 3. Spalte, siehe cards.css-Befund oben)*
- Renaturierung / "Für jede neue Windkraftfläche entsteht eine gleich große Ausgleichsfläche in der Region."
- Kreislaufwirtschaft / "Rotorblätter aus recycelbarem Material sind ab 2027 Standard in neuen Projekten."
- Artenschutz / "Abschaltalgorithmen reduzieren Vogelkollisionen an Windparks in Zugvogel-Routen."
- Gemeinschaftsfonds / "1 % der Erträge jeder Anlage fließt in lokale Projekte der jeweiligen Standortgemeinde."

**Cards, 1 Karte:** Bild (Bericht-Cover) | H2 "Der vollständige Nachhaltigkeitsbericht", Text "Alle Kennzahlen, Methodik und Fortschritt im Detail.", Link "Bericht herunterladen (PDF)" → `/downloads/nachhaltigkeitsbericht.pdf` | dritte Spalte: "image-top"
*(vormals als `Teaser` spezifiziert - der teaser-Block passt strukturell nicht, siehe Befund oben; aus Konsistenzgründen auf `cards` umgestellt, reiner `teaser`-Block bleibt vorerst ungenutzt. Dritte Spalte nicht vergessen, siehe cards.css-Befund oben.)*

### Templates-Sheet (`library/templates`, Spalten key/value)

| key | value |
|---|---|
| Vireon Energy - Startseite | https://content.da.live/raulugarte/refdemo-da-rug/templates/vireon-startseite |
| Vireon Energy - Über uns | https://content.da.live/raulugarte/refdemo-da-rug/templates/vireon-ueber-uns |
| Vireon Energy - Nachhaltigkeit | https://content.da.live/raulugarte/refdemo-da-rug/templates/vireon-nachhaltigkeit |

---

## Offene Punkte (bewusst nicht Teil dieses Briefings)

- **Placeholders-Sheet:** noch nicht begonnen, siehe aem.live Placeholders-Doku für den Aufbau.
- **Bilder:** alle `[Bild: ...]`-Platzhalter oben brauchen echte Bild-Uploads oder lizenzfreie Stock-Fotos - bewusst nicht automatisch generiert/bezogen, damit keine Rechte-Probleme entstehen.
- Kein echter Bezug zu RWE oder einer anderen realen Firma - Vireon Energy ist vollständig fiktiv, das bitte auch in jeder Weiterentwicklung so beibehalten.
