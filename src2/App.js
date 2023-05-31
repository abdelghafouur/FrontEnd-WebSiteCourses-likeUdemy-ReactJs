import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './views/Espace_Visiteur/index'
import Allcourses from './views/Espace_Visiteur/Allcourses'
import LatestCours from './views/Espace_Visiteur/LatestCours'
import MyCoures from './views/Espace_Visiteur/MyCoures'
import Institut from './views/Espace_Visiteur/Institut'
import ContactUs from './views/Espace_Visiteur/ContactUs'
import FAQ from './views/Espace_Visiteur/FAQ'
import CourseSingle from './views/Espace_Visiteur/CourseSingle'
import ShopCourses from './views/Espace_Visiteur/shopCourses'
import WatchCourse from './views/Espace_Visiteur/WatchCourse'
import AllFormation from './views/Espace_Visiteur/AllFormation';
import FormationSingle from './views/Espace_Visiteur/FormationSingle';




export default function App(){
    return (
        <BrowserRouter>
            <Routes>
              <Route element={<Index/>}  path="/" />
              <Route element={<LatestCours/>}  path="/LatestCours" />
              <Route element={<Allcourses/>}  path="/Allcourses" />
              <Route element={<MyCoures/>}  path="/MyCoures" />
              <Route element={<Institut/>}  path="/Institut" />
              <Route element={<ContactUs/>}  path="/ContactUs" />
              <Route element={<FAQ/>}  path="/FAQ" />
              <Route element={<CourseSingle/>}  path="/CourseSingle" />
              <Route element={<ShopCourses/>}  path="/shopCourses" />
              <Route element={<WatchCourse/>}  path="/WatchCourse" />
              <Route element={<AllFormation/>}  path="/AllFormation" />
              <Route element={<FormationSingle/>}  path="/FormationSingle" />
            </Routes>
        </BrowserRouter>
        );
    }



