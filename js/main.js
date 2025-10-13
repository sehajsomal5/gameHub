// Select all game links and add click event
document.querySelectorAll('.game-card a').forEach(link => {
  link.addEventListener('click', () => {
    console.log(`Navigating to ${link.textContent}`);
  });
});
