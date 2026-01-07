const cursor = document.getElementById("cursor");
const btn = document.querySelector(".btn");
const bgCircle = document.querySelector(".btn-bg-circle");

const defaultCursorColor = "#000";

/* =====================
   Cursor follows mouse
===================== */
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* =====================
   Button hover animation
===================== */
btn.addEventListener("mouseenter", (e) => {
  const rect = btn.getBoundingClientRect();

  // Mouse position relative to button
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Max distance to cover button
  const maxDistance = Math.max(
    Math.hypot(x, y),
    Math.hypot(rect.width - x, y),
    Math.hypot(x, rect.height - y),
    Math.hypot(rect.width - x, rect.height - y)
  ) * 2;

  // Position circle at entry point
  bgCircle.style.left = x + "px";
  bgCircle.style.top = y + "px";
  bgCircle.style.width = "0px";
  bgCircle.style.height = "0px";

  // Force browser to apply reset
  bgCircle.offsetHeight;

  // Expand circle
  bgCircle.style.width = maxDistance + "px";
  bgCircle.style.height = maxDistance + "px";

  // Text + cursor changes
  btn.style.color = "#000";
  cursor.style.transform = "translate(-50%, -50%) scale(.8)";
});



/* =====================
   Button leave reset
===================== */
btn.addEventListener("mouseleave", () => {
  btn.classList.add("reset-instant");
  bgCircle.style.width = "0px";
  bgCircle.style.height = "0px";

  setTimeout(() => {
    btn.classList.remove("reset-instant");
  }, 50);

  btn.style.color = "#fff";
  cursor.style.backgroundColor = defaultCursorColor;
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

/* =====================
   Click feedback
===================== */
document.addEventListener("mousedown", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(0.6)";
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

// Show cursor when entering window
document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});
