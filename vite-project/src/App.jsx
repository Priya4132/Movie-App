import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Movies from './pages/Movies'
import PrivateRoute from './components/PrivateRoute'
import MovieDetails from './pages/MovieDetails'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import MovieScroller from './pages/MovieScroller'

const App = () => {
  return (
    <div>
      {/* <h1>React Movie Explorer</h1> */}
      <Navbar />
      <Routes>
        <Route path="/" element={< Home/>}> </Route>
        {/* <Route path="/movies" element={ <PrivateRoute> < MovieScroller/> </ PrivateRoute>}> </Route> */}
        <Route path="/movies" element={ <PrivateRoute> < Movies/> </ PrivateRoute>}> </Route>

        <Route path="/movies/:id" element={ <PrivateRoute> < MovieDetails/> </ PrivateRoute>}> </Route>
        <Route path="/edit-movie/:id" element={ <PrivateRoute> < EditMovie/> </ PrivateRoute>}> </Route>

        <Route path="/add-movie" element={ <PrivateRoute> < AddMovie/> </ PrivateRoute>}> </Route>
        <Route path="/login" element={< Login/>}> </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
