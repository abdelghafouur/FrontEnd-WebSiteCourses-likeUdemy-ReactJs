import React from "react";
import './Test.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StartQuiz = () => {
    const { idCourse } = useParams();

    return (
      <div  className="mybody">
        <div className="quiz-container">
          <div className="result">
                <h3>okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</h3>
                <h3>okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk you can just </h3>
                <div className="d-md-flex">
                      <Link to={`/Espace_User/CourseSingle/Quiz/${idCourse}`} >
                          <button className="btn btn-orange btn-wide mb-4 mb-md-0 ms-md-3 flex-grow-1" name="button">
                            Start Quiz Now !
                          </button>
                          </Link>
                </div>
          </div>
        </div>
      </div>
    )
  }

export default StartQuiz;