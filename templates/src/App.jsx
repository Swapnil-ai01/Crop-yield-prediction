import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import NewPage from './components/NewPage';
import Header from "./components/Header";

function App() {
  return (
    <Router>
        <div className="main-container">
        <Header/>
        
        </div>
        <div className="content">
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/newpage" element={<NewPage/>}></Route>
        </Routes>
        </div>
    </Router>
  );
}

export default App;
