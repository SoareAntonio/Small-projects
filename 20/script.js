
const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognitionClass) {
  alert("Browserul tău nu suportă Web Speech API. Te rugăm folosește Google Chrome.");
} else {
  const recognition = new SpeechRecognitionClass();
  recognition.interimResults = true;
  recognition.continuous = true; // opțional, dar ajută pentru sesiuni mai lungi

  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    p.textContent = transcript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);

      // Exemple de comandă vocală
      if (transcript.toLowerCase().includes('get the weather')) {
        console.log('Getting the weather');
      }
    }
  });

  recognition.addEventListener('end', () => recognition.start());

  recognition.start();
}
