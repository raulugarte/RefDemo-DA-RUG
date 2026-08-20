# Block-Inhalte für da.live

Referenz für raulugarte/refdemo-da-rug. Für jeden Block: wo das Dokument liegt und was genau in die Tabelle kommt.

In da.live baust du diese Tabellen über "Insert > Table" im Editor (nicht als Markdown einfügen). Die erste Zeile mit dem Blocknamen bekommt eine eigene, einspaltige Zeile - das ist die Zeile, die den Block aktiviert und beim Veröffentlichen aus dem sichtbaren Inhalt entfernt wird.

---

## 1. Hero

**Ort:** `raulugarte/refdemo-da-rug/blocks/hero`

| Hero |
|---|
| ![Bild einfügen] |
| **Referenz-Demo**<br>Gebaut wie ein Manuskript.<br>Jeder Block trägt seine eigene Randnotiz - so bleibt sichtbar, was Inhalt und was Struktur ist.<br>[Bausteine entdecken](/blocks) |

**Wie du die Zellen aufbaust:**
- Zeile 1 (Bild): ein Bild einfügen (später über den Fokuspunkt in der Blocks-Sheet-Spalte `features` steuerbar).
- Zeile 2 (Text): erster Absatz = kurzer Eyebrow-Text ("Referenz-Demo"), danach eine Überschrift (H1), danach ein Absatz Fließtext, danach ein Link als eigener Absatz (das wird die CTA).

---

## 2. Cards

**Ort:** `raulugarte/refdemo-da-rug/blocks/cards`

Jede Zeile = eine Karte, zwei Spalten: Bild/Icon links, Text rechts.

| Cards | |
|---|---|
| ![Icon] | **Struktur**<br>Klare Bausteine statt freier Flächen. |
| ![Icon] | **Typografie**<br>Fraunces trifft Plex Sans. |
| ![Icon] | **Optionen**<br>Section-Metadata als Farbwahl. |

**Hinweis:** Für Icon-Platzhalter kannst du entweder ein Bild einfügen oder - sobald dein Icons-Sheet befüllt ist - eines der `:icon-name:` Kürzel aus der Library einfügen.

---

## 3. Table (striped)

**Ort:** `raulugarte/refdemo-da-rug/blocks/table`

**Wichtig, korrigiert:** Es ist **eine einzige Tabelle**, keine zwei getrennten. Die erste Zeile (Blockname) muss über beide Spalten verschmolzen sein (Merge cells), danach folgen die echten Kopf- und Datenzeilen in derselben Tabelle:

| Table (striped) | |
|---|---|
| Baustein | Zweck |
| Hero | Einstieg mit Bild, Headline, CTA |
| Cards | Mehrere gleichwertige Kurzinhalte |
| Accordion | Ausklappbare Detailinformationen |
| Section Metadata | Steuert Hintergrund und Abstand einer Sektion |

WKND baut daraus eine echte `<table>` mit `<thead>`/`<tbody>` - dafür braucht table.js zwingend eine zusammenhängende Tabelle. Das CSS dafür (inkl. striped-Variante) ist in eurem Repo unter `blocks/table/table.css` bereits vollständig vorhanden, hier ist nichts zu ergänzen.

---

## 4. Accordion

**Ort:** `raulugarte/refdemo-da-rug/blocks/accordion`

Jede Zeile = ein Punkt, zwei Spalten: Frage/Titel links, Antworttext rechts.

| Accordion | |
|---|---|
| Wie funktioniert die Library? | Blocks, Templates, Icons und Placeholders werden über ein zentrales Config-Sheet verknüpft. |
| Was ist Section-Metadata? | Eine Tabelle, die Hintergrund und Abstand der Sektion steuert, in der sie steht. |
| Muss ich Templates benutzen? | Nein, Templates sind optional und helfen nur beim schnelleren Aufbau neuer Seiten. |

---

## 5. Section Metadata

**Ort:** `raulugarte/refdemo-da-rug/blocks/section-metadata`

**Korrigiert an die echte WKND-Implementierung (styles.css):** Das ist kein visueller Block, sondern eine Vorlage, die Autoren unter eine Sektion kopieren und anpassen. Zwei Spalten, Name/Wert-Paare - die Feldnamen müssen exakt diese sein, damit WKNDs CSS greift:

| Section Metadata | |
|---|---|
| Style | bg-dark |
| Sec Spacing | section-medium |

Optional ergänzbar: eine Zeile `Sec Spacing Bottom` (gleiche Werteskala, steuert den unteren Abstand) und/oder `Sec Full Width` mit Wert `true` (Sektion randlos über die volle Breite).

**Options-Tab im blocks-Sheet korrigieren:** die Zeilen `style`/`background` mit den erfundenen Werten (dark-grey, xxs-spacing usw.) durch die echten WKND-Werte ersetzen:

| key | blocks | values |
|---|---|---|
| Style | section-metadata | light \| highlight \| bg-default \| bg-theme \| bg-dark \| bg-light |
| Sec Spacing | section-metadata | section-none \| section-tiny \| section-xsmall \| section-small \| section-regular \| section-medium \| section-large \| section-xlarge \| section-huge |
| Sec Full Width | section-metadata | true |

**Zu den Farb-Swatches:** Für echte Farbvorschauen (key=hex-Syntax) bräuchtest du die tatsächlichen Hex-Werte eurer Marke hinter `--dark-color`, `--light-color`, `--main-accent-color` - die styles.css zeigt nur Fallback-Werte (`#131313`, `#dcdcdc`, `#ffc719`), die möglicherweise irgendwo überschrieben werden. Ohne das zu wissen, würde ich hier lieber auf Farb-Swatches verzichten und die Werte als reinen Text anbieten - sicherer als falsche Farben zu versprechen.

---

## Nach dem Anlegen

Für jedes der 5 Dokumente: einmal öffnen, Preview + Publish über die Sidekick. Erst danach zieht die Library die echten Inhalte beim Einfügen ins Dokument.
