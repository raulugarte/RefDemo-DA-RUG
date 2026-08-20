# Vireon Energy - Template-Inhalte für da.live

Drei vollständige Seiten. Die Startseite nutzt jetzt die volle, aus den RWE-Screenshots abgeleitete Referenzstruktur (16 Module, überwiegend mit euren vorhandenen WKND-Blocks, drei neue Blocks siehe unten) - Über uns und Nachhaltigkeit bleiben in der einfacheren, ursprünglichen Struktur. Jede Seite wird als eigenes Dokument unter `raulugarte/refdemo-da-rug/templates/` angelegt und danach im `library/templates`-Sheet verlinkt.

Fiktive Firma: **Vireon Energy** - erneuerbare Energien (Wind, Solar, Batteriespeicher, Wasserstoff), gegründet 1968, Hauptsitz Bremen. Kein Bezug zu einer realen Firma, aller Text ist frei erfunden.

**Wichtig zu allen `Cards`-Tabellen unten (live in da.live bestätigt):** Jede Kartenzeile braucht zwingend **drei Spalten** - Bild/Icon | Text | dritte Spalte -, nicht nur zwei. `cards.js` liest den ersten Absatz der jeweils *letzten* Zelle als Varianten-Klasse und entfernt anschließend die gesamte Zelle. Bei nur zwei Spalten trifft das die Textspalte - Titel, Text und Link verschwinden dadurch komplett aus der gerenderten Karte. Die dritte Spalte daher: bei gewünschter Variante das Stichwort eintragen (z. B. `image-top`, `teaser-overlay`), sonst leer lassen (schützt die Textspalte, wird selbst nicht sichtbar gerendert). **Die Kopfzeile heißt deshalb überall nur noch `Cards`, ohne Varianten-Suffix:** `cards.js` liest den Blocknamen selbst nirgends aus (geprüft), die Variante wirkt ausschließlich über die dritte Spalte pro Zeile. Einzige Ausnahme im Repo ist die Variante `gradient`, die tatsächlich blockweit über eine `.cards.gradient`-CSS-Regel wirkt (kein `li`-Selektor) - für `image-top`/`teaser-overlay`/etc. gibt es keine solche Block-Level-Regel, ein Suffix in der Kopfzeile wäre daher wirkungslos. Die Kopfzeile selbst bleibt unverändert bei zwei Zellen - das ist die Aktivierungszeile, die beim Veröffentlichen entfernt wird, keine Datenzeile.

---

## Template 1: Startseite (volle Struktur, 16 Module)

**Ort:** `raulugarte/refdemo-da-rug/templates/vireon-startseite`

**Neue Blocks, die vorher entwickelt werden müssen** (Details siehe Abschnitt "Neue Blocks" ganz unten): `link-list`, `news-list`, `key-figures`, plus eine neue Section-Metadata-Style-Klasse `split-feature`. Ohne diese drei Blocks/die Klasse lassen sich die Module 7, 12 und 13 unten nicht wie beschrieben umsetzen - alle anderen Module nutzen ausschließlich vorhandene Blocks.

### Modul 1 - Navigation (global, kein Template-Inhalt)
Header-Block, transparent über Modul 2 gelegt. Siehe "Referenzstruktur - Navigation" oben im CLAUDE.md-Briefing für den Aufbau (zweistufiges Flyout).

### Modul 2 - Hero/Carousel
| Carousel | |
|---|---|
| [Bild: Windpark, Meer im Hintergrund] | **Vireon Energy**<br># Energie, die bleibt.<br>Wir investieren Milliarden in profitables Wachstum bei erneuerbaren Energien.<br>[Mehr erfahren](/energiequellen) |
| [Bild: Wasserstoffanlage] | **Vireon Energy**<br># Wasserstoff für die Industrie von morgen<br>Grüner Wasserstoff dort, wo sich Prozesse nicht direkt elektrifizieren lassen.<br>[Zum Wasserstoff-Programm](/wasserstoff) |

**Section Metadata:** `Sec Full Width = true`

*Hinweis: die transparente Nav-Überlagerung (siehe Modul 1) ist eine header.css-Anpassung, kein Bestandteil des Carousel-Blocks selbst.*

---

### Modul 3 - Spotlight (Columns, schmal)
| Columns | |
|---|---|
| **Spotlight**<br>Nur wenige Energieversorger erfüllen schon heute die verschärften EU-Klimaziele für 2030 - Vireon zählt dazu.<br>[Mehr zum Klimaschutz](/nachhaltigkeit) | [Bild: kleines Vorschaubild, Windpark] |

**Section Metadata:** `Sec Spacing = section-small`, `Sec Spacing Bottom = section-small`

---

### Modul 4 - Quote
| Quote | |
|---|---|
| "Wir denken in Jahrzehnten, nicht in Quartalen. Jede Anlage, die wir heute bauen, versorgt noch die Generation nach uns." | |
| Mara Lindqvist, CEO Vireon Energy | |

**Section Metadata:** `Style = bg-light`, `Sec Spacing = section-large`

---

### Modul 5 - Text + Video
| Columns | |
|---|---|
| ## 125 Jahre Erfahrung, neu ausgerichtet<br>Vom regionalen Versorger zum reinen Erneuerbaren-Unternehmen - in weniger als einer Generation.<br>[Unsere Strategie im Überblick](/strategie) | [Video-Embed-Link einfügen, z.B. YouTube/Vimeo-URL] |

*Hinweis: ob das per `embed`-Block als Klick-Vorschau mit Play-Icon oder direkt als eingebetteter Player erscheint, hängt von `embed.js` ab - vorher prüfen.*

---

### Modul 6 - Zentrierte Überschrift + Intro
Kein Block, reiner Fließtext, zentriert per Section Metadata:

> ## Energie für ein nachhaltiges Leben
> Zuverlässige Versorgung von Millionen Haushalten - jeden Tag, mit klarem Kurs Richtung Klimaneutralität.

**Section Metadata:** `Style = text-center` *(neue, einfache Klasse - `.section.text-center { text-align:center; }`, keine Blockänderung nötig, nur eine CSS-Zeile in `styles.css`)*

---

### Modul 7 - Audience Feature (Bild+Overlay + Link-Liste, nebeneinander)
Zwei Blocks in einer Section, per `split-feature`-Style nebeneinander gestellt:

| Cards | |
|---|---|---|
| [Bild: Landschaft/Naturschutzgebiet] | ## Verantwortung & Nachhaltigkeit<br>[Mehr erfahren](/nachhaltigkeit) | teaser-overlay |

*Einzelne Kartenzeile (1 Karte, 3 Spalten - siehe Hinweis ganz oben). War vorher als `Teaser (teaser-overlay)` spezifiziert - diese Variante existiert nur für `cards`, nicht für den `teaser`-Block (siehe CLAUDE.md-Befund).*

| Link List | |
|---|---|
| Informationen für… | |
| Zukünftige Mitarbeitende | /karriere |
| Nachbarn | /vor-ort |
| Handelspartner | /handel |
| Investoren | /investor-relations |
| Presse | /presse |

**Section Metadata (für die gemeinsame Section beider Blocks):** `Style = split-feature`

---

### Modul 8 - Themen-Kachelraster (6 Karten, ohne Bild)
| Cards | |
|---|---|---|
| | **Social Media**<br>Neuigkeiten und Einblicke auf allen Kanälen.<br>[Mehr erfahren](/social) | |
| | **Forschung & Entwicklung**<br>Speichertechnologie für die nächste Generation.<br>[Mehr erfahren](/forschung) | |
| | **Umweltschutz**<br>Fester Teil jeder Standort- und Projektentscheidung.<br>[Mehr erfahren](/umweltschutz) | |
| | **Standorte**<br>Anlagen und Teams in ganz Europa.<br>[Mehr erfahren](/standorte) | |
| | **Wasserstoff**<br>Schlüsseltechnologie für die Industriewende.<br>[Mehr erfahren](/wasserstoff) | |
| | **Diversität**<br>Verantwortung nach innen genauso wie nach außen.<br>[Mehr erfahren](/diversitaet) | |

*Hinweis: erste Zelle je Zeile bleibt leer (kein Bild) - vorher prüfen, ob `cards.js` das toleriert, siehe Notiz im Block-Abschnitt unten. Dritte Zelle ebenfalls leer lassen (siehe Hinweis ganz oben).*

**Section Metadata:** `Sec Spacing = section-xlarge`

---

### Modul 9 - Zentrierte Überschrift + Intro (2.)
> ## Unsere Expertise
> Von der Erzeugung bis zum Handel - wir entwickeln die Technologien, die den Netzbetrieb von morgen tragen.

**Section Metadata:** `Style = text-center`

---

### Modul 10 - Dunkles Banner
| Cards | |
|---|---|---|
| [Bild: abstrakte dunkle Struktur/Nachthimmel] | ## Energie weltweit handeln<br>Grenzenloser Handel, verlässliche Lieferketten - auch in Zeiten der Transformation.<br>[Mehr erfahren](/handel) | teaser-overlay |

*Einzelne Kartenzeile (1 Karte, 3 Spalten - siehe Hinweis ganz oben), gleiche Begründung wie bei Modul 7.*

**Section Metadata:** `Style = bg-dark`, `Sec Spacing = section-huge`

---

### Modul 11 - 3er-Kachelreihe (Kernangebote)
| Cards | |
|---|---|---|
| [Bild] | **Unsere Energie**<br>Von konventionell zu erneuerbar.<br>[Mehr erfahren](/energie) | image-top |
| [Bild] | **Produkte & Services**<br>Ein starker Energiepartner für Unternehmen.<br>[Mehr erfahren](/produkte) | image-top |
| [Bild] | **Unsere Projekte**<br>Ausgewählte internationale Highlights.<br>[Mehr erfahren](/projekte) | image-top |

*3 Spalten pro Kartenzeile - siehe Hinweis ganz oben.*

---

### Modul 12 - Zentrierte Überschrift + Text + Slogan (Karriere-Einleitung)
> ## International, offen, vielfältig - Arbeiten bei Vireon
> Unabhängig von Erfahrung oder fachlichem Hintergrund - bei uns bewegt jeder etwas.
>
> **Deine Energie hat Wirkung. Nutze sie für Gutes.**

**Section Metadata:** `Style = text-center`

---

### Modul 13 - Karriere-Feature-Split
Zwei Blocks nebeneinander, wieder per `split-feature`:

| Cards | |
|---|---|---|
| [Bild: Team auf einer Anlage] | ## Entdecke deine Möglichkeiten bei Vireon<br>Sei Teil der Zukunft - von hier aus gestaltest du die Energiewende mit.<br>[Job finden](/karriere/stellen) | teaser-overlay |

*Einzelne Kartenzeile (1 Karte, 3 Spalten - siehe Hinweis ganz oben), gleiche Begründung wie bei Modul 7.*

| Cards | |
|---|---|---|
| [Bild] | **Karrierewelt**<br>Für Berufserfahrene, Studierende und Einsteiger.<br>[Möglichkeiten entdecken](/karriere/welt) | image-top |
| [Bild] | **Vireon als Arbeitgeber**<br>Benefits, Arbeitsweise, was dich erwartet.<br>[So ist es bei uns](/karriere/arbeitgeber) | image-top |
| [Bild] | **#TeamVireon**<br>Stimmen aus dem Team, echte Einblicke.<br>[Geschichten entdecken](/karriere/team) | image-top |

**Section Metadata:** `Style = split-feature`

---

### Modul 14 - Medien & Kennzahlen
> ## Medien & Aktie
> [Alle anzeigen](/presse)

Zwei Blocks nebeneinander, per `split-feature`:

| News List | |
|---|---|
| 14.08.2026 | Vireon meldet starkes Halbjahresergebnis → [Weiterlesen](/presse/hj-2026) |
| 09.08.2026 | Neuer Offshore-Windpark ans Netz gegangen → [Weiterlesen](/presse/windpark-nord) |
| 03.08.2026 | Vireon übernimmt Batteriespeicher-Entwickler → [Weiterlesen](/presse/uebernahme) |

| Key Figures | |
|---|---|
| Symbol | VIR |
| Kurs | 34,80 € |
| Veränderung | +0,42 (+1,22 %) |

*Wichtig: `Kurs`/`Veränderung` sind statische Platzhalterwerte, keine echten Live-Daten - für echte Kursdaten wäre ein externes Finanzdaten-Embed nötig, das ist bewusst nicht Teil dieser Spezifikation.*

**Section Metadata:** `Style = split-feature`

---

### Modul 15 - Kontakt-Icon-Reihe
> ## Fragen? Wir helfen gerne

| Cards | |
|---|---|---|
| [Icon: Headset] | **Kontakt & Service**<br>[Ansprechpartner finden](/kontakt) | |
| [Icon: Pin] | **Vireon vor Ort**<br>[Standorte ansehen](/standorte) | |
| [Icon: Dokument] | **Dokumente**<br>[Downloads durchsuchen](/downloads) | |

*3 Spalten pro Kartenzeile, dritte leer lassen - siehe Hinweis ganz oben.*

**Section Metadata:** `Style = text-center`

### Modul 16 - Footer (global, kein Template-Inhalt)
Siehe "Referenzstruktur - Footer" oben im CLAUDE.md-Briefing (3 Linkspalten + Rechts-Fußzeile).

---

## Neue Blocks - Spezifikation für Claude Code

Diese drei Blocks existieren noch nicht im Repo und müssen neu angelegt werden (Ordner + `.js` + `.css` unter `blocks/`). Tabellenstruktur wie oben verwendet, Verhalten wie folgt:

**`link-list`** (`blocks/link-list/`)
- Erste Datenzeile: Überschrift der Liste (nur 1 Zelle befüllt).
- Alle weiteren Zeilen: Zelle 1 = Link-Text, Zelle 2 = Ziel-URL.
- Rendering: Überschrift fett, darunter eine schlichte `<ul>` mit den Links, Hintergrund in `--brand-theme-color`, weißer Text (siehe Mockup).

**`news-list`** (`blocks/news-list/`)
- Jede Zeile: Zelle 1 = Datum (Text), Zelle 2 = Meldungstext inkl. Link.
- Rendering: Datum als kleines, hervorgehobenes Badge/Label links, Meldungstext rechts daneben, Zeilen durch dünne Trennlinie getrennt.

**`key-figures`** (`blocks/key-figures/`)
- Key/Value-Tabelle (wie Section Metadata aufgebaut): Zelle 1 = Label, Zelle 2 = Wert.
- Rendering: kompakte Stat-Box, größter/wichtigster Wert (z.B. Kurs) optisch hervorgehoben.
- Explizit **keine** Live-Datenanbindung in dieser Spezifikation - nur statische Werte aus der Tabelle.

**Section-Metadata-Style `split-feature`** (Ergänzung in `styles/styles.css`, kein neuer Block):
```css
.section.split-feature {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 24px;
  align-items: stretch;
}
.section.split-feature > div {
  margin: 0;
}
```
Setzt voraus, dass pro Section genau zwei Blocks (je ein direktes Kind-Div) enthalten sind - bei mehr oder weniger als zwei Blocks in der Section greift das Grid nicht wie gedacht.

**Zusätzliche einfache Klasse `text-center`** (ebenfalls nur CSS, kein neuer Block):
```css
.section.text-center {
  text-align: center;
}
.section.text-center > div {
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}
```

---

## Template 2: Über uns

**Ort:** `raulugarte/refdemo-da-rug/templates/vireon-ueber-uns`

### Abschnitt 1 - Hero
| Hero | |
|---|---|
| [Bild: Firmenzentrale Bremen] | |
| # Über Vireon Energy<br>Seit 1968 in der Energieversorgung - seit 2011 ausschließlich in erneuerbaren Quellen. | |

### Abschnitt 2 - Columns (Geschichte)
| Columns | |
|---|---|
| [Bild: Archivfoto/Zeitstrahl-Grafik] | ## Von der Kohle zur Kilowattstunde aus Wind<br>Vireon Energy wurde 1968 als regionaler Energieversorger in Bremen gegründet. 2011 fiel die Entscheidung, vollständig auf erneuerbare Quellen umzusteigen - ein Prozess, der 2019 abgeschlossen wurde. |

**Section Metadata:**
| Section Metadata | |
|---|---|
| Style | bg-light |

### Abschnitt 3 - Cards (Werte)
| Cards | |
|---|---|---|
| [Icon] | **Verantwortung**<br>Wir bauen Anlagen, die 30 Jahre und länger laufen - und stehen für ihren Rückbau genauso ein wie für ihren Bau. | |
| [Icon] | **Innovation**<br>Ein eigenes Forschungsteam arbeitet an Speichertechnologien der nächsten Generation. | |
| [Icon] | **Partnerschaft**<br>Wir bauen Anlagen gemeinsam mit den Gemeinden, in denen sie stehen - mit Beteiligungsmodellen für Anwohner. | |

*3 Spalten pro Kartenzeile, dritte leer lassen - siehe Hinweis ganz oben in diesem Dokument.*

### Abschnitt 4 - Quote (Mitarbeiterstimme)
| Quote | |
|---|---|
| "Ich habe elf Jahre in der Kohleverstromung gearbeitet, bevor ich zu Vireon gewechselt bin. Der Unterschied ist, dass ich meinen Kindern jetzt erklären kann, was ich beruflich mache, ohne zu zögern." | |
| Jonas Wetterling, Anlagentechniker, Windpark Nordsee | |

**Section Metadata:**
| Section Metadata | |
|---|---|
| Style | bg-dark |

---

## Template 3: Nachhaltigkeit

**Ort:** `raulugarte/refdemo-da-rug/templates/vireon-nachhaltigkeit`

### Abschnitt 1 - Hero
| Hero | |
|---|---|
| [Bild: Naturaufnahme, Windpark im Grünen] | |
| # Nachhaltigkeit ist kein Abteilungsname<br>Sie steckt in jeder Entscheidung, vom Standort einer neuen Anlage bis zur Wahl unserer Lieferanten. | |

### Abschnitt 2 - Columns (Klimaziel)
| Columns | |
|---|---|
| [Bild: Diagramm/Grafik Emissionsreduktion] | ## Klimaneutral bis 2038<br>Extern zertifiziert, jährlich überprüft. Unser Reduktionspfad ist öffentlich einsehbar und deckt alle drei Emissions-Scopes ab. |

### Abschnitt 3 - Accordion (Häufige Fragen)
| Accordion | |
|---|---|
| Was bedeutet "klimaneutral" bei Vireon konkret? | Wir reduzieren Emissionen direkt in der Erzeugung, im Fuhrpark und in der Lieferkette - Kompensation über Zertifikate nutzen wir nur für den nicht vermeidbaren Rest, nicht als Hauptstrategie. |
| Wie transparent ist der Fortschritt? | Wir veröffentlichen jährlich einen geprüften Nachhaltigkeitsbericht mit denselben Kennzahlen wie im Vorjahr, damit sich der Verlauf nachvollziehen lässt. |
| Was passiert mit alten Anlagen? | Rückbau ist von Anfang an Teil der Projektkalkulation, nicht ein nachträgliches Problem. |

### Abschnitt 4 - Cards (Initiativen)
| Cards | |
|---|---|---|
| [Bild] | **Renaturierung**<br>Für jede neue Windkraftfläche entsteht eine gleich große Ausgleichsfläche in der Region. | image-top |
| [Bild] | **Kreislaufwirtschaft**<br>Rotorblätter aus recycelbarem Material sind ab 2027 Standard in neuen Projekten. | image-top |
| [Bild] | **Artenschutz**<br>Abschaltalgorithmen reduzieren Vogelkollisionen an Windparks in Zugvogel-Routen. | image-top |
| [Bild] | **Gemeinschaftsfonds**<br>1 % der Erträge jeder Anlage fließt in lokale Projekte der jeweiligen Standortgemeinde. | image-top |

### Abschnitt 5 - Cards, image-top (Bericht-CTA)
| Cards | |
|---|---|---|
| [Bild: Bericht-Cover/Dokument] | ## Der vollständige Nachhaltigkeitsbericht<br>Alle Kennzahlen, Methodik und Fortschritt im Detail.<br>[Bericht herunterladen (PDF)](/downloads/nachhaltigkeitsbericht.pdf) | image-top |

*Vormals als `Teaser` spezifiziert - der teaser-Block passt strukturell nicht (siehe CLAUDE.md-Befund), daher aus Konsistenzgründen auf `Cards` (Variante `image-top` in der dritten Spalte) mit einer Karte umgestellt. Reiner `teaser`-Block bleibt vorerst ungenutzt. 3 Spalten pro Kartenzeile - siehe Hinweis ganz oben in diesem Dokument.*

---

## Templates-Sheet Eintrag

In `library/templates` (key/value):

| key | value |
|---|---|
| Vireon Energy - Startseite | https://content.da.live/raulugarte/refdemo-da-rug/templates/vireon-startseite |
| Vireon Energy - Über uns | https://content.da.live/raulugarte/refdemo-da-rug/templates/vireon-ueber-uns |
| Vireon Energy - Nachhaltigkeit | https://content.da.live/raulugarte/refdemo-da-rug/templates/vireon-nachhaltigkeit |

## Nach dem Anlegen

1. Jedes der drei Dokumente unter `templates/` anlegen, Inhalt wie oben eintippen (Bilder durch echte Uploads ersetzen, Platzhalter-Klammern sind nur Hinweise).
2. Preview + Publish für jedes der drei Dokumente einzeln.
3. `library/templates` Sheet mit der Tabelle oben befüllen, Preview + Publish.
4. In einem neuen Testdokument die Library öffnen, unter Templates prüfen, ob alle drei erscheinen und sich vollständig einfügen lassen.
