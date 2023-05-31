import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css'
import Contact from './views/Espace_Visiteur/Contact'
import Home from './views/Espace_Visiteur/home'
import About from './views/Espace_Visiteur/About'

import Index from './views/Espace_User/index'
import Allcourses from './views/Espace_User/Allcourses'
import LatestCours from './views/Espace_User/LatestCours'
import MyCoures from './views/Espace_User/MyCoures'
import Institut from './views/Espace_User/Institut'
import ContactUs from './views/Espace_User/ContactUs'
import FAQ from './views/Espace_User/FAQ'
import CourseSingle from './views/Espace_User/CourseSingle'
import WatchCourse from './views/Espace_User/WatchCourse'
import AllFormation from './views/Espace_User/AllFormation';
import FormationSingle from './views/Espace_User/FormationSingle';
import Quiz from './views/Espace_User/Test';



export default function App(){
    return (
    <BrowserRouter>
                <Routes>
        <Route element={<About/>} exact path="/About" />
        <Route element={<Home/>}  path="/" />
        <Route element={<Contact/>} exact path="/Contact" />
        
        
              <Route element={<Index/>}  path="/Espace_User/" />
              <Route element={<LatestCours/>}  path="/Espace_User/LatestCours" />
              <Route element={<Allcourses/>}  path="/Espace_User/Allcourses" />
              <Route element={<Allcourses/>}  path="/Espace_User/Allcourses/:parameter" />
              <Route element={<MyCoures/>}  path="/Espace_User/MyCoures" />
              <Route element={<Institut/>}  path="/Espace_User/Institut" />
              <Route element={<ContactUs/>}  path="/Espace_User/ContactUs" />
              <Route element={<FAQ/>}  path="/Espace_User/FAQ" />
              <Route element={<CourseSingle/>}  path="/Espace_User/CourseSingle/:idCourse" />
              <Route element={<WatchCourse/>}  path="/Espace_User/WatchCourse" />
              <Route element={<AllFormation/>}  path="/Espace_User/AllFormation" />
              <Route element={<FormationSingle/>}  path="/Espace_User/FormationSingle/:idFormation" />
              <Route element={<Quiz/>}  path="/Espace_User/CourseSingle/Quiz" />


      </Routes>
        </BrowserRouter>
        );
    }



