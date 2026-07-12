const { DrpNepaliCalendar } = window.DRP;
const cal = new DrpNepaliCalendar();

// ── 1. Nepali-first picker ────────────────────────────────────────────────
const p1 = document.getElementById('p1');
const now = new Date();
const bs = cal.eng_to_nep(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
);
if (!bs) {
    throw new Error("Couldn't convert current date.");
}
const year =
    bs.bs_year ??
    bs.year ??
    bs.y;

const month =
    bs.bs_month ??
    bs.month ??
    bs.m;

const day =
    bs.bs_date ??
    bs.day ??
    bs.date ??
    bs.d;
const pad = n => String(n).padStart(2, "0");
function daysInMonth(y, m) {
    const info = cal.get_calendar_month_nep(
        `${y}-${pad(m)}`
    );
    return info.days.length;
}

// Previous month
let minYear = year;
let minMonth = month - 1;

if (minMonth < 1) {
    minMonth = 12;
    minYear--;
}

// Next month
let maxYear = year;
let maxMonth = month + 1;

if (maxMonth > 12) {
    maxMonth = 1;
    maxYear++;
}

const minDate =
    Math.floor(Math.random() * daysInMonth(minYear, minMonth)) + 1;

const maxDate =
    Math.floor(Math.random() * daysInMonth(maxYear, maxMonth)) + 1;

// Set picker limits
p1.setAttribute('min',`${minYear}-${pad(minMonth)}-${pad(minDate)}`);
p1.setAttribute('max',`${maxYear}-${pad(maxMonth)}-${pad(maxDate)}`);

// Two random holidays in current month
const totalDays = daysInMonth(year, month);

const h1 = Math.floor(Math.random() * totalDays) + 1;

let h2;
do {
    h2 = Math.floor(Math.random() * totalDays) + 1;
} while (h1 === h2);

p1.holidays = [
    {
        date: `${year}-${pad(month)}-${pad(h1)}`,
        label: "Demo Holiday 1",
    },
    {
        date: `${year}-${pad(month)}-${pad(h2)}`,
        label: "Demo Holiday 2",
    },
];

p1.addEventListener('change', (e) => {
  document.getElementById('out1').textContent = JSON.stringify(e.detail, null, 2);
});

// ── 2. English-first picker ───────────────────────────────────────────────
const p2 = document.getElementById('p2');
p2.addEventListener('change', (e) => {
  document.getElementById('out2').textContent = JSON.stringify(e.detail, null, 2);
});

// ── 3. Inline + Devanagari digits — no extra wiring needed, just attributes

// ── 4. Real <form> integration ────────────────────────────────────────────
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  document.getElementById('out4').textContent = JSON.stringify(Object.fromEntries(data), null, 2);
});

// ── 5. Core conversion playground ─────────────────────────────────────────
document.getElementById('convertToAd').addEventListener('click', () => {
  const [y, m, d] = document.getElementById('bsInput').value.split('-').map(Number);
  const result = cal.nep_to_eng(y, m, d);
  document.getElementById('out5').textContent = result
    ? JSON.stringify(result, null, 2)
    : `Invalid or out-of-range BS date. ${cal.debug_info}`;
});

document.getElementById('convertToBs').addEventListener('click', () => {
  const [y, m, d] = document.getElementById('adInput').value.split('-').map(Number);
  const result = cal.eng_to_nep(y, m, d);
  document.getElementById('out5').textContent = result
    ? JSON.stringify(result, null, 2)
    : `Invalid or out-of-range AD date. ${cal.debug_info}`;
});

document.getElementById('showFiscalYear').addEventListener('click', () => {
  document.getElementById('out5b').textContent = JSON.stringify(cal.get_current_fiscal_year(), null, 2);
});

// ── 6. Build-your-own calendar grid ───────────────────────────────────────
const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function renderMonthGrid(monthInfo, { primaryKey, primaryDayKey, secondaryDayKey }) {
  const container = document.getElementById('monthGrid');
  container.innerHTML = '';

  WEEKDAY_LABELS.forEach((label) => {
    const el = document.createElement('div');
    el.className = 'weekday-label';
    el.textContent = label;
    container.appendChild(el);
  });

  for (let i = 1; i < monthInfo.start_weekday; i++) {
    const blank = document.createElement('div');
    blank.className = 'cell blank';
    container.appendChild(blank);
  }

  monthInfo.days.forEach((day) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    if (day.is_holiday) cell.classList.add('holiday');
    if (day.is_today) cell.classList.add('today');
    cell.title = day.is_holiday ? day.holiday_label : '';
    cell.innerHTML = `<div class="primary">${day[primaryDayKey]}</div><div class="secondary">${day[secondaryDayKey]}</div>`;
    container.appendChild(cell);
  });
}

document.getElementById('loadBsMonth').addEventListener('click', () => {
  const value = document.getElementById('bsMonthInput').value;
  const monthInfo = cal.get_calendar_month_nep(value, {
    holidays: [{ date: '2083-03-01', label: 'Sample holiday' }],
  });
  if (!monthInfo) return alert('Invalid or out-of-range BS month.');
  renderMonthGrid(monthInfo, { primaryDayKey: 'bs_day', secondaryDayKey: 'ad_day' });
});

document.getElementById('loadAdMonth').addEventListener('click', () => {
  const value = document.getElementById('adMonthInput').value;
  const monthInfo = cal.get_calendar_month_eng(value, {
    holidays: [{ date: '2083-03-01', label: 'Sample holiday' }],
  });
  if (!monthInfo) return alert('Invalid or out-of-range AD month.');
  renderMonthGrid(monthInfo, { primaryDayKey: 'ad_day', secondaryDayKey: 'bs_day' });
});

// Load an initial grid so the section isn't empty on first paint
document.getElementById('loadBsMonth').click();
