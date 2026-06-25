import React, { useEffect, useRef } from 'react';
import './App.css'; // سنضيف CSS له

function App() {
  const logosRef = useRef(null);

  useEffect(() => {
    // نفس فكرة cloneNode لكن بطريقة React
    if (logosRef.current) {
      const copy = logosRef.current.cloneNode(true);
      logosRef.current.parentNode.appendChild(copy);
    }
  }, []);

  return (
    <div className="logos">
      <div className="logos-slide" ref={logosRef}>
        <img src="./Assets/logos/3m.svg" alt="3m" />
        <img src="./Assets/logos/barstool-store.svg" alt="barstool-store" />
        <img src="./Assets/logos/budweiser.svg" alt="budweiser" />
        <img src="./Assets/logos/buzzfeed.svg" alt="buzzfeed" />
        <img src="./Assets/logos/forbes.svg" alt="forbes" />
        <img src="./Assets/logos/macys.svg" alt="macys" />
        <img src="./Assets/logos/menshealth.svg" alt="menshealth" />
        <img src="./Assets/logos/mrbeast.svg" alt="mrbeast" />
      </div>
    </div>
  );
}

export default App;