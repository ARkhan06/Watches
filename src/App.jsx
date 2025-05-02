import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./screens/Home";
import Admin from "./screens/AdminUpload";
import MensWatches from "./screens/MensWatches";
import WomenWatches from "./screens/WomenWatches";
import "./index.css";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* Men's routes - use MensWatches component */}
        <Route path="/men" element={<MensWatches />} />
        <Route path="/men/:category" element={<MensWatches />} />
        
        {/* Women's routes - use WomenWatches component */}
        <Route path="/women" element={<WomenWatches />} />
        <Route path="/women/:category" element={<WomenWatches />} />
        
        <Route path="/shop" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;