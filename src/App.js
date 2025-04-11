// import React, { useState } from "react"; 
// import GamePage from "./pages/GamePage"; 
// import StartPage from "./pages/StartPage"; 


// function App() {
//   const [started, setStarted] = useState(false);

//   return (
//     <div className="App">
//       {started ? (
//         <GamePage goHome={() => setStarted(false)} />
//       ) : (
//         <StartPage onStart={() => setStarted(true)} />
//       )}
//     </div>
//   );
// }

// export default App; 


// ✅ App.js (렌더링 제어)
import React, { useState } from "react"; 
import GamePage from "./pages/GamePage"; 
import StartPage from "./pages/StartPage"; 

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      {started ? (
        <GamePage goHome={() => setStarted(false)} />
      ) : (
        <StartPage onStart={() => setStarted(true)} />
      )}
    </div>
  );
}

export default App; 
