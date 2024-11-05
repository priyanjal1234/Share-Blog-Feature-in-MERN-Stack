import React from 'react'
import { Routes,Route } from "react-router-dom";
import Content from './Components/Content';
import BlogDetail from './Components/BlogDetail';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Content />}/>
        <Route path='/blog/:id' element = {<BlogDetail />}/>
      </Routes>
    </div>
  )
}

export default App