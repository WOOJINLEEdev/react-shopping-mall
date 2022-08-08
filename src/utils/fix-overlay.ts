export function fixOverlay() {
  document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
  return () => {
    const scrollY = document.body.style.top;
    document.body.style.cssText = `position: ""; top: "";`;
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };
}
