(function () {
  
  var toggleBtn = document.getElementById('lang-toggle-about');
  

  var blocks = [
    {
      el: document.getElementById('about-intro'),
      texts: {
        en: "Hey! My name is Silas, I'm 22 years old and currently studying Electrical Engineering and Information Technology at RWTH Aachen University. I've always been fascinated by technology, logic, and innovative, solutions passions that continue to drive me in my academic and personal life. My educational journey started in Düsseldorf and took me through Kempen and Mülhausen, where I completed my A-levels (Abitur) in 2023, , leading to my current studies in Electrical Engineering & Information Technology at RWTH Aachen University. During this time, I gained valuable practical experience through several internships, both in technical and hands-on roles. My most recent internship at Quest One, where I worked in production, further deepened my interest in sustainable energy technologies.",
        de: "Hallo! Mein Name ist Silas, ich bin 22 Jahre alt und studiere derzeit Elektrotechnik und Informationstechnik an der RWTH Aachen. Schon immer habe ich mich für Technologie, Logik und innovative Lösungen begeistert, Leidenschaften, die mich in meinem Studium und Privatleben weiter antreiben. Mein Bildungsweg begann in Düsseldorf und führte mich über Kempen und Mülhausen, wo ich 2023 mein Abitur abgeschlossen habe. Während der Schulzeit sammelte ich wertvolle praktische Erfahrungen in mehreren Praktika, sowohl in technischen als auch in handwerklichen Bereichen. Mein letztes Praktikum bei Quest One in der Produktion hat mein Interesse an nachhaltigen Energietechnologien weiter vertieft."
      }
    },
    {
      el: document.getElementById('about-extra'),
      texts: {
        en: "Outside of university, I enjoy staying active and creative. I completed training as a school paramedic, play guitar, go jogging, and enjoy programming in my free time mostly in C++, Python, or MATLAB. I consider myself curious, open-minded, and passionate about engineering. I'm always eager to apply what I've learned in real-world settings and to keep developing both professionally and personally.",
        de: "Außerhalb der Universität bleibe ich gerne aktiv und kreativ. Ich habe eine Ausbildung zum Schulsanitäter absolviert, spiele Gitarre, jogge und programmiere in meiner Freizeit meist in C++, Python oder MATLAB. Ich sehe mich als neugierig, aufgeschlossen und ingenieurbegeistert. Ich bin stets bestrebt, das Gelernte in der Praxis anzuwenden und mich sowohl beruflich als auch persönlich weiterzuentwickeln."
      }
    }
  ];

  blocks = blocks.filter(function (block) { return block.el; });
  if (!blocks.length) return;

  var currentLang = 'de';

  function render() {
    blocks.forEach(function (block) {
      block.el.textContent = block.texts[currentLang];
      block.el.setAttribute('data-lang', currentLang);
      block.el.setAttribute('lang', currentLang);
    });
    document.documentElement.setAttribute('lang', currentLang);
    toggleBtn.textContent = currentLang === 'en' ? 'DE' : 'EN';
    toggleBtn.setAttribute(
      'aria-label',
      currentLang === 'en'
        ? 'Vorstellungstext auf Deutsch anzeigen'
        : 'Show introduction in English'
    );
  }

  toggleBtn.addEventListener('click', function () {
    currentLang = currentLang === 'en' ? 'de' : 'en';
    render();
  });

  render();
})();
