# demo-ui

A minimal, framework-free page that exercises every feature of the sibling
`drp-datepicker` package. No build step, no bundler, no npm install —
just open `index.html`.

## Run it

Double-click `index.html`, or open it directly in a browser. It loads the
package straight from `../drp-datepicker/dist/drp-datepicker.global.js`
— the exact same file a real CDN `<script>` tag would point at once the
package is published to npm.

## What each section shows

1. **Nepali-first picker** (`type="bs"`, the default) — with `holidays` and a `min`/`max` range set.
2. **English-first picker** (`type="ad"`) — same component, flipped.
3. **Inline calendar + Devanagari digits** — `inline` and `digits="ne"` attributes.
4. **Real `<form>` integration** — `name` + `required`, submit handling, `FormData` output.
5. **Core conversion API** — `DrpNepaliCalendar` used directly with no UI at all: manual BS↔AD conversion, current fiscal year.
6. **Build-your-own calendar grid** — a tiny custom month grid, rendered from nothing but `get_calendar_month_nep()` / `get_calendar_month_eng()`, proving those methods hand back everything needed without touching the `<drp-datepicker>` component at all.

## Swapping in a published version

Once `drp-datepicker` is published to npm, replace the local script
path in `index.html` with a CDN URL and this page keeps working unchanged:

```html
<script src="https://unpkg.com/drp-datepicker/dist/drp-datepicker.global.js"></script>
```
