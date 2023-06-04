import React, { useEffect ,useState} from "react";
import './WatchCourse.css'
import './styleAll.css'
import Footer from './Footer'
import NavBar from './NavBar'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../function/useAuth';

const WatchCourse = () => { 
  useAuth()
  const { idCourse } = useParams();
  const count = 0
  const [course, setCourses] = useState([]);
  const [objectives, setobjectives] = useState([]);
  const [Comments, setComments] = useState([]);
  const [videos, setvideos] = useState([]);
  const [CoursesForUser, setCoursesForUser] = useState([]);
  const [content ,setcontent ]= useState('')
  const [rating ,setrating ]= useState('')
  const [course_id1 ,setcourse_id1 ]= useState('')
  const [compte_id1 ,setcompte_id1 ]= useState('')
  const [Resultaaat, setResultaaat] = useState([]);

  const userInformation = JSON.parse(localStorage.getItem('user')); 
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    $('[data-fancybox]').fancybox(); // Initialize fancybox

    return () => {
      $('[data-fancybox]').fancybox('destroy'); // Clean up when component unmounts
    };
  }, []);
  useEffect(() => {
    fetchUserCourses()
    setcourse_id1(idCourse)
    setcompte_id1(userInformation.id)
}, []);
const handleDownloadCertificate = async () => {
  try {
      const userId = userInformation.id; // Assuming you have the user's ID
      const response = await axios.get(`http://127.0.0.1:8000/api/certificategetDown/${idCourse}/${userId}`, {
          responseType: 'blob', // Set the response type to 'blob' to receive binary data
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  } catch (error) {
      console.error('Error downloading certificate:', error);
  }
};

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
      try {
        const userId = userInformation.id; // Assuming you have the user's ID
        const response8 = await axios.get(`http://127.0.0.1:8000/api/FindquizCourse/${idCourse}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response8.status === 200) {
  
          const data8 = response8.data;
          setResultaaat(data8);
          console.log(data8);
        } else {
          throw new Error('Failed to fetch user courses');
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const response4 = await axios.get(`http://127.0.0.1:8000/api/videoCourses/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response4.status === 200) {
  
          const data4 = response4.data;
          setvideos(data4);
        } else {
          throw new Error('Failed to fetch user courses');
        }
      } catch (error) {
        console.error(error);
      }

    } else {
      throw new Error('Failed to fetch user courses');
    }
  } catch (error) {
    console.error(error);
  }

}
  return (
            <div style={{"backgroundColor":"#212041"}} >
              <div className="container container-wd row pt-8 pb-10" >
                <div className="col-lg-8">
                {videos.map((video, index) => (
        <a
          key={index}
          href={video.link}
          className={`d-block sk-thumbnail rounded mb-5 ${index !== 0 ? 'hide' : ''}`}
          data-fancybox
        >
 <div className="h-60p w-60p rounded-circle bg-white size-20-all d-inline-flex align-items-center justify-content-center position-absolute center z-index-1">
                        {/* Icon */}
                        <svg width={14} height={16} viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.8704 6.15374L3.42038 0.328572C2.73669 -0.0923355 1.9101 -0.109836 1.20919 0.281759C0.508282 0.673291 0.0898438 1.38645 0.0898438 2.18929V13.7866C0.0898438 15.0005 1.06797 15.9934 2.27016 16C2.27344 16 2.27672 16 2.27994 16C2.65563 16 3.04713 15.8822 3.41279 15.6591C3.70694 15.4796 3.79991 15.0957 3.62044 14.8016C3.44098 14.5074 3.05697 14.4144 2.76291 14.5939C2.59188 14.6982 2.42485 14.7522 2.27688 14.7522C1.82328 14.7497 1.33763 14.3611 1.33763 13.7866V2.18933C1.33763 1.84492 1.51713 1.53907 1.81775 1.3711C2.11841 1.20314 2.47294 1.21064 2.76585 1.39098L12.2159 7.21615C12.4999 7.39102 12.6625 7.68262 12.6618 8.01618C12.6611 8.34971 12.4974 8.64065 12.2118 8.81493L5.37935 12.9983C5.08548 13.1783 4.9931 13.5623 5.17304 13.8562C5.35295 14.1501 5.73704 14.2424 6.03092 14.0625L12.8625 9.87962C13.5166 9.48059 13.9081 8.78496 13.9096 8.01868C13.9112 7.25249 13.5226 6.55524 12.8704 6.15374Z" fill="currentColor" />
                          </svg>
                      </div>
                      <img className="rounded shadow-light-lg"  src={`http://127.0.0.1:8000/images/${course.image}`}alt="..." />
        </a>
      ))}
                  <h3 className="text-white">Course Description</h3>
                  <p className="mb-6 line-height-md">{course.description}</p>
                  <div className="d-md-flex align-items-center justify-content-between" style={{"marginBottom":"100px","marginTop":"100px"}}>
                  <Link to={`/Espace_User/CourseSingle/${course.id}`}  className="btn btn-blue d-flex align-items-center mb-5 mb-md-0 btn-block mw-md-280p justify-content-center">
                      <i className="fas fa-arrow-left font-size-xs" />
                      <span className="ms-3">Back to Course</span>
                    </Link>
                    <Link to={`/Espace_User/CourseSingle/StartQuiz/${course.id}`}  className="btn btn-blue d-flex align-items-center btn-block mw-md-280p justify-content-center mt-0">
                      <span className="me-3">Lansez Quiz</span>
                      <i className="fas fa-arrow-right font-size-xs" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="bg-portgore rounded p-6">
                    <div id="accordionCurriculum" className>
                      <div className="overflow-hidden bg-dark rounded mb-6">
                        <div className="d-flex align-items-center" id="curriculumheadingOne">
                          <h5 className="mb-0 w-100">
                            <button className="d-flex align-items-center p-5 min-height-80 text-white fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#CurriculumcollapseOne" aria-expanded="true" aria-controls="CurriculumcollapseOne">
                              <span className="me-4 text-white d-flex">
                                {/* Icon */}
                                <svg width={15} height={2} viewBox="0 0 15 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width={15} height={2} fill="currentColor" />
                                </svg>
                                <svg width={15} height={16} viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0 7H15V9H0V7Z" fill="currentColor" />
                                  <path d="M6 16L6 8.74228e-08L8 0L8 16H6Z" fill="currentColor" />
                                </svg>
                              </span>
                              Introduction
                            </button>
                          </h5>
                        </div>
                        <div id="CurriculumcollapseOne" className="collapse show" aria-labelledby="curriculumheadingOne" data-parent="#accordionCurriculum">
                        { videos.map((video,index) =>(
                        
                          <div className="border-top px-5 border-color-20 py-4 min-height-70 d-md-flex align-items-center">
                            <div className="d-flex align-items-center me-auto mb-4 mb-md-0">
                              <div className="text-secondary d-flex">
                                <svg width={14} height={18} viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.5717 0H4.16956C4.05379 0.00594643 3.94322 0.0496071 3.85456 0.124286L0.413131 3.57857C0.328167 3.65957 0.280113 3.77191 0.280274 3.88929V16.8514C0.281452 17.4853 0.794988 17.9988 1.42885 18H12.5717C13.1981 17.9989 13.7086 17.497 13.7203 16.8707V1.14857C13.7191 0.514714 13.2056 0.00117857 12.5717 0ZM8.18099 0.857143H10.6988V4.87714L9.80527 3.45214C9.76906 3.39182 9.71859 3.3413 9.65827 3.30514C9.45529 3.18337 9.19204 3.24916 9.07027 3.45214L8.18099 4.87071V0.857143ZM3.7367 1.46786V2.66143C3.73552 3.10002 3.38029 3.45525 2.9417 3.45643H1.74813L3.7367 1.46786ZM12.8546 16.86C12.8534 17.0157 12.7274 17.1417 12.5717 17.1429H1.42885C1.42665 17.1429 1.42445 17.143 1.42226 17.143C1.26486 17.1441 1.13635 17.0174 1.13527 16.86V4.32214H2.9417C3.85793 4.31979 4.60006 3.57766 4.60242 2.66143V0.857143H7.31527V5.23286C7.31345 5.42593 7.37688 5.61391 7.49527 5.76643C7.67533 5.99539 7.98036 6.08561 8.25599 5.99143L8.28813 5.98071C8.49272 5.89484 8.66356 5.7443 8.77456 5.55214L9.44099 4.48071L10.1074 5.55214C10.2184 5.7443 10.3893 5.89484 10.5938 5.98071C10.8764 6.0922 11.1987 6.00509 11.3867 5.76643C11.5051 5.61391 11.5685 5.42593 11.5667 5.23286V0.857143H12.5717C12.7266 0.858268 12.8523 0.982982 12.8546 1.13786V16.86Z" fill="currentColor" />
                                  <path d="M10.7761 14.3143H3.22252C2.98584 14.3143 2.79395 14.5062 2.79395 14.7429C2.79395 14.9796 2.98584 15.1715 3.22252 15.1715H10.7761C11.0128 15.1715 11.2047 14.9796 11.2047 14.7429C11.2047 14.5062 11.0128 14.3143 10.7761 14.3143Z" fill="currentColor" />
                                  <path d="M10.7761 12.2035H3.22252C2.98584 12.2035 2.79395 12.3954 2.79395 12.6321C2.79395 12.8687 2.98584 13.0606 3.22252 13.0606H10.7761C11.0128 13.0606 11.2047 12.8687 11.2047 12.6321C11.2047 12.3954 11.0128 12.2035 10.7761 12.2035Z" fill="currentColor" />
                                  <path d="M10.7761 10.0928H3.22252C2.98584 10.0928 2.79395 10.2847 2.79395 10.5213C2.79395 10.758 2.98584 10.9499 3.22252 10.9499H10.7761C11.0128 10.9499 11.2047 10.758 11.2047 10.5213C11.2047 10.2847 11.0128 10.0928 10.7761 10.0928Z" fill="currentColor" />
                                  <path d="M10.7761 7.98218H3.22252C2.98584 7.98218 2.79395 8.17407 2.79395 8.41075C2.79395 8.64743 2.98584 8.83932 3.22252 8.83932H10.7761C11.0128 8.83932 11.2047 8.64743 11.2047 8.41075C11.2047 8.17407 11.0128 7.98218 10.7761 7.98218Z" fill="currentColor" />
                                </svg>
                              </div>
                              <div className="ms-4">
                              {video.title}
                              </div>
                            </div>
                            <div className="d-flex align-items-center overflow-auto overflow-md-visible flex-shrink-all">
                              <div className="badge btn-orange-soft text-white-70 me-5 font-size-sm fw-normal py-2">{video.duration}</div>
                              <a href={`WatchCourse#true-${index + 1}`} className="text-secondary d-flex">
                                {/* Icon */}
                                <svg width={14} height={16} viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.8704 6.15374L3.42038 0.328572C2.73669 -0.0923355 1.9101 -0.109836 1.20919 0.281759C0.508282 0.673291 0.0898438 1.38645 0.0898438 2.18929V13.7866C0.0898438 15.0005 1.06797 15.9934 2.27016 16C2.27344 16 2.27672 16 2.27994 16C2.65563 16 3.04713 15.8822 3.41279 15.6591C3.70694 15.4796 3.79991 15.0957 3.62044 14.8016C3.44098 14.5074 3.05697 14.4144 2.76291 14.5939C2.59188 14.6982 2.42485 14.7522 2.27688 14.7522C1.82328 14.7497 1.33763 14.3611 1.33763 13.7866V2.18933C1.33763 1.84492 1.51713 1.53907 1.81775 1.3711C2.11841 1.20314 2.47294 1.21064 2.76585 1.39098L12.2159 7.21615C12.4999 7.39102 12.6625 7.68262 12.6618 8.01618C12.6611 8.34971 12.4974 8.64065 12.2118 8.81493L5.37935 12.9983C5.08548 13.1783 4.9931 13.5623 5.17304 13.8562C5.35295 14.1501 5.73704 14.2424 6.03092 14.0625L12.8625 9.87962C13.5166 9.48059 13.9081 8.78496 13.9096 8.01868C13.9112 7.25249 13.5226 6.55524 12.8704 6.15374Z" fill="currentColor" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>
                    {Object.keys(Resultaaat).length === 0 ? (
                      <></>
                    ) : (
                      (Resultaaat.etat === "true") ? (
                        <div className="d-md-flex">
                          <button className="btn btn-orange btn-wide mb-4 mb-md-0 ms-md-3 flex-grow-1" onClick={handleDownloadCertificate} name="button">
                            Download Certificate
                          </button>
                        </div>
                      ) : (
                        <></>
                      )
                    )}

                  </div>
                </div>
              </div>
            </div>
        )
    }
    export default WatchCourse 