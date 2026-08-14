# Polering av /bokad och /repris

Granskning av `src/pages/Bokad.tsx` + `src/components/precall/*`, `src/pages/Repris.tsx`, `src/index.css` och `src/App.tsx`. Nedan är konkreta fynd, prioriterade. Ingen kod ändras förrän du godkänner.

## P0 — Kritiskt (påverkar konvertering/funktion)

**/repris**
1. Countdown-deadline är hårdkodad till `2026-08-14T23:59:00` — det är i dag (14 aug 2026). Timern går ut i kväll och sidan visar då bara "Föreläsningen är inte längre tillgänglig" medan resten av sidan (hero, CTA, Calendly) står kvar med aktiv säljcopy. Förslag: flytta deadline till en konstant högst upp med nytt datum (du säger vilket), plus ett vettigt utgånget läge — hero-CTA byts till "Boka ett samtal" och video/CTA-knapp döljs i stället för att sidan blir självmotsägande.
2. `new Date("2026-08-14T23:59:00")` saknar tidszon → tolkas i besökarens lokala tid. Låses till svensk tid (`+02:00`).
3. Hero-copy "Se hela digitala föreläsningen **från i onsdags**" är tidsbunden och blir fel dagen efter. Byts till datumdriven text från samma konstant.
4. Ingen `document.title`/meta description sätts på /repris (till skillnad från /bokad) → delning och SEO ärver huvudsidans titel. Läggs till.

**/bokad**
5. `TopBanner` importeras i `Bokad.tsx` men renderas aldrig; `Header` returnerar `null`; `Problem`, `YouTubeLink`, `CountUp` är oanvända. Antingen används banner (rekommenderas — den förklarar "se videon innan samtalet") eller så städas död kod bort.
6. Tom `<p>`-eyebrow i `Testimonials.tsx` (rad ~88) renderar en tom rad som ger ojämnt kortavstånd. Tas bort eller fylls med "Intervju".

## P1 — Konsekvens mellan sidorna

7. Två olika `Reveal`-implementationer (`components/precall/Reveal.tsx` med ms-delay vs en lokal i `Repris.tsx` med sekund-delay) och två olika `Footer`. /repris-footern har integritets-/villkorslänkar, /bokad-footern har bara copyright. Förslag: en delad `Reveal` och en delad footer-variant, så båda sidorna har samma länkar och samma rytm.
8. /repris skriver färger inline (`style={{ background: "hsl(var(--surface))" }}`, `hsl(0 0% 100%)` som hårdkodad vit text) i stort sett överallt, /bokad använder Tailwind-tokens. Konverteras till tokens (`bg-surface`, `text-foreground`) — hårdkodad vit bryter kontrasten mot temat.
9. Typografi: `/bokad` tvingar bort Playfair via `.precall-page`-override i CSS medan `/repris` kör `font-body` på alla rubriker och huvudsidan använder Playfair. Vi väljer ett system (jag föreslår Playfair för rubriker på båda, i linje med huvudsidan) och tar bort override-hacket.
10. Sektionsrytm skiljer sig: /repris växlar `py-16 / py-20`, /bokad kör konsekvent `py-20`. Standardiseras till en skala (`py-16 md:py-24`) på båda, med samma `max-w` per sektion (idag blandas `max-w-3xl/4xl/5xl/6xl/7xl` godtyckligt).
11. Knappradier: `.btn-gold` är `rounded-2xl` i CSS men får `rounded-lg` påklistrat i /repris → olika knappform på olika sidor. Låses till en form.

## P2 — Responsivitet och layout

12. /repris countdown-block: labels ("DAGAR/TIMMAR/MIN/SEK") renderas aldrig — bara siffror visas, vilket är otydligt. Läggs tillbaka som små etiketter under varje siffra.
13. /repris skärmdumps-testimonials ligger i `grid-cols-3` respektive `grid-cols-2` utan mobilbrytpunkt → bilderna blir oläsbart små på telefon. Byts till samma masonry (`columns-2 sm:columns-3`) som /bokad använder.
14. Calendly-iframe i /repris har fast `height="1100"` → stor tom yta på desktop och avklippt innehåll/dubbelscroll på mobil. Byts till responsiv höjd (kortare på mobil) alternativt Calendlys egna inline-widget-script.
15. Alla tre YouTube-iframes på /repris laddas direkt vid sidladdning (tung mobil-LCP). Byts till klick-för-att-spela-thumbnails, samma mönster som /bokad redan har.
16. /bokad `Prepare`-korten har `p-7 pl-20` med absolut-placerad siffra → texten kläms ihop på små skärmar. Görs responsiv.

## P3 — Formulär, states och micro-interactions

17. Registreringsmodalen på /repris: ingen fokusfällning, ingen stängning på Escape, ingen scroll-lås av bakgrunden, ingen in-/ut-animation (den bara hoppar in), och `loading`-state återställs aldrig vid lyckad submit. Fixas + spinner i knappen.
18. Modalen saknar validering av e-postformat bortom `type="email"` och ger samma generiska felmeddelande för alla fel. Skiljer på nätverksfel och avvisad registrering.
19. Ingen bekräftelse efter upplåsning — sidan bara scrollar upp. Läggs till kort success-feedback och autoplay-fokus på videon.
20. `RegistrationModal` returnerar `null` före hooks-anropen är klara (early return efter `useState` är ok, men `if (!open) return null` före `handleSubmit` gör att fälten aldrig nollställs mellan öppningar) — ryds upp.
21. Hover/press-states saknas på flera klickytor på /repris (kort, footer-länkar, video-thumbnail). Läggs till diskret lyft + gold-border, samma som /bokad.
22. `prefers-reduced-motion` respekteras bara av de gamla `.reveal`-klasserna, inte av `Reveal`-komponenterna. Läggs till i båda.

## Teknisk sammanfattning

- Delade komponenter flyttas till `src/components/shared/` (`Reveal`, `SectionHeading`, `SiteFooter`).
- Alla inline-`style`-färger i `Repris.tsx` ersätts med Tailwind-tokens från `tailwind.config.ts`.
- Spacing-skala och `max-w`-skala definieras en gång och används på båda sidorna.
- Edge-funktionerna `register-contact` / `register-repris` rörs inte — bara klientens loading/error-hantering förbättras.
- Wistia-inbäddningen på /bokad och /repris behålls som den är funktionellt.

## Frågor innan bygget

- Vilket nytt deadline-datum ska /repris-countdownen räkna ner till?
- Ska /bokad ha kvar den gula toppbannern?
- Playfair-rubriker på båda sidorna (som huvudsidan), eller Source Sans överallt?
