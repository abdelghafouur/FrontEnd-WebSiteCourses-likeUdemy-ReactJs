import React from "react";
import './Test.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../function/useAuth';

const StartQuiz = () => {
  useAuth()
    const { idCourse } = useParams();
      const styles = {
        container: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width:'800px',
          textAlign: 'center',
          marginLeft:"400px"
        },
        content: {
          textAlign: 'center',
        },
        heading: {
          color: '#333',
        },
        paragraph: {
          marginBottom: '20px',
        },
        orderedList: {
          marginLeft: '30px',
          marginBottom: '20px',
        },
        listItem: {
          marginBottom: '10px',
        },
        button: {
          padding: '10px 20px',
          backgroundColor: '#428bca',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        },
      };
    
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <h1 style={styles.heading}>Welcome to the Test Page!</h1>
            <p style={styles.paragraph}>
              Before you begin the test, here is some important information:
            </p>
            <ol style={styles.orderedList}>
              <li style={styles.listItem}>
                Certificate Requirement: In order to obtain the certificate for this test, you must achieve a minimum percentage of 70%. This ensures that you have demonstrated a satisfactory understanding of the test material.
              </li>
              <li style={styles.listItem}>
                Test Retake Policy: Please note that the test cannot be retaken until a period of 15 days has passed. This is to allow sufficient time for further study and reflection before attempting the test again.
              </li>
              <li style={styles.listItem}>
                Test Instructions: When you click the "Start Test" button, you will be presented with a series of questions related to the subject matter. Read each question carefully and select the most appropriate answer.
              </li>
              <li style={styles.listItem}>
                Completion and Results: Once you have completed the test, your results will be automatically evaluated. If you meet the required percentage for certification, you will be eligible to receive a certificate of completion. Otherwise, you may consider further study or review the test material before attempting it again after the designated waiting period.
              </li>
            </ol>
            <p style={styles.paragraph}>
              Remember, the purpose of this test is to assess your knowledge and understanding of the subject matter. Take your time, think through each question, and do your best. Good luck!
            </p>

            <div>
                      <Link to={`/Espace_User/CourseSingle/Quiz/${idCourse}`} >
                          <button className="btn btn-orange btn-wide mb-4 mb-md-0 ms-md-3 flex-grow-1" name="button">
                            Start Quiz Now !
                          </button>
                          </Link>
                </div>
          </div>
        </div>
      );
  }

export default StartQuiz;