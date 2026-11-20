// The review row on home: it drifts slowly to the left on its own, stops while
// the mouse is on it, and can be dragged with the mouse or swiped on a phone.
// The cards are rendered twice, so when the row has moved one full set it
// jumps back by that amount and the loop never shows a seam.

const SPEED = 0.035; // pixels per millisecond, about 35px a second
const TOUCH_PAUSE = 1500; // wait after a swipe before drifting again

export function startReviewMarquee(row: HTMLElement): () => void {
  const track = row.firstElementChild as HTMLElement | null;
  if (!track) return () => {};

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hover = false;
  let dragging = false;
  let touching = false;
  let touchEnd = 0;
  let startX = 0;
  let visible = false;
  let last = performance.now();
  let frame = 0;

  // Width of one set of cards, including the gap that follows it.
  const half = () => (track.scrollWidth + parseFloat(getComputedStyle(track).columnGap || '0')) / 2;

  // Kept separately, because some browsers round scrollLeft to whole pixels
  // and the row would never move at less than one pixel per frame.
  let position = 1;
  row.scrollLeft = position;

  const wrap = () => {
    const h = half();
    if (row.scrollLeft >= h) row.scrollLeft -= h;
    else if (row.scrollLeft < 1) row.scrollLeft += h;
    position = row.scrollLeft;
  };

  const listeners: [EventTarget, string, EventListener, AddEventListenerOptions?][] = [
    [row, 'pointerenter', (e) => { if ((e as PointerEvent).pointerType === 'mouse') hover = true; }],
    [row, 'pointerleave', () => { hover = false; }],
    [row, 'pointerdown', (e) => {
      const p = e as PointerEvent;
      if (p.pointerType !== 'mouse') return;
      dragging = true;
      startX = p.clientX;
      row.classList.add('marquee-track--dragging');
      row.setPointerCapture(p.pointerId);
    }],
    [row, 'pointermove', (e) => {
      if (!dragging) return;
      const p = e as PointerEvent;
      row.scrollLeft -= p.clientX - startX;
      startX = p.clientX;
      wrap();
    }],
    [row, 'pointerup', () => endDrag()],
    [row, 'pointercancel', () => endDrag()],
    [row, 'scroll', () => { if (!dragging) wrap(); }, { passive: true }],
    [row, 'touchstart', () => { touching = true; }, { passive: true }],
    [row, 'touchend', () => { touching = false; touchEnd = performance.now(); }, { passive: true }]
  ];

  function endDrag() {
    dragging = false;
    row.classList.remove('marquee-track--dragging');
  }

  for (const [target, type, fn, options] of listeners) target.addEventListener(type, fn, options);

  // Only move while the row is on screen.
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  observer.observe(row);

  const tick = (now: number) => {
    const dt = Math.min(64, now - last);
    last = now;
    const paused = reduceMotion || !visible || hover || dragging || touching || now - touchEnd < TOUCH_PAUSE;
    if (paused) {
      position = row.scrollLeft;
    } else {
      position += dt * SPEED;
      row.scrollLeft = position;
      if (row.scrollLeft >= half()) wrap();
    }
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    for (const [target, type, fn] of listeners) target.removeEventListener(type, fn);
  };
}
