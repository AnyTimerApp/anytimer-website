// Which question category is in view on the Never have I ever page. Used by
// the NL and EN page to highlight the matching button in the sticky filter
// bar, and to slide that button into view on a phone.

// The category whose heading last passed the line just under the sticky bar.
export function currentCategory(ids: string[], offset: number): string | null {
  let current: string | null = null;
  for (const id of ids) {
    const heading = document.getElementById(id);
    if (heading && heading.getBoundingClientRect().top <= offset) current = id;
  }
  return current;
}

// Scrolls the row of buttons sideways so the active one sits in the middle.
// The row is the button's parent, so this works whatever wraps it.
export function revealButton(bar: HTMLElement | null, id: string) {
  const button = bar?.querySelector<HTMLElement>(`[data-category="${id}"]`);
  const track = button?.parentElement;
  if (!button || !track || track.scrollWidth <= track.clientWidth) return;
  const left = button.offsetLeft - track.offsetLeft - (track.clientWidth - button.offsetWidth) / 2;
  track.scrollTo({ left, behavior: 'smooth' });
}
