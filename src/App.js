import React from 'react';
import Header from './Components/Header';
import Footer from "./Components/Footer";
import MainContent from "./Components/MainContent";
import './css/App.css'



function App() {
  return (
      <div className="container-fluid row-cols-1 main m-0 p-0">
          <Header />
          <MainContent />
          <Footer />
      </div>
  )
}

export default App;
