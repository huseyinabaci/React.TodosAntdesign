import './App.css'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostForm from './pages/PostForm';
import TableForm from './pages/TableForm';
import UpdateForm from './pages/UpdateForm';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableForm />} />
        <Route path="/post" element={<PostForm />} />
        <Route path="/detail/:id" element={<UpdateForm />} />
      </Routes>
    </Router>
  )
}

export default App
