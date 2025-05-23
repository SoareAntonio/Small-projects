  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }
  //Selectăm toate elementele cu clasa key și le convertim într-un array cu Array.from, pentru a putea itera ușor asupra lor
  const keys = Array.from(document.querySelectorAll('.key'));
  //Pentru fiecare element key, adăugăm un ascultător de eveniment pentru transitionend, care va apela removeTransition după terminarea animației CSS.
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  //
  window.addEventListener('keydown', playSound);