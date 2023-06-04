import React, { useEffect ,useState} from "react";
import './CourseSingle.css'
import './styleAll.css'
import Footer from './Footer'
import NavBar from './NavBar'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CourseSingle = () => {
  const { idCourse } = useParams();
  const [course, setCourses] = useState([]);
  const [objectives, setobjectives] = useState([]);
  const [Comments, setComments] = useState([]);
  const [videos, setvideos] = useState([]);
  const [CoursesForUser, setCoursesForUser] = useState([]);
  const [content ,setcontent ]= useState('')
  const [rating ,setrating ]= useState('')
  const [course_id1 ,setcourse_id1 ]= useState('')
  const [compte_id1 ,setcompte_id1 ]= useState('')
  const [myEtat ,setmyEtat ]= useState('')
  const userInformation = JSON.parse(localStorage.getItem('user')); 
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    $('[data-fancybox]').fancybox();
  }, []);

  useEffect(() => {
      fetchUserCourses()
      setcourse_id1(idCourse)
      setcompte_id1(userInformation.id)
      fetchCoursesAcheterbyUser()
  }, [idCourse]);

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
          const response3 = await axios.get(`http://127.0.0.1:8000/api/objectCourses/${data.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
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
        try {
          const response2 = await axios.get(`http://127.0.0.1:8000/api/courses`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response2.status === 200) {
            const data2 = response2.data;
            const filtered2 = data2.filter((Allcourse) => Allcourse.compte_id == data.compte_id);
            setCoursesForUser(filtered2);
    
          } else {
            throw new Error('Failed to fetch user courses');
          }
        } catch (error) {
          console.error(error);
        }
        try {
          const response5 = await axios.get(`http://127.0.0.1:8000/api/CommentCourses/${data.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
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
  const RegisterComment = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('course_id', course_id1);
    formData.append('compte_id', compte_id1);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/registerComments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          Authorization: `Bearer ${token}`,
        }
      });
  
      const { message } = response.data;
  
      try {
        const response8 = await axios.get(`http://127.0.0.1:8000/api/CommentCoursesAvg/${idCourse}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response8.status === 200) {
          const data8 = response8.data;
          const rating = data8;
  
          try {
            await axios.put(`http://127.0.0.1:8000/api/updateRatCourse/${idCourse}`, { rating } , {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('Update success.'); // Handle success, e.g., show a success message or redirect to another page
            window.location.reload()
          } catch (error) {
            console.log('Update failed. Please try again.'); // Handle error, e.g., show an error message
          }
        } else {
          throw new Error('Failed to fetch user courses!!');
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };
  const fetchUserCoursesAcheter= async () => {
    const formData = new FormData();
        formData.append('course_id', 1);
        formData.append('compte_id', userInformation.id);
                try {
                    axios.post(`http://127.0.0.1:8000/api/CoursesAcheter`,formData,
                          {
                            headers: {
                                'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                                Authorization: `Bearer ${token}`,
                              }
                         })
                        .then(response => {
                            const { message } = response.data;
                            console.log(message);
                            window.location.reload();
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
  const fetchCoursesAcheterbyUser = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/CoursesAcheterbyUser/1/${userInformation.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {

        const data = response.data;
        setmyEtat(data);

      } else {
        throw new Error('Failed to fetch user courses');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
            <div>
                <NavBar/>
              {/* COURSE
          ================================================== */}
              <div className="bg-primary pb-9 pt-8 pt-md-11">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                      <h1 className="me-8 text-white">
                        {course.title}
                      </h1>
                      {/* COURSE META
                          ================================================== */}
                      <div className="d-md-flex align-items-center mb-6">
                        <div className="ms-md-6">
                          <div className="mb-2 d-flex align-items-center">
                            <h6 className="mb-0 text-white font-size-sm">Created by : </h6>
                            <a href="#" className="font-size-sm text-white ms-3">{course.user && course.user.firstname } {course.user && course.user.lastname }  </a>
                          </div>
                          <div className="mb-2 d-flex align-items-center">
                            <h6 className="mb-0 text-white font-size-sm">Categories : </h6>
                            <a href="#" className="font-size-sm text-white ms-3">{course.category && course.category.name}</a>
                          </div>
                          <div className="mb-2 d-flex align-items-center">
                            <h6 className="mb-0 text-white font-size-sm">Review : </h6>
                            <div className="d-flex align-items-center ms-3">
                              <div className="star-rating">
                                <div className="rating" style={{ width: `${ course.rating * 20}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex align-items-center py-3 text-white bg-transparent border-white-10">
                          <div className="text-white d-flex icon-uxs">
                            {/* Icon */}
                            <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.3164 4.20996C13.985 4.37028 13.8464 4.76904 14.0067 5.10026C14.4447 6.00505 14.6667 6.98031 14.6667 8C14.6667 11.6759 11.6759 14.6667 8 14.6667C4.32406 14.6667 1.33333 11.6759 1.33333 8C1.33333 4.32406 4.32406 1.33333 8 1.33333C9.52328 1.33333 10.9543 1.83073 12.1387 2.77165C12.4259 3.00098 12.846 2.95296 13.0754 2.66471C13.3047 2.37663 13.2567 1.95703 12.9683 1.72803C11.5661 0.613607 9.8016 0 8 0C3.58903 0 0 3.58903 0 8C0 12.411 3.58903 16 8 16C12.411 16 16 12.411 16 8C16 6.77767 15.7331 5.60628 15.2067 4.51969C15.0467 4.18766 14.6466 4.04932 14.3164 4.20996Z" fill="currentColor" />
                              <path d="M7.99967 2.66663C7.63167 2.66663 7.33301 2.96529 7.33301 3.33329V7.99996C7.33301 8.36796 7.63167 8.66663 7.99967 8.66663H11.333C11.701 8.66663 11.9997 8.36796 11.9997 7.99996C11.9997 7.63196 11.701 7.33329 11.333 7.33329H8.66634V3.33329C8.66634 2.96529 8.36768 2.66663 7.99967 2.66663Z" fill="currentColor" />
                            </svg>
                          </div>
                          <h6 className="mb-0 ms-3 me-auto text-white">Duration</h6>
                          <span>{course.duration}</span>
                        </li>
                        <li className="list-group-item d-flex align-items-center py-3 text-white bg-transparent border-white-10">
                          <div className="text-white d-flex icon-uxs">
                            {/* Icon */}
                            <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.7262 1.94825C13.4059 0.396725 10.401 0.315126 8.00002 1.73839C5.59897 0.315126 2.59406 0.396725 0.273859 1.94825C0.102729 2.06241 -3.54271e-05 2.25456 6.30651e-07 2.46027V14.6553C-0.000323889 14.8826 0.124616 15.0914 0.324917 15.1987C0.525109 15.3058 0.768066 15.294 0.9569 15.168C2.98471 13.8111 5.63063 13.8111 7.65844 15.168C7.66645 15.1735 7.67568 15.1747 7.68368 15.1796C7.69169 15.1846 7.7003 15.1932 7.70953 15.1987C7.73102 15.2079 7.75302 15.2159 7.77538 15.2227C7.79773 15.2329 7.82077 15.2415 7.84428 15.2486C7.87828 15.2564 7.91286 15.2616 7.94766 15.264C7.96551 15.264 7.98213 15.2714 7.99998 15.2714C8.00492 15.2714 8.00982 15.2714 8.01538 15.2714C8.03604 15.2699 8.05655 15.2672 8.07693 15.2634C8.10808 15.2602 8.13895 15.2547 8.16923 15.2467C8.19018 15.2399 8.21074 15.2319 8.23078 15.2227C8.24986 15.2147 8.27016 15.2104 8.28862 15.2006C8.29724 15.1956 8.30402 15.1883 8.31264 15.1827C8.32125 15.1772 8.3311 15.1753 8.33971 15.1698C10.3675 13.8129 13.0134 13.8129 15.0413 15.1698C15.3233 15.3595 15.7057 15.2846 15.8953 15.0026C15.9643 14.9 16.0008 14.779 16 14.6554V2.46027C16 2.25456 15.8973 2.06241 15.7262 1.94825ZM7.38462 13.6036C5.43516 12.6896 3.18022 12.6896 1.23076 13.6036V2.79993C3.12732 1.67313 5.48806 1.67313 7.38462 2.79993V13.6036ZM14.7692 13.6036C12.8198 12.6896 10.5648 12.6896 8.61538 13.6036V2.79993C10.5119 1.67313 12.8727 1.67313 14.7692 2.79993V13.6036Z" fill="currentColor" />
                            </svg>
                          </div>
                          <h6 className="mb-0 ms-3 me-auto text-white">Lectures</h6>
                          <span>{course.lessons}</span>
                        </li>
                        <li className="list-group-item d-flex align-items-center py-3 text-white bg-transparent border-white-10">
                          <div className="text-white d-flex icon-uxs">
                            {/* Icon */}
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.5936 3.78122H7.72003L6.56976 0.320872C6.50607 0.12928 6.32686 0 6.12495 0H1.40624C0.630839 0 0 0.630839 0 1.40624V10.8124C0 11.5878 0.630839 12.2187 1.40624 12.2187H6.57173L7.71263 15.6698C7.77566 15.8719 7.96259 16 8.1604 16C8.1615 16 8.16259 15.9999 8.16369 15.9999H14.5937C15.3691 15.9999 15.9999 15.369 15.9999 14.5936V5.18746C15.9999 4.41206 15.369 3.78122 14.5936 3.78122ZM1.40624 11.2812C1.14777 11.2812 0.937493 11.0709 0.937493 10.8124V1.40624C0.937493 1.14777 1.14777 0.937493 1.40624 0.937493H5.7868L9.22511 11.2812C7.46913 11.2812 3.14004 11.2812 1.40624 11.2812ZM9.14771 12.2187L8.22897 14.2449L7.55913 12.2187H9.14771ZM15.0624 14.5936C15.0624 14.8521 14.8521 15.0624 14.5936 15.0624H8.88768L10.3018 11.9435C10.3525 11.8316 10.3549 11.7077 10.3197 11.6018L8.03166 4.71871H14.5936C14.8521 4.71871 15.0624 4.92899 15.0624 5.18746V14.5936Z" fill="currentColor" />
                              <path d="M6.12497 5.65623H4.71873C4.45986 5.65623 4.24998 5.8661 4.24998 6.12497C4.24998 6.38385 4.45986 6.59372 4.71873 6.59372H5.5756C5.3821 7.13931 4.86107 7.53121 4.24998 7.53121C3.47458 7.53121 2.84374 6.90037 2.84374 6.12497C2.84374 5.34958 3.47458 4.71874 4.24998 4.71874C4.6256 4.71874 4.97873 4.86502 5.24435 5.13061C5.42738 5.31367 5.72419 5.31367 5.90725 5.13061C6.09028 4.94755 6.09028 4.65077 5.90725 4.46771C5.46457 4.02503 4.87601 3.78125 4.24998 3.78125C2.95765 3.78125 1.90625 4.83264 1.90625 6.12497C1.90625 7.4173 2.95765 8.4687 4.24998 8.4687C5.54232 8.4687 6.59371 7.4173 6.59371 6.12497C6.59371 5.8661 6.38384 5.65623 6.12497 5.65623Z" fill="currentColor" />
                              <path d="M13.625 7.53124H12.2187V7.0625C12.2187 6.80362 12.0089 6.59375 11.75 6.59375C11.4911 6.59375 11.2812 6.80362 11.2812 7.0625V7.53124H9.875C9.61612 7.53124 9.40625 7.74112 9.40625 7.99999C9.40625 8.25886 9.61612 8.46874 9.875 8.46874H12.5981C12.449 8.91201 12.1287 9.43735 11.7563 9.94291C11.6761 9.8346 11.5968 9.72376 11.5204 9.61138C11.3748 9.39729 11.0833 9.34176 10.8692 9.48735C10.6551 9.63291 10.5997 9.92447 10.7452 10.1386C10.8767 10.332 11.0146 10.5202 11.152 10.6985C10.9177 10.9702 10.6868 11.2163 10.4842 11.4154C10.2994 11.5967 10.2966 11.8935 10.4779 12.0783C10.6585 12.2623 10.9552 12.2666 11.1408 12.0846C11.157 12.0687 11.4126 11.8169 11.7541 11.4303C12.0873 11.8115 12.3367 12.0621 12.356 12.0814C12.539 12.2644 12.8357 12.2645 13.0188 12.0815C13.2019 11.8985 13.202 11.6017 13.019 11.4186C13.0141 11.4137 12.7271 11.1251 12.3609 10.698C13.0245 9.84029 13.429 9.09314 13.5691 8.46874H13.6249C13.8838 8.46874 14.0937 8.25886 14.0937 7.99999C14.0937 7.74112 13.8839 7.53124 13.625 7.53124Z" fill="currentColor" />
                            </svg>
                          </div>
                          <h6 className="mb-0 ms-3 me-auto text-white">Language</h6>
                          <span>{course.language}</span>
                        </li>
                        <li className="list-group-item d-flex align-items-center py-3 text-white bg-transparent border-white-10">
                          <div className="text-white d-flex icon-uxs">
                            {/* Icon */}
                            <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.7188 9.8575V3.1875C15.7188 2.41209 15.0879 1.78125 14.3125 1.78125H12.4688V1.25C12.4688 0.991125 12.2589 0.78125 12 0.78125C11.7411 0.78125 11.5312 0.991125 11.5312 1.25V1.78125H8.46875V1.25C8.46875 0.991125 8.25887 0.78125 8 0.78125C7.74113 0.78125 7.53125 0.991125 7.53125 1.25V1.78125H4.46875V1.25C4.46875 0.991125 4.25887 0.78125 4 0.78125C3.74113 0.78125 3.53125 0.991125 3.53125 1.25V1.78125H1.40625C0.630844 1.78125 0 2.41209 0 3.1875V11.8125C0 12.5879 0.630844 13.2188 1.40625 13.2188H8.68531C9.35484 14.4112 10.6317 15.2188 12.0938 15.2188C14.2477 15.2188 16 13.4664 16 11.3125C16 10.7985 15.9 10.3074 15.7188 9.8575ZM12.5625 8.38087C13.8248 8.58197 14.8243 9.58144 15.0254 10.8438H12.5625V8.38087ZM1.40625 12.2812C1.14778 12.2812 0.9375 12.071 0.9375 11.8125V3.1875C0.9375 2.92903 1.14778 2.71875 1.40625 2.71875H3.53125V3.28125C3.53125 3.54012 3.74113 3.75 4 3.75C4.25887 3.75 4.46875 3.54012 4.46875 3.28125V2.71875H7.53125V3.28125C7.53125 3.54012 7.74113 3.75 8 3.75C8.25887 3.75 8.46875 3.54012 8.46875 3.28125V2.71875H11.5312V3.28125C11.5312 3.54012 11.7411 3.75 12 3.75C12.2589 3.75 12.4688 3.54012 12.4688 3.28125V2.71875H14.3125C14.571 2.71875 14.7812 2.92903 14.7812 3.1875V8.48034C14.0805 7.81506 13.134 7.40625 12.0938 7.40625C9.93984 7.40625 8.1875 9.15859 8.1875 11.3125C8.1875 11.6468 8.22978 11.9713 8.30916 12.2812H1.40625ZM12.0938 14.2812C10.4568 14.2812 9.125 12.9495 9.125 11.3125C9.125 9.83503 10.21 8.60631 11.625 8.38087V11.3125C11.625 11.5714 11.8349 11.7812 12.0938 11.7812H15.0254C14.7999 13.1962 13.5712 14.2812 12.0938 14.2812Z" fill="currentColor" />
                              <path d="M3.25 5.78125H2.5C2.24112 5.78125 2.03125 5.99112 2.03125 6.25C2.03125 6.50888 2.24112 6.71875 2.5 6.71875H3.25C3.50888 6.71875 3.71875 6.50888 3.71875 6.25C3.71875 5.99112 3.50888 5.78125 3.25 5.78125Z" fill="currentColor" />
                              <path d="M6 5.78125H5.25C4.99112 5.78125 4.78125 5.99112 4.78125 6.25C4.78125 6.50888 4.99112 6.71875 5.25 6.71875H6C6.25888 6.71875 6.46875 6.50888 6.46875 6.25C6.46875 5.99112 6.25888 5.78125 6 5.78125Z" fill="currentColor" />
                              <path d="M6 7.78125H5.25C4.99112 7.78125 4.78125 7.99112 4.78125 8.25C4.78125 8.50888 4.99112 8.71875 5.25 8.71875H6C6.25888 8.71875 6.46875 8.50888 6.46875 8.25C6.46875 7.99112 6.25888 7.78125 6 7.78125Z" fill="currentColor" />
                              <path d="M3.25 7.78125H2.5C2.24112 7.78125 2.03125 7.99112 2.03125 8.25C2.03125 8.50888 2.24112 8.71875 2.5 8.71875H3.25C3.50888 8.71875 3.71875 8.50888 3.71875 8.25C3.71875 7.99112 3.50888 7.78125 3.25 7.78125Z" fill="currentColor" />
                              <path d="M3.25 9.78125H2.5C2.24112 9.78125 2.03125 9.99112 2.03125 10.25C2.03125 10.5089 2.24112 10.7188 2.5 10.7188H3.25C3.50888 10.7188 3.71875 10.5089 3.71875 10.25C3.71875 9.99112 3.50888 9.78125 3.25 9.78125Z" fill="currentColor" />
                              <path d="M6 9.78125H5.25C4.99112 9.78125 4.78125 9.99112 4.78125 10.25C4.78125 10.5089 4.99112 10.7188 5.25 10.7188H6C6.25888 10.7188 6.46875 10.5089 6.46875 10.25C6.46875 9.99112 6.25888 9.78125 6 9.78125Z" fill="currentColor" />
                            </svg>
                          </div>
                          <h6 className="mb-0 ms-3 me-auto text-white">Deadline</h6>
                          <span>{new Date(course.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </li>
                        <li className="list-group-item d-flex align-items-center py-3 text-white bg-transparent border-white-10">
                          <div className="text-white d-flex icon-uxs">
                            {/* Icon */}
                            <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.5465 5.13024L15.2322 4.02945L14.9329 2.34131C14.8335 1.78023 14.348 1.37335 13.7783 1.37335C13.778 1.37335 13.7775 1.37335 13.7772 1.37335L12.0628 1.37488L10.7485 0.274205C10.3114 -0.0919028 9.67738 -0.0913556 9.24091 0.275574L7.92861 1.37875L6.2142 1.38035C5.64405 1.3809 5.15872 1.78887 5.06026 2.35042L4.76408 4.03907L3.45178 5.14228C3.01535 5.50917 2.90582 6.13362 3.19137 6.62712L4.04992 8.1111L3.75378 9.79967C3.65524 10.3613 3.97276 10.91 4.50875 11.1046L5.9543 11.6292L5.95989 18.8268C5.95989 19.2647 6.20095 19.6629 6.58899 19.8659C6.76059 19.9556 6.94712 20 7.13295 20C7.36737 20 7.60062 19.9294 7.8013 19.7901L9.9861 18.2734L12.1709 19.7901C12.5306 20.0398 12.9951 20.0689 13.3832 19.8659C13.7712 19.6629 14.0123 19.2647 14.0123 18.8268V11.6377L15.5005 11.0945C16.0361 10.899 16.3526 10.3496 16.2531 9.78825L15.9538 8.10015L16.8096 6.61461C17.0943 6.12056 16.9836 5.49631 16.5465 5.13024ZM10.3205 17.078C10.1194 16.9385 9.85281 16.9385 9.65178 17.078L7.13264 18.8265C7.13264 18.8264 7.13264 18.8263 7.13264 18.8263L7.12842 13.3771C7.35154 13.6218 7.66652 13.7592 7.99315 13.7592C8.12738 13.7592 8.26357 13.7361 8.39608 13.6877L10.0065 13.0999L11.6181 13.6848C12.0517 13.842 12.5242 13.7298 12.8396 13.4196L12.8395 18.8266L10.3205 17.078ZM14.9377 7.51475C14.8003 7.75327 14.7511 8.03382 14.7992 8.30482L15.0984 9.99292L13.4878 10.5808C13.286 10.6545 13.1095 10.783 12.9761 10.949C12.9697 10.9566 12.9639 10.9647 12.9579 10.9727C12.9277 11.0123 12.899 11.0533 12.8739 11.0969L12.0185 12.5825C12.0185 12.5825 12.0183 12.5825 12.0181 12.5824L10.4065 11.9976C10.1478 11.9037 9.86297 11.9039 9.6044 11.9983L7.99393 12.5861L7.13538 11.1022C7.08925 11.0224 7.03339 10.9496 6.97073 10.8835C6.96507 10.8774 6.95975 10.871 6.95381 10.8652C6.83236 10.7425 6.68464 10.6468 6.52039 10.5871L4.90882 10.0022L5.205 8.31358C5.2525 8.04245 5.20277 7.76199 5.06495 7.52378L4.20639 6.03984L5.51869 4.93663C5.72942 4.75952 5.87163 4.51263 5.91912 4.24159L6.2153 2.55298L7.92963 2.55138C8.20489 2.55114 8.47254 2.45346 8.68319 2.27635L9.99549 1.17318L11.3098 2.27389C11.5205 2.45041 11.7879 2.54759 12.0629 2.54759H12.0638L13.7783 2.54602L14.0775 4.23416C14.1255 4.50517 14.2682 4.75166 14.4792 4.92842L15.7935 6.02921L14.9377 7.51475Z" fill="currentColor" />
                              <path d="M9.99928 3.64673C8.13493 3.64673 6.61816 5.1635 6.61816 7.02785C6.61816 8.89221 8.13493 10.409 9.99928 10.409C11.8636 10.409 13.3804 8.89221 13.3804 7.02785C13.3804 5.1635 11.8636 3.64673 9.99928 3.64673ZM9.99928 9.23631C8.78154 9.23631 7.79083 8.2456 7.79083 7.02785C7.79083 5.81011 8.78154 4.8194 9.99928 4.8194C11.217 4.8194 12.2078 5.81011 12.2078 7.02785C12.2078 8.2456 11.217 9.23631 9.99928 9.23631Z" fill="currentColor" />
                            </svg>
                          </div>
                          <h6 className="mb-0 ms-3 me-auto text-white">Certificate</h6>
                          <span>{course.certificate}</span>
                        </li>

                      </ul>
                    </div>
                    <div className="col-lg-6">
                    <a
       href={course.linkIntro}
       className="d-block sk-thumbnail rounded mb-5"
       data-fancybox
      >
          <div className="h-60p w-60p rounded-circle bg-white size-20-all d-inline-flex align-items-center justify-content-center position-absolute center z-index-1">
                        {/* Icon */}
                        <svg width={14} height={16} viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.8704 6.15374L3.42038 0.328572C2.73669 -0.0923355 1.9101 -0.109836 1.20919 0.281759C0.508282 0.673291 0.0898438 1.38645 0.0898438 2.18929V13.7866C0.0898438 15.0005 1.06797 15.9934 2.27016 16C2.27344 16 2.27672 16 2.27994 16C2.65563 16 3.04713 15.8822 3.41279 15.6591C3.70694 15.4796 3.79991 15.0957 3.62044 14.8016C3.44098 14.5074 3.05697 14.4144 2.76291 14.5939C2.59188 14.6982 2.42485 14.7522 2.27688 14.7522C1.82328 14.7497 1.33763 14.3611 1.33763 13.7866V2.18933C1.33763 1.84492 1.51713 1.53907 1.81775 1.3711C2.11841 1.20314 2.47294 1.21064 2.76585 1.39098L12.2159 7.21615C12.4999 7.39102 12.6625 7.68262 12.6618 8.01618C12.6611 8.34971 12.4974 8.64065 12.2118 8.81493L5.37935 12.9983C5.08548 13.1783 4.9931 13.5623 5.17304 13.8562C5.35295 14.1501 5.73704 14.2424 6.03092 14.0625L12.8625 9.87962C13.5166 9.48059 13.9081 8.78496 13.9096 8.01868C13.9112 7.25249 13.5226 6.55524 12.8704 6.15374Z" fill="currentColor" />
                          </svg>
                      </div>
                      <img className="rounded shadow-light-lg" src={`http://127.0.0.1:8000/images/${course.image}`} alt="..." />
      </a>
          <div className="d-flex align-items-center mb-2"> 
                        <ins className="h2 mb-0 text-white">${course.price}</ins>
                      </div>
                      <div className="d-md-flex">
                    {Object.keys(myEtat).length === 0 ? (
                        <button className="btn btn-blue btn-wide mb-4 mb-md-0 me-md-3 flex-grow-1" onClick={fetchUserCoursesAcheter} type="button" name="button">BUY NOW</button>
                    ) : (
                        <Link to={`/Espace_User/WatchCourse/${course.id}`}>
                        <button className="btn btn-orange btn-wide mb-4 mb-md-0 ms-md-3 flex-grow-1" type="button" name="button">Watch Now</button>
                        </Link>
                    )}
                    </div>     
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row pt-8">
                  <div className="col-lg-8 mb-6 mb-lg-">
                    <div className="mb-8">
                      <h3 className>Course Description</h3>
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
                    </div>
                    <div className="mb-8">
                      <h3 className="mb-5">Curriculum</h3>
                      <div id="accordionCurriculum">
                        <div className="border rounded shadow mb-6 overflow-hidden">
                          <div className="d-flex align-items-center" id="curriculumheadingOne">
                            <h5 className="mb-0 w-100">
                              <button className="d-flex align-items-center p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#CurriculumcollapseOne" aria-expanded="true" aria-controls="CurriculumcollapseOne">
                                <span className="me-4 text-dark d-flex">
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
                            { videos.map((video) =>(
                            <div  key={video.id} className="border-top px-5 py-4 min-height-70 d-md-flex align-items-center">
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
                                <div className="badge btn-blue-soft me-5 font-size-sm fw-normal py-2">{video.duration}</div>
                                <a href="#" className="text-secondary d-flex">
                                  {/* Icon */}
                                  <svg width={14} height={16} viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8704 6.15374L3.42038 0.328572C2.73669 -0.0923355 1.9101 -0.109836 1.20919 0.281759C0.508282 0.673291 0.0898438 1.38645 0.0898438 2.18929V13.7866C0.0898438 15.0005 1.06797 15.9934 2.27016 16C2.27344 16 2.27672 16 2.27994 16C2.65563 16 3.04713 15.8822 3.41279 15.6591C3.70694 15.4796 3.79991 15.0957 3.62044 14.8016C3.44098 14.5074 3.05697 14.4144 2.76291 14.5939C2.59188 14.6982 2.42485 14.7522 2.27688 14.7522C1.82328 14.7497 1.33763 14.3611 1.33763 13.7866V2.18933C1.33763 1.84492 1.51713 1.53907 1.81775 1.3711C2.11841 1.20314 2.47294 1.21064 2.76585 1.39098L12.2159 7.21615C12.4999 7.39102 12.6625 7.68262 12.6618 8.01618C12.6611 8.34971 12.4974 8.64065 12.2118 8.81493L5.37935 12.9983C5.08548 13.1783 4.9931 13.5623 5.17304 13.8562C5.35295 14.1501 5.73704 14.2424 6.03092 14.0625L12.8625 9.87962C13.5166 9.48059 13.9081 8.78496 13.9096 8.01868C13.9112 7.25249 13.5226 6.55524 12.8704 6.15374Z" fill="currentColor" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                            )) }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-8">
                      <h3 className="mb-6">About the instructor</h3>
                      <div className="d-flex align-items-center mb-6">
                        <div className="d-inline-block rounded-circle border me-6 p-2">
                          <div className="avatar avatar-size-120">
                            <img src={`http://127.0.0.1:8000/images/${course.user && course.user.image }`} alt="..." className="avatar-img rounded-circle" />
                          </div>
                        </div>
                        <div className="media-body">
                          <h4 className="mb-0">{course.user && course.user.firstname } {course.user && course.user.lastname }</h4>
                          <span>{course.user && course.user.about }</span>
                        </div>
                      </div>
                      <div className="row mx-xl-n5 mb-6">
                        <div className="col-12 col-md-auto mb-3 mb-md-0 px-xl-5">
                          <div className="d-flex align-items-center">
                            <div className="me-3 d-flex text-secondary icon-uxs">
                              {/* Icon */}
                              <svg width={14} height={16} viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.8704 6.15374L3.42038 0.328572C2.73669 -0.0923355 1.9101 -0.109836 1.20919 0.281759C0.508282 0.673291 0.0898438 1.38645 0.0898438 2.18929V13.7866C0.0898438 15.0005 1.06797 15.9934 2.27016 16C2.27344 16 2.27672 16 2.27994 16C2.65563 16 3.04713 15.8822 3.41279 15.6591C3.70694 15.4796 3.79991 15.0957 3.62044 14.8016C3.44098 14.5074 3.05697 14.4144 2.76291 14.5939C2.59188 14.6982 2.42485 14.7522 2.27688 14.7522C1.82328 14.7497 1.33763 14.3611 1.33763 13.7866V2.18933C1.33763 1.84492 1.51713 1.53907 1.81775 1.3711C2.11841 1.20314 2.47294 1.21064 2.76585 1.39098L12.2159 7.21615C12.4999 7.39102 12.6625 7.68262 12.6618 8.01618C12.6611 8.34971 12.4974 8.64065 12.2118 8.81493L5.37935 12.9983C5.08548 13.1783 4.9931 13.5623 5.17304 13.8562C5.35295 14.1501 5.73704 14.2424 6.03092 14.0625L12.8625 9.87962C13.5166 9.48059 13.9081 8.78496 13.9096 8.01868C13.9112 7.25249 13.5226 6.55524 12.8704 6.15374Z" fill="currentColor" />
                              </svg>
                            </div>
                            {(() => {
                              const filteredCourses = CoursesForUser.filter(Excourse => Excourse.compte_id === course.compte_id);
                              const count = filteredCourses.length;
                              return `${count} courses`;
                            })()}
                          </div>
                        </div>
                      </div>
                      <p className="mb-6 line-height-md">{course.user && course.user.description }</p>
                    </div>
                    <div className="mb-8">
                      <h3 className="mb-6">Student feedback</h3>
                      <div className="row align-items-center mb-8">
                        <div className="col-md-auto mb-5 mb-md-0">
                          <div className="border rounded shadow d-flex align-items-center justify-content-center px-9 py-8">
                            <div className="m-2 text-center">
                              <h1 className="display-2 mb-0 fw-medium mb-n1" style={{"marginLeft":"-50px"}}>{course.rating}</h1>
                              <h5 className="mb-0">Course rating</h5>
                              <div className="star-rating">
                                <div className="rating" style={{ width: `${ course.rating * 20}%` }}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="list-unstyled pt-2">
                        { Comments.slice(0, 8).map((comment)=>(
                            <li key={comment.id} className="media d-flex">
                            <div className="avatar avatar-xxl me-3 me-md-6 flex-shrink-0">
                              <img src = {`http://127.0.0.1:8000/images/${comment.user && comment.user.image }`} alt="..." className="avatar-img rounded-circle" />
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
                    {/* SIDEBAR FILTER
                      ================================================== */}
                    <div className="d-block">
                      <div className="border rounded px-6 px-lg-5 px-xl-6 pt-5 shadow">
                        <h3 className="mb-5">Latest Courses</h3>
                        <ul className="list-unstyled mb-0">
                          {CoursesForUser.slice(0, 5).sort((a, b) => new Date(b.date) - new Date(a.date)).map( (course) => (
                          <li key={course.id} className="media mb-6 d-flex">
                            <Link to={`/Espace_User/CourseSingle/${course.id}`} className="w-100p d-block me-5">
                              <img  src={`http://127.0.0.1:8000/images/${course.image}`} alt="..." className="avatar-img rounded-lg h-90p w-100p" />
                            </Link>
                            <div className="media-body flex-grow-1">
                              <Link to={`/Espace_User/CourseSingle/${course.id}`} className="d-block">
                                <h6 className="line-clamp-2 mb-3">{course.title}</h6>
                              </Link>
                              <span className="me-2">{course.category.name}</span>
                              <ins className="h6 mb-0 ">${course.price}</ins>
                            </div>
                          </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer/>
            </div>

        )
  }
export default CourseSingle 