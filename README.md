# drp-datepicker demo

A minimal, framework-free page that exercises every feature of the sibling
`drp-datepicker` package. No build step, no bundler, no npm install —
just open `index.html`.

## Run it

Double-click `index.html`, or open it directly in a browser. It loads the
package from `../date-calender/dist/drp-datepicker.global.js`.

## What each section shows

1. **Nepali-first picker** (`type="bs"`, the default) — with `holidays` and a `min`/`max` range set.
2. **English-first picker** (`type="ad"`) — same component, flipped.
3. **Inline calendar + Devanagari digits** — `inline` and `digits="ne"` attributes.
4. **First day of week** — `first-day-of-week` attribute with Sunday, Monday, and Saturday starts.
5. **Display format** — `format` attribute with `YYYY-MM-DD` and `DD Month YYYY` tokens.
6. **Custom disabled dates** — `.disabledDates` property blocking Saturdays, 1st, and 15th.
7. **Real `<form>` integration** — `name` + `required`, submit handling, `FormData` output.
8. **Core conversion API** — `DrpNepaliCalendar` used directly: BS↔AD conversion, fiscal year.
9. **Build-your-own calendar grid** — custom month grid from `get_calendar_month_nep()` / `get_calendar_month_eng()`.
10. **Accessibility & positioning** — keyboard nav, ARIA, focus management, panel auto-flip.

## Swapping in a published version

Once `drp-datepicker` is published to npm, replace the local script
path in `index.html` with a CDN URL and this page keeps working unchanged:

```html
<script src="https://unpkg.com/drp-datepicker/dist/drp-datepicker.global.js"></script>
```
