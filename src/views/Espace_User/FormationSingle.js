import React, { useEffect ,useState} from "react";
import './LatestCours.css'
import './FormationSingle.css'
import './styleAll.css'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from "axios";
import { useParams } from 'react-router-dom';
import moment from 'moment';


const FormationSingle = () => {
    const isObjectEmpty = {};
  const { idFormation } = useParams();
    const [course, setCourses] = useState([]);
    const [objectives, setobjectives] = useState([]);
    const [Comments, setComments] = useState([]);
    const [content ,setcontent ]= useState('')
    const [rating ,setrating ]= useState('')
    const [course_id1 ,setcourse_id1 ]= useState('')
    const [compte_id1 ,setcompte_id1 ]= useState('')
    const [myEtat ,setmyEtat]= useState('')
    const userInformation = JSON.parse(localStorage.getItem('user')); 
    const [datee, setdatee] = useState([]);
  
    useEffect(() => {
      const targetDate = moment(datee);
      const countdownInterval = setInterval(() => {
        const remainingTime = targetDate.diff(moment(), 'seconds');
        setRemainingTime(remainingTime);
      }, 1000);
  
      return () => {
        clearInterval(countdownInterval);
      };
    }, [datee]);
    const [remainingTime, setRemainingTime] = useState(0);
    useEffect(() => {
        fetchUserCourses()
        setcourse_id1(idFormation)
        setcompte_id1(userInformation.id)
        fetchFormation()
    }, []);
  
    const fetchUserCourses = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/formation/${idFormation}`, {
          headers: {
          },
        });
  
        if (response.status === 200) {
  
          const data = response.data;
          setCourses(data);
          setdatee(data.date)
          try {
            const response3 = await axios.get(`http://127.0.0.1:8000/api/objectFormation/${data.id}`, {
              headers: {
              },
            });
      
            if (response3.status === 200) {
      
              const data3 = response3.data;
              setobjectives(data3);
            } else {
              throw new Error('Failed to fetch user courses');
            }
          } catch (error) {
            console.error(error);
          }
          try {
            const response5 = await axios.get(`http://127.0.0.1:8000/api/CommentFormation/${data.id}`, {
              headers: {
              },
            });
      
            if (response5.status === 200) {
      
              const data5 = response5.data;
              setComments(data5);
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
    };
    const days = Math.floor(remainingTime / (24 * 60 * 60));
  const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = Math.floor(remainingTime % 60);

    function RegisterComment(event)
    {
            event.preventDefault();
            const formData = new FormData();
            formData.append('content', content);
            formData.append('rating', rating);
            formData.append('formation_id', course_id1);
            formData.append('compte_id', compte_id1);
            try {
                axios.post('http://127.0.0.1:8000/api/registerCommentsFor',formData, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                          }
                     })
                    .then(response => {
                        const { message } = response.data;
                        window.location.reload()
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
        };

    const handleGenerateCertificate = async () => {
          try {
            const response = await axios.post('http://127.0.0.1:8000/api/generate-atestation', {
              firstname: userInformation.firstname,
              lastname: userInformation.lastname,
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
                await axios.put(`http://127.0.0.1:8000/api/updateAtestationInscr/1/${userId}`, certificateData);
                console.log('Update success.'); // Handle success, e.g., show a success message or redirect to another page
                window.location.reload();
              } catch (error) {
                console.log('Update failed. Please try again.'); // Handle error, e.g., show an error message
              }
            };
    
          } catch (error) {
            console.error('Error generating certificate:', error);
          }
        };
    const fetchUserFormationInsc= async () => {
          const formData = new FormData();
              formData.append('formation_id', 1);
              formData.append('compte_id', userInformation.id);
                      try {
                          axios.post(`http://127.0.0.1:8000/api/FormationInscp`,formData,
                                {
                                  headers: {
                                      'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                                    }
                               })
                              .then(response => {
                                  const { message } = response.data;
                                  handleGenerateCertificate()
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
  
        };
    const fetchFormation = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/FormationInscpget/1/${userInformation.id}`, {
              headers: {
              },
            });
      
            if (response.status === 200) {
    
              const data = response.data;
              setmyEtat(data);
                isObjectEmpty = Object.keys(data).length === 0;

            } else {
              throw new Error('Failed to fetch user courses');
            }
          } catch (error) {
            console.error(error);
          }
        };
    const handleDownloadCertificate = async () => {
          try {
              const userId = userInformation.id; // Assuming you have the user's ID
              const response = await axios.get(`http://127.0.0.1:8000/api/AtestationDown/1/${userId}`, {
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
          } catch (error) {
              console.error('Error downloading certificate:', error);
          }
        };

  return (
                 
            <div>
                <NavBar/> 
                {/* EVENT SINGLE
            ================================================== */}
                <div className="sk-thumbnail img-ratio-7">
                <img src={`/../${course.image}`} alt="..." className="img-fluid" />
                </div>
                <div className="container">
                <div className="row">
                    <div className="col-xl-10 mx-xl-auto mt-md-n10 mt-xl-n13 mb-8">
                    <div className="rounded bg-white p-5 p-lg-8">
                        <ul className="nav mx-n3 d-block d-md-flex justify-content-center mb-5 align-items-center">
                        <li className="nav-item px-3 mb-3 mb-md-0">
                            <span className="badge badge-lg badge-orange badge-pill px-5">
                            <span className="text-white fw-normal font-size-sm">{new Date(course.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </span>
                        </li>
                        <li className="nav-item px-3 mb-3 mb-md-0">
                            <div className="d-flex align-items-center">
                            <div className="me-2 d-flex text-secondary icon-uxs">
                                {/* Icon */}
                                <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3164 4.20996C13.985 4.37028 13.8464 4.76904 14.0067 5.10026C14.4447 6.00505 14.6667 6.98031 14.6667 8C14.6667 11.6759 11.6759 14.6667 8 14.6667C4.32406 14.6667 1.33333 11.6759 1.33333 8C1.33333 4.32406 4.32406 1.33333 8 1.33333C9.52328 1.33333 10.9543 1.83073 12.1387 2.77165C12.4259 3.00098 12.846 2.95296 13.0754 2.66471C13.3047 2.37663 13.2567 1.95703 12.9683 1.72803C11.5661 0.613607 9.8016 0 8 0C3.58903 0 0 3.58903 0 8C0 12.411 3.58903 16 8 16C12.411 16 16 12.411 16 8C16 6.77767 15.7331 5.60628 15.2067 4.51969C15.0467 4.18766 14.6466 4.04932 14.3164 4.20996Z" fill="currentColor" />
                                <path d="M7.99967 2.66663C7.63167 2.66663 7.33301 2.96529 7.33301 3.33329V7.99996C7.33301 8.36796 7.63167 8.66663 7.99967 8.66663H11.333C11.701 8.66663 11.9997 8.36796 11.9997 7.99996C11.9997 7.63196 11.701 7.33329 11.333 7.33329H8.66634V3.33329C8.66634 2.96529 8.36768 2.66663 7.99967 2.66663Z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="font-size-sm">{course.time}</div>
                            </div>
                        </li>
                        <li className="nav-item px-3 mb-3 mb-md-0">
                            <div className="d-flex align-items-center">
                            <div className="me-2 d-flex text-secondary icon-uxs">
                                {/* Icon */}
                                <svg width={18} height={18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9748 3.12964C13.6007 1.14086 11.4229 0 9.0002 0C6.57754 0 4.39972 1.14086 3.02557 3.12964C1.65816 5.10838 1.34243 7.61351 2.17929 9.82677C2.40313 10.4312 2.75894 11.0184 3.23433 11.5687L8.52105 17.7784C8.64062 17.919 8.8158 18 9.0002 18C9.18459 18 9.35978 17.919 9.47934 17.7784L14.7646 11.5703C15.2421 11.0169 15.5974 10.4303 15.8194 9.83078C16.658 7.61351 16.3422 5.10838 14.9748 3.12964ZM14.6408 9.38999C14.4697 9.85257 14.1902 10.3099 13.8107 10.7498C13.8096 10.7509 13.8086 10.7519 13.8077 10.7532L9.0002 16.3999L4.1897 10.7497C3.8104 10.3101 3.53094 9.85282 3.35808 9.38581C2.66599 7.55539 2.92864 5.48413 4.06088 3.84546C5.19668 2.20155 6.9971 1.25873 9.0002 1.25873C11.0033 1.25873 12.8035 2.20152 13.9393 3.84546C15.0718 5.48413 15.3346 7.55539 14.6408 9.38999Z" fill="currentColor" />
                                <path d="M9.00019 3.73438C7.0569 3.73438 5.47571 5.31535 5.47571 7.25886C5.47571 9.20237 7.05668 10.7833 9.00019 10.7833C10.9437 10.7833 12.5247 9.20237 12.5247 7.25886C12.5247 5.31556 10.9435 3.73438 9.00019 3.73438ZM9.00019 9.52457C7.75088 9.52457 6.73444 8.50814 6.73444 7.25882C6.73444 6.00951 7.75088 4.99307 9.00019 4.99307C10.2495 4.99307 11.2659 6.00951 11.2659 7.25882C11.2659 8.50814 10.2495 9.52457 9.00019 9.52457Z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="font-size-sm">{course.location}</div>
                            </div>
                        </li>
                        </ul>
                        <h1 className="text-center mb-5">{course.title}</h1>
                        <div className="row w-xl-65 mx-xl-auto text-center">
      <div className="col-6 col-md-3 mb-6 mb-md-0">
        <div className="h1 text-blue mb-2">{days}</div>
        <p className="h5 mb-0">DAYS</p>
      </div>
      <div className="col-6 col-md-3 mb-6 mb-md-0">
        <div className="h1 text-blue mb-2">{hours}</div>
        <p className="h5 mb-0">HOURS</p>
      </div>
      <div className="col-6 col-md-3 mb-6 mb-md-0">
        <div className="h1 text-blue mb-2">{minutes}</div>
        <p className="h5 mb-0">MINUTES</p>
      </div>
      <div className="col-6 col-md-3 mb-6 mb-md-0">
        <div className="h1 text-blue mb-2">{seconds}</div>
        <p className="h5 mb-0">SECONDS</p>
      </div>
    </div>
                    </div>
                    </div>
                </div>
                <div className="row mb-11">
                    <div className="col-lg-8 mb-6 mb-lg-0">
                    <h3 className>Formation Description</h3>
                    <p className="mb-6 line-height-md">{course.description}</p>
                    <h3 className="mb-5">What you'll learn</h3>
                    <div className="row row-cols-lg-2 mb-8">
                        <div className="col-md">
                        <ul className="list-style-v1 list-unstyled">
                            {objectives.map((object) =>(
                              <li key={object.id}>{object.objective}</li>                          
                                ))}
                          </ul>
                        </div>
                    </div>
                    <div className="mb-8">
                      <ul className="list-unstyled pt-2">
                        { Comments.slice(0, 8).map((comment)=>(
                            <li key={comment.id} className="media d-flex">
                            <div className="avatar avatar-xxl me-3 me-md-6 flex-shrink-0">
                              <img src={`../${comment.user && comment.user.image }`} alt="..." className="avatar-img rounded-circle" />
                            </div>
                            <div className="media-body flex-grow-1">
                              <div className="d-md-flex align-items-center mb-5">
                                <div className="me-auto mb-4 mb-md-0">
                                  <h5 className="mb-0">{comment.user && comment.user.firstname }</h5>
                                </div>
                                <div className="star-rating">
                                  <div className="rating" style={{ width: `${ comment.rating * 20}%` }} />
                                </div>
                              </div>
                              <p className="mb-6 line-height-md">{comment.content}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="border shadow rounded p-6 p-md-9">
                        <h3 className="mb-2">Add Reviews &amp; Rate</h3>
                        <div className>What is it like to Course?</div>
                        <form onSubmit={(event)=>RegisterComment(event)}>
                          <div className="clearfix">
                            <fieldset className="slect-rating mb-3">
                              <input type="radio" id="star1" name="rating" onChange={(e)=>setrating(e.target.value)} defaultValue={1} style={{"marginRight":"10px"}} />
                              <div className="star-rating">
                                <div className="rating" style={{width: '20%'}} />
                              </div> <br/>
                              <input type="radio" id="star2" name="rating" onChange={(e)=>setrating(e.target.value)}  defaultValue={2} style={{"marginRight":"10px"}}  />
                              <div className="star-rating">
                                <div className="rating" style={{width: '40%'}} />
                              </div> <br/>
                              <input type="radio" id="star3" name="rating"onChange={(e)=>setrating(e.target.value)}   defaultValue={3} style={{"marginRight":"10px"}} />
                              <div className="star-rating">
                                <div className="rating" style={{width: '60%'}} />
                              </div> <br/>
                              <input type="radio" id="star4" name="rating" onChange={(e)=>setrating(e.target.value)}  defaultValue={4} style={{"marginRight":"10px"}}  />
                              <div className="star-rating">
                                <div className="rating" style={{width: '80%'}} />
                              </div> <br/>
                              <input type="radio" id="star5" name="rating" onChange={(e)=>setrating(e.target.value)}  defaultValue={5} style={{"marginRight":"10px"}}  />
                              <div className="star-rating">
                                <div className="rating" style={{width: '100%'}} />
                              </div> <br/>
                            </fieldset>
                          </div>
                          <div className="form-group mb-6">
                            <label htmlFor="exampleFormControlTextarea1">Review Content</label>
                            <textarea className="form-control placeholder-1"
                             id="exampleFormControlTextarea1" rows={6}
                              placeholder="Content" 
                              name="content" 
                              onChange={(e)=>setcontent(e.target.value)}
                              />
                          </div>
                          <button type="submit" className="btn btn-primary btn-block mw-md-300p">SUBMIT REVIEW</button>
                        </form>
                      </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    {/* SIDEBAR
                        ================================================== */}
                    <div className="rounded border p-2 shadow mb-6">
                        <div className="pt-5 pb-4 px-5 px-lg-3 px-xl-5">
                        <div className="d-flex align-items-center mb-2">
                            <ins className="h2 mb-0">${course.price}</ins>
                            <div className="badge badge-lg badge-purple text-white ms-auto fw-normal">91% Off</div>
                        </div>
                        <ul className="list-group list-group-flush mb-6">
                            <li className="list-group-item d-flex align-items-center py-3">
                            <div className="text-secondary d-flex">
                                {/* Icon */}
                                <svg width={15} height={15} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8102 9.52183C13.313 9.08501 12.7102 8.70758 12.0181 8.40008C11.7223 8.2687 11.3761 8.40191 11.2447 8.69762C11.1134 8.99334 11.2466 9.33952 11.5423 9.47102C12.1258 9.73034 12.6287 10.0436 13.0367 10.4021C13.5396 10.8441 13.8281 11.484 13.8281 12.1582V13.2422C13.8281 13.5653 13.5653 13.8281 13.2422 13.8281H1.75781C1.43475 13.8281 1.17188 13.5653 1.17188 13.2422V12.1582C1.17188 11.484 1.46038 10.8441 1.96335 10.4021C2.55535 9.88186 4.2802 8.67188 7.5 8.67188C9.89079 8.67188 11.8359 6.72672 11.8359 4.33594C11.8359 1.94515 9.89079 0 7.5 0C5.10921 0 3.16406 1.94515 3.16406 4.33594C3.16406 5.7336 3.82896 6.97872 4.85893 7.77214C2.97432 8.18642 1.80199 8.98384 1.18984 9.52183C0.433731 10.1862 0 11.147 0 12.1582V13.2422C0 14.2115 0.788498 15 1.75781 15H13.2422C14.2115 15 15 14.2115 15 13.2422V12.1582C15 11.147 14.5663 10.1862 13.8102 9.52183ZM4.33594 4.33594C4.33594 2.59129 5.75535 1.17188 7.5 1.17188C9.24465 1.17188 10.6641 2.59129 10.6641 4.33594C10.6641 6.08059 9.24465 7.5 7.5 7.5C5.75535 7.5 4.33594 6.08059 4.33594 4.33594Z" fill="currentColor" />
                                </svg>
                            </div>
                            <h6 className="mb-0 ms-3 me-auto">Capacity</h6>
                            <span>{course.capacity}</span>
                            </li>
                            <li className="list-group-item d-flex align-items-center py-3">
                            <div className="text-secondary d-flex">
                                {/* Icon */}
                                <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.625 7.34375H7.3423V4.13164C7.3423 2.715 8.53391 1.5625 9.99855 1.5625C11.4632 1.5625 12.6548 2.715 12.6548 4.13164V5.625H14.2173V4.13164C14.2173 1.85344 12.3248 0 9.99855 0C7.67234 0 5.7798 1.85344 5.7798 4.13164V7.34375H4.375C3.08266 7.34375 2.03125 8.39516 2.03125 9.6875V17.6562C2.03125 18.9486 3.08266 20 4.375 20H15.625C16.9173 20 17.9688 18.9486 17.9688 17.6562V9.6875C17.9688 8.39516 16.9173 7.34375 15.625 7.34375ZM16.4062 17.6562C16.4062 18.087 16.0558 18.4375 15.625 18.4375H4.375C3.94422 18.4375 3.59375 18.087 3.59375 17.6562V9.6875C3.59375 9.25672 3.94422 8.90625 4.375 8.90625H15.625C16.0558 8.90625 16.4062 9.25672 16.4062 9.6875V17.6562Z" fill="currentColor" />
                                <path d="M10 11.1719C9.20176 11.1719 8.55469 11.8189 8.55469 12.6172C8.55469 13.1269 8.81875 13.5746 9.2173 13.832V15.5469C9.2173 15.9783 9.56707 16.3281 9.99855 16.3281C10.43 16.3281 10.7798 15.9783 10.7798 15.5469V13.8338C11.18 13.5768 11.4453 13.1281 11.4453 12.6172C11.4453 11.8189 10.7982 11.1719 10 11.1719Z" fill="currentColor" />
                                </svg>
                            </div>
                            <h6 className="mb-0 ms-3 me-auto">duration</h6>
                            <span>{course.duration}</span>
                            </li>
                        </ul>
                        {(Object.keys(myEtat).length === 0 )? (
                            <button className="btn btn-primary btn-block mb-3" onClick={fetchUserFormationInsc}  type="button" name="button">BOOK NOW</button>
                                ) : (
                                    <button className="btn btn-orange btn-wide mb-4 mb-md-0 ms-md-3 flex-grow-1" onClick={handleDownloadCertificate} name="button">Download Certificate</button>
                                )}
                        
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <Footer/>
            </div>
        )}

export default FormationSingle 