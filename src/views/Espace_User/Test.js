import React, { useEffect ,useState} from "react";
import axios from "axios";
import './Test.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../function/useAuth';

const Quiz = () => {
  useAuth()
    const { idCourse } = useParams();
    const currentDate = new Date();
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [quiz1, setQuiz] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [question, setquestion] = useState(0)
    const [choice1, setchoice1] = useState(0)
    const [choice2, setchoice2] = useState(0)
    const [choice3, setchoice3] = useState(0)
    const [choice4, setchoice4] = useState(0)
    const [correctAnswer, setcorrectAnswer] = useState(0)
    const [ResultatFind, setResultatFind] = useState([])
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const userInformation = JSON.parse(localStorage.getItem('user'));
    const [Courses, setCourses] = useState([]);
    const token = localStorage.getItem('token');
    let resultDate;
    const [result, setResult] = useState({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    })


    const handleGenerateCertificate = async () => {
      
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generate-certificate', {
          firstname: userInformation.firstname,
          lastname: userInformation.lastname,
          course: Courses.title,
          note: (result.score * 100)/20,
        }, {
          responseType: 'blob', // Set the response type to 'blob' to receive binary data
        });
  
        // Create a download link
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        downloadLink.href = url;
        downloadLink.setAttribute('download', 'certificate.pdf');
        document.body.appendChild(downloadLink);
  
        // Trigger the download
        downloadLink.click();
  
        // Clean up
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
        
        // Convert the PDF to a base64 string
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];

          // Update the certificate information in the database
          try {
            const userId = userInformation.id; // Assuming you have the user's ID
            const certificateData = {
              certificate: base64data,
            };
            await axios.put(`http://127.0.0.1:8000/api/updateCertificate/${idCourse}/${userId}`, certificateData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('Update success.'); // Handle success, e.g., show a success message or redirect to another page
          } catch (error) {
            console.log('Update failed. Please try again.'); // Handle error, e.g., show an error message
          }
        };

      } catch (error) {
        console.error('Error generating certificate:', error);
      }
    };




    useEffect(() => {
        fetchResultat()
        fetchUserCourseQuiz()
        fetchUserCourses()
    }, []);

    useEffect(() => {
        fetchResultat()
        if (quiz1.length > 0) {
            const myquiz1 = quiz1[activeQuestion];
            setquestion(myquiz1.question)
            setchoice1(myquiz1.choice1)
            setchoice2(myquiz1.choice2)
            setchoice3(myquiz1.choice3)
            setchoice4(myquiz1.choice4)
            setcorrectAnswer(myquiz1.correctAnswer)
          }
        if(showResult == true)
          {
            fetchUserCourseResultat()
          }
      }, [quiz1,activeQuestion]);
      const fetchUserCourses = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/course/${idCourse}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.status === 200) {
    
            const data = response.data;
            setCourses(data);
          } else {
            throw new Error('Failed to fetch user courses');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const fetchResultat = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/FindquizCourse/${idCourse}/${userInformation.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.status === 200) {
  
            const data = response.data;
            setResultatFind(data)
          } else {
            throw new Error('Failed to fetch user courses');
          }
        } catch (error) {
          console.error(error);
        }
      };
    const fetchUserCourseQuiz = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/QuizmyCourse/${idCourse}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {

          const data = response.data;
          setQuiz(data);
        } else {
          throw new Error('Failed to fetch user courses');
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUserCourseResultat = async () => {
        const formData = new FormData();
            formData.append('course_id', idCourse);
            formData.append('compte_id', userInformation.id);
            formData.append('note', result.score);
            let etat;
            if(result.score > 4 )
                {
                    formData.append('etat', "true");
                    etat = "true";
                }
            else
                {
                    formData.append('etat', "false");
                    etat = "false";
                }
            if(Object.keys(ResultatFind).length == 0 )
                {
                    try {
                        axios.post(`http://127.0.0.1:8000/api/ResultatTest`,formData,
                              {
                                headers: {
                                    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                                    Authorization: `Bearer ${token}`,
                                  }
                             })
                            .then(response => {
                                const { message } = response.data;
                                console.log(message);
                            })
                            .catch(error => {
                                if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                                } else if (error.request) {
                                console.log(error.request);
                                } else {
                                console.log('Error', error.message);
                                }
                                console.log(error.config);
                            });
                    } catch (error) {
                        console.log(error)
                    }
                }
            else
                {
                    const note = result.score;
                    try {
                        await axios.put(`http://127.0.0.1:8000/api/updateResultat/${idCourse}/${userInformation.id}`, {note,etat}, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        });
                        console.log('Update success.');// Handle success, e.g., show a success message or redirect to another page
                      } catch (error) {
                        console.log('Update failed. Please try again. ll'); // Handle error, e.g., show an error message
                      }
                }
      };


    const onClickNext = () => {
      setSelectedAnswerIndex(null)
      setResult((prev) =>
        selectedAnswer
          ? {
              ...prev,
              score: prev.score + 2,
              correctAnswers: prev.correctAnswers + 1,
            }
          : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
      )
      if (activeQuestion !== quiz1.length - 1) {
        setActiveQuestion((prev) => prev + 1)
      } else {
        setActiveQuestion(0)
        setShowResult(true)
      }
    }

    const onAnswerSelected = (answer, index) => {
      setSelectedAnswerIndex(index)
      if (answer === correctAnswer) {
        setSelectedAnswer(true)
      } else {
        setSelectedAnswer(false)
      }
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
    if (ResultatFind) {
        resultDate = new Date(ResultatFind.date);
        resultDate.setDate(resultDate.getDate() + 15);
      }
    return (
      <div  className="mybody">
        <div className="quiz-container">
          {ResultatFind && Object.keys(ResultatFind).length == 0 || currentDate >= resultDate ? (
              <>
          {!showResult ? (
              <div>
                <div>
                  <span className="active-question-no">
                    {addLeadingZero(activeQuestion + 1)}
                  </span>
                  <span className="total-question">
                    /{addLeadingZero(quiz1.length)}
                  </span>
                </div>
                <h2>{question}</h2>
                {choice1 ? (<ul>
                    <li
                      onClick={() => onAnswerSelected(choice1, 1)}
                      key={choice1}
                      className={
                        selectedAnswerIndex === 1 ? 'selected-answer' : null
                      }
                    >
                      {choice1}
                    </li>
                    <li
                      onClick={() => onAnswerSelected(choice2, 2)}
                      key={choice2}
                      className={
                        selectedAnswerIndex === 2 ? 'selected-answer' : null
                      }
                    >
                      {choice2}
                    </li>
                    <li
                      onClick={() => onAnswerSelected(choice3, 3)}
                      key={choice3}
                      className={
                        selectedAnswerIndex === 3 ? 'selected-answer' : null
                      }
                    >
                      {choice3}
                    </li>
                    <li
                      onClick={() => onAnswerSelected(choice4, 4)}
                      key={choice4}
                      className={
                        selectedAnswerIndex === 4 ? 'selected-answer' : null
                      }
                    >
                      {choice4}
                    </li>
                </ul>) : (<li> Waiting..</li>)}
    
                <div className="flex-right">
                  <button
                    onClick={onClickNext}
                    disabled={selectedAnswerIndex === null}
                  >
                    {activeQuestion === quiz1.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="result">
                <h3>Result</h3>
                <p>
                  Total Question: <span>{quiz1.length}</span>
                </p>
                <p>
                  Correct Answers:<span> {result.correctAnswers}</span>
                </p>
                <p>
                  Wrong Answers:<span> {result.wrongAnswers}</span>
                </p>
                <p>
                  Total Score:<span> {result.score}</span>
                </p>
                <p>
                  Total Note:<span>  { (result.score * 100)/20 } % </span>
                </p>
                {result.score >= 14 ?(<div>
                  <h1>Congratulations, you have succeeded! ! </h1>
                  <button onClick={handleGenerateCertificate}>Download Certificate</button>
                </div>):(<h1>Unfortunately, you did not pass.</h1>)
                }
                <div className="d-md-flex">
                      <Link to={`/Espace_User/WatchCourse/${idCourse}`}>
                          <button className="btn btn-orange btn-wide mb-4 mb-md-0 ms-md-3 flex-grow-1" name="button">
                            Back to course
                          </button>
                          </Link>
                        </div>
              </div>
            )}</>
        ) : (
          <div className="result">
            
                <h3>Please note that you must wait for a period of 15 days before retaking the test.  </h3> 
                <h3>This allows sufficient time for further study and reflection.</h3>
                <h3>Your last test was taken on <strong style={{color:"red"}}> {ResultatFind.date}.  </strong></h3>
                <h3>The earliest date you can retake the test is <strong style={{color:"red"}}> {(() => {
                      const futureDate = new Date(ResultatFind.date);
                      futureDate.setDate(futureDate.getDate() + 15);
                      const formattedDate = futureDate.toLocaleDateString();
                      return formattedDate;
                  })()}.</strong> </h3>
                <h3 style={{color:"red"}}>Thank you for your understanding.</h3>
                <div  style={{textAlign: 'center'}}>
                      <Link to={`/Espace_User/WatchCourse/${idCourse}`}>
                          <button style={{textAlign: 'center'}} className="btn btn-orange btn-wide mb-4 mb-md-0 ms-md-3 flex-grow-1" name="button">
                            return to course
                          </button>
                          </Link>
                        </div>
          </div>
        )}
        </div>
      </div>
    )
  }

export default Quiz;