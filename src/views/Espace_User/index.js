import React, { useState,useEffect }  from 'react'
import './index.css'
import './styleAll.css'
import Flickity from 'react-flickity-component'
import VisibilitySensor from 'react-visibility-sensor';
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from 'react-countup';
import "flickity/css/flickity.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import useAuth from '../../function/useAuth';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Index = () => { 
  const navigate = useNavigate();
  const checkTokenAndRedirect = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login page if token is not found
    }
  };
    
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const userInformation = JSON.parse(localStorage.getItem('user')); 
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    tele: '',
    date: '',
    adresse: '',
    sexe: '',
    password: ''
  });
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrc1, setImageSrc1] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImageSrc(URL.createObjectURL(file));
  };

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCourse = (course) => {
    const filteredCourses = courses.find(elemntCourse => elemntCourse.title === course);
    if(filteredCourses)
      {setSelectedCourseId(filteredCourses.id);}
  };

  const MyfilteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
  );

  const handleButtonClick = () => {
    if (selectedCourseId) {
      // Perform any necessary processing with the selected course ID
      // For example, you can pass the selected course ID to another component using state or URL parameters
      // Then navigate to the desired component
      navigate(`/Espace_User/CourseSingle/${selectedCourseId}`);
    }
  };

    useEffect(() => {
        AOS.init({
        });
        checkTokenAndRedirect();
      }, []);
      const flickityOptions = {
        initialIndex: 2
    }
    
    useEffect(() => {
      fetchUserData();
      // Fetch the courses from the API
      axios.get('http://127.0.0.1:8000/api/courses' , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setCourses(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      axios.get('http://127.0.0.1:8000/api/categories' , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, []);
    const handleCategoryChange = (categoryId) => {
      setSelectedCategoryId(categoryId);
    };
    const filteredCourses = selectedCategoryId
      ? courses.filter(course => course.category_id == selectedCategoryId)
      : courses;
    React.useEffect(() => {
      $('[data-fancybox]').fancybox();
    }, []);
    const handleLogout = async () => {
      
      axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(response => {
          // Handle success, e.g., clear user data, redirect to login page
          console.log(response.data.message);
          // Clear the token from local storage or cookie
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
          // Redirect to the login page or perform any necessary actions
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    };
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/' + userInformation.id , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        const user = response.data;
        setUserData(user);
        setImageSrc(`http://127.0.0.1:8000/images/${user.image}`);

      } catch (error) {
        console.log(error);
      }
    };
    const handleInputChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const data = {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          tele: userData.tele,
          date: userData.date,
          adresse: userData.adresse,
          sexe: userData.sexe,
          password: userData.password,
        };
    
        if (selectedFile instanceof File || selectedFile instanceof Blob) {
          const reader = new FileReader();
          reader.onload = async () => {
            const fileData = reader.result;
            data.image = fileData;
            updateUser(data);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          updateUser(data);
        }
      } catch (error) {
        console.log(error);
        // Optionally show an error message or perform other actions
      }
    };
    
    const updateUser = async (data) => {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/user/${userInformation.id}`, data , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedUser = response.data;
        setUserData(updatedUser);
        console.log(updatedUser);
        window.location.reload();
        // Optionally show a success message or perform other actions
      } catch (error) {
        console.log(error);
        // Optionally show an error message or perform other actions
      }
    };
    
    
    
  return (
      <div>
        {/* MODALS
    ================================================== */}
        <div className="modal modal-sidebar left" style={{"paddingRight": "0px"}} id="accountModal">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Signin */}
              <div className="collapse show" id="collapseSignin" data-bs-parent="#accountModal">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier Now Your Account!</h5>
                  <button type="button" className="close text-primary" data-bs-dismiss="modal" aria-label="Close">
                    {/* Icon */}
                    <svg width={16} height={17} viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.142135 2.00015L1.55635 0.585938L15.6985 14.7281L14.2843 16.1423L0.142135 2.00015Z" fill="currentColor" />
                      <path d="M14.1421 1.0001L15.5563 2.41431L1.41421 16.5564L0 15.1422L14.1421 1.0001Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Form Signin */}
                  <form className="mb-5" onSubmit={handleSubmit}  encType="multipart/form-data">
                  <div className="profile-pic">
      <label className="-label" htmlFor="file">
        <span className="glyphicon glyphicon-camera"></span>
        <span>Change Image</span>
      </label>
      <input id="file" name="image" type="file" onChange={handleFileChange} />
      <img src={imageSrc} id="output" width="200" />
    </div>
      <div style={{ width: "400px", float: "left" }}>
        <div className="form-group mb-5">
          <label htmlFor="modalSigninEmail">
            Firstname
          </label>
          <input
            type="text"
            className="form-control"
            id="modalSigninEmail"
            name="firstname"
            value={userData.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-5">
          <label htmlFor="modalSigninEmail2">
            Lastname
          </label>
          <input
            type="text"
            className="form-control"
            id="modalSigninEmail2"
            name="lastname"
            value={userData.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-5">
          <label htmlFor="modalSigninEmail3">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="modalSigninEmail3"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-5">
          <label htmlFor="modalSigninEmail4">
            Telephone
          </label>
          <input
            type="text"
            className="form-control"
            id="modalSigninEmail4"
            name="tele"
            value={userData.tele}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div style={{ width: "400px", float: "right" }}>
        <div className="form-group mb-5">
          <label htmlFor="modalSigninEmail5">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="modalSigninEmail5"
            name="date"
            value={userData.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-5">
          <label htmlFor="modalSigninEmail6">
            Adresse
          </label>
          <input
            type="text"
            className="form-control"
            id="modalSigninEmail6"
            name="adresse"
            value={userData.adresse}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-5">
          <label htmlFor="modalSigninEmail7">
            Sexe
          </label>
          <div style={{ padding: "1rem 1.25rem", lineHeight: "1.80" }}>
            Masculine: <input
              type="radio"
              style={{ marginRight: "40px" }}
              name="sexe"
              value="Masculin"
              checked={userData.sexe === "Masculin"}
              onChange={handleInputChange}
            />
            Feminine: <input
              type="radio"
              name="sexe"
              value="Feminine"
              checked={userData.sexe === "Feminine"}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Password */}
        <div className="form-group mb-5">
          <label htmlFor="modalSigninPassword">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="modalSigninPassword"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Submit */}
      <button className="btn btn-block btn-primary" type="submit">
        Modifier
      </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>  
        {/* NAVBAR Top valider XXXXXXXXXXXXXXXXXXXX
      ================================================== */}
        <div className="container d-none d-xl-block">
          <div className="d-flex align-items-center border-bottom border-white-20 pt-2 pb-4">
            <ul className="nav mx-n3">
              <li className="nav-item px-3">
                <span className="font-size-sm text-white">+2126 53 47 92 80</span>
              </li>
              <li className="nav-item px-3">
                <span className="font-size-sm text-white">abdelghafourlahnida@gmail.com</span>
              </li>
            </ul>
            <ul className="nav ms-auto font-size-sm">
              <li className="nav-item px-3">
                <a href="#" className="nav-link p-0 text-white">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item px-3">
                <a href="#" className="nav-link p-0 text-white">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="nav-item px-3">
                <a href="#" className="nav-link p-0 text-white">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li className="nav-item px-3">
                <a href="#" className="nav-link p-0 text-white">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <header className="navbar navbar-expand-xl navbar-dark">
          <div className="container containerNew">

            {/* Vertical Menu */}
            <ul className="navbar-nav navbar-vertical ms-xl-4 d-none d-xl-flex">
              <li className="nav-item dropdown">
                <a className="nav-link pb-4 mb-n4 px-0 pt-0" id="navbarVerticalMenu" data-bs-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">
                  <div className="bg-white-10 rounded-xl py-3 px-5 d-flex align-items-center">
                    <span className="text-white fw-medium me-1">Courses</span>
                    <div className="ms-3 text-white">
                      {/* Icon */}
                      <svg width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.84016 0.540385L9.5126 0.210545C9.40951 0.107536 9.27235 0.0507876 9.12577 0.0507876C8.97926 0.0507876 8.84194 0.107536 8.73885 0.210545L5.00224 3.94732L1.26131 0.206399C1.15838 0.10339 1.02107 0.0467224 0.87456 0.0467224C0.728055 0.0467224 0.590655 0.10339 0.487646 0.206399L0.160001 0.534206C-0.0533338 0.747379 -0.0533338 1.09462 0.160001 1.30779L4.61402 5.77783C4.71695 5.88075 4.8541 5.95327 5.00191 5.95327H5.00362C5.1502 5.95327 5.28736 5.88067 5.39029 5.77783L9.84016 1.3199C9.94325 1.21698 9.99984 1.07567 10 0.929169C10 0.782582 9.94325 0.643231 9.84016 0.540385Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-md bg-white rounded py-4 mt-4" aria-labelledby="navbarVerticalMenu">
                <li className="dropdown-item dropright">
                      <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Design")}`} className="dropdown-link dropdown-toggle">
                      <div className="me-4 d-flex text-primary icon-xs">
                        {/* Icon */}
                        <svg width={20} height={21} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.5247 5.64759C10.3104 5.21736 9.6919 5.21322 9.47557 5.64759L5.37401 13.8898C5.28096 14.0767 5.29443 14.299 5.4094 14.4734L7.65635 17.8813V20.0493C7.65635 20.3729 7.91869 20.6352 8.24229 20.6352H11.7579C12.0815 20.6352 12.3439 20.3729 12.3439 20.0493V17.8813L14.5908 14.4734C14.7058 14.299 14.7192 14.0767 14.6262 13.8898L10.5247 5.64759ZM11.172 19.4633H8.82822V18.2915H11.172V19.4633ZM11.4424 17.1196H8.55779L6.57342 14.1099L9.41416 8.40131V14.1508C9.41416 14.4744 9.67651 14.7368 10.0001 14.7368C10.3237 14.7368 10.586 14.4744 10.586 14.1508V8.40131L13.4268 14.1099L11.4424 17.1196Z" fill="currentColor" fillOpacity="0.6" />
                          <path d="M18.2422 0.635132C17.4783 0.635132 16.827 1.12501 16.5852 1.80701H11.7578V1.22107C11.7578 0.897476 11.4955 0.635132 11.1719 0.635132H8.82812C8.50453 0.635132 8.24219 0.897476 8.24219 1.22107V1.80701H3.41484C3.17297 1.12501 2.52168 0.635132 1.75781 0.635132C0.788555 0.635132 0 1.42369 0 2.39294C0 3.3622 0.788555 4.15076 1.75781 4.15076C2.52168 4.15076 3.17297 3.66048 3.41484 2.97849H5.60676C2.87645 4.5465 1.17188 7.44322 1.17188 10.5961C1.17188 10.9197 1.43422 11.182 1.75781 11.182C2.08141 11.182 2.34375 10.9197 2.34375 10.5961C2.34375 7.06076 4.8359 3.98591 8.24219 3.18271V3.56482C8.24219 3.88841 8.50453 4.15076 8.82812 4.15076H11.1719C11.4955 4.15076 11.7578 3.88841 11.7578 3.56482V3.18267C15.1641 3.98591 17.6562 7.06076 17.6562 10.5961C17.6562 10.9197 17.9186 11.182 18.2422 11.182C18.5658 11.182 18.8281 10.9197 18.8281 10.5961C18.8281 7.44724 17.127 4.54884 14.3932 2.97888H16.5852C16.827 3.66087 17.4783 4.15076 18.2422 4.15076C19.2114 4.15076 20 3.3622 20 2.39294C20 1.42369 19.2114 0.635132 18.2422 0.635132ZM1.75781 2.97888C1.43473 2.97888 1.17188 2.71603 1.17188 2.39294C1.17188 2.06986 1.43473 1.80701 1.75781 1.80701C2.0809 1.80701 2.34375 2.06986 2.34375 2.39294C2.34375 2.71603 2.0809 2.97888 1.75781 2.97888ZM10.5859 2.97888H9.41406V1.80701H10.5859V2.97888ZM18.2422 2.97888C17.9191 2.97888 17.6562 2.71603 17.6562 2.39294C17.6562 2.06986 17.9191 1.80701 18.2422 1.80701C18.5653 1.80701 18.8281 2.06986 18.8281 2.39294C18.8281 2.71603 18.5653 2.97888 18.2422 2.97888Z" fill="currentColor" />
                        </svg>
                      </div>
                      Design
                    </Link>
                  </li>
                  <li className="dropdown-item dropright">
                    <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Business")}`} className="dropdown-link dropdown-toggle">
                      <div className="me-4 d-flex text-primary icon-xs">
                        {/* Icon */}
                        <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.6062 4.12238C17.6014 4.12723 17.5965 4.12723 17.5917 4.12723H13.8383V3.02017C13.8383 1.94709 12.9497 1.06824 11.8767 1.06824H7.86113C6.78806 1.07309 5.91891 1.94709 5.92377 3.02017V4.12723H2.41321C1.08279 4.12723 0 5.20031 0 6.53073C0 6.53558 0 6.54044 0 6.54529V8.56035C0 9.39065 0.388444 10.1481 1.06822 10.59V16.4943C1.07308 17.8393 2.16072 18.9269 3.50571 18.9318H16.4943C17.8393 18.9269 18.9269 17.8393 18.9318 16.4943V10.59C19.6116 10.1481 20 9.38579 20 8.56035V6.54529C20.0049 5.21487 18.9318 4.13209 17.6062 4.12238ZM6.89488 3.02017C6.89002 2.4812 7.32217 2.0442 7.86113 2.03935H11.8767C12.4205 2.0442 12.8623 2.47635 12.8672 3.02017V4.12723H6.89488V3.02017ZM17.9655 16.4992C17.9607 17.31 17.3052 17.9655 16.4992 17.9655H3.50571C2.69483 17.9607 2.03933 17.3052 2.03933 16.4992V10.993L6.29765 12.2943C8.71085 13.0372 11.294 13.0372 13.7121 12.2943L17.9655 10.993V16.4992ZM19.0435 6.54044V8.56035H19.0337C19.0386 9.13816 18.6987 9.66256 18.1743 9.89562C18.1695 9.89562 18.1695 9.90048 18.1646 9.90048C18.1209 9.9199 18.0723 9.93932 18.0286 9.95389H18.0238L13.4256 11.362C11.1969 12.0466 8.81767 12.0466 6.58898 11.362L1.98592 9.95389C1.94222 9.93932 1.89852 9.92476 1.85482 9.90533C1.85482 9.90533 1.85967 9.90533 1.85967 9.90048C1.32071 9.67227 0.975965 9.14301 0.980821 8.55549V6.54044C0.975965 5.74898 1.61204 5.09834 2.4035 5.08863C2.40835 5.08863 2.41321 5.08863 2.42292 5.08863H17.6014C18.3928 5.08378 19.0386 5.72471 19.0435 6.52102C19.0435 6.52587 19.0435 6.53073 19.0435 6.54044Z" fill="currentColor" fillOpacity="0.6" />
                          <path d="M13.3965 7.0939C13.076 6.77829 12.6439 6.59863 12.1923 6.60349H7.81258C6.87545 6.60349 6.11313 7.36095 6.10828 8.30293C6.10828 8.7545 6.28793 9.18664 6.60354 9.50225C6.60354 9.50225 6.6084 9.50225 6.6084 9.50711C6.92887 9.82272 7.36101 10.0024 7.81258 10.0024H12.1923C13.1343 10.0024 13.8966 9.24005 13.8917 8.29807C13.8917 7.84651 13.7169 7.41922 13.3965 7.0939ZM12.1923 9.03126H7.81258C7.40956 9.03126 7.08424 8.70594 7.08424 8.30293C7.08424 7.89992 7.40956 7.5746 7.81258 7.5746H12.1923C12.5953 7.5746 12.9206 7.89992 12.9206 8.30293C12.9206 8.70594 12.5953 9.03126 12.1923 9.03126Z" fill="currentColor" />
                        </svg>
                      </div>
                      Business
                    </Link>
                  </li>
                  <li className="dropdown-item dropright">
                  <Link to={`/Espace_User/Allcourses/${encodeURIComponent("SoftwareDevelopment")}`} className="dropdown-link dropdown-toggle">
                      <div className="me-4 d-flex text-primary icon-xs">
                        {/* Icon */}
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.2422 0.0397949H1.75781C0.788555 0.0397949 0 0.82835 0 1.79761V18.2039C0 19.1731 0.788555 19.9617 1.75781 19.9617H18.2422C19.2114 19.9617 20 19.1731 20 18.2039V1.79761C20 0.82835 19.2114 0.0397949 18.2422 0.0397949ZM1.75781 1.21167H18.2422C18.5653 1.21167 18.8281 1.47452 18.8281 1.79761V4.72729H1.17188V1.79761C1.17188 1.47452 1.43473 1.21167 1.75781 1.21167ZM18.2422 18.7898H1.75781C1.43473 18.7898 1.17188 18.5269 1.17188 18.2039V5.89917H18.8281V18.2039C18.8281 18.5269 18.5653 18.7898 18.2422 18.7898Z" fill="currentColor" />
                          <path d="M11.9887 7.70365C11.6912 7.57619 11.3468 7.71396 11.2193 8.01138L7.70367 16.2145C7.57616 16.5119 7.71398 16.8564 8.0114 16.9839C8.30894 17.1114 8.65335 16.9735 8.78078 16.6761L12.2964 8.47302C12.4239 8.17556 12.2861 7.83111 11.9887 7.70365Z" fill="currentColor" />
                          <path d="M6.94201 9.63397C6.73982 9.38128 6.37103 9.34034 6.11845 9.54249L3.18876 11.8862C2.89583 12.1205 2.89564 12.5669 3.18876 12.8013L6.11845 15.1451C6.37115 15.3473 6.73994 15.3062 6.94201 15.0536C7.14416 14.8009 7.10322 14.4321 6.85048 14.23L4.49275 12.3438L6.85048 10.4576C7.10322 10.2554 7.14416 9.88671 6.94201 9.63397Z" fill="currentColor" />
                          <path d="M16.8114 11.8863L13.8817 9.54251C13.629 9.34032 13.2602 9.38129 13.0581 9.63399C12.856 9.88668 12.8969 10.2554 13.1496 10.4575L15.5074 12.3438L13.1496 14.23C12.8969 14.4321 12.856 14.8009 13.0581 15.0536C13.2605 15.3065 13.6293 15.347 13.8817 15.145L16.8114 12.8013C17.1043 12.567 17.1045 12.1207 16.8114 11.8863Z" fill="currentColor" />
                          <path d="M2.96875 3.55469C3.29235 3.55469 3.55469 3.29235 3.55469 2.96875C3.55469 2.64515 3.29235 2.38281 2.96875 2.38281C2.64515 2.38281 2.38281 2.64515 2.38281 2.96875C2.38281 3.29235 2.64515 3.55469 2.96875 3.55469Z" fill="currentColor" />
                          <path d="M5.3125 3.55469C5.6361 3.55469 5.89844 3.29235 5.89844 2.96875C5.89844 2.64515 5.6361 2.38281 5.3125 2.38281C4.9889 2.38281 4.72656 2.64515 4.72656 2.96875C4.72656 3.29235 4.9889 3.55469 5.3125 3.55469Z" fill="currentColor" />
                          <path d="M7.65625 3.55469C7.97985 3.55469 8.24219 3.29235 8.24219 2.96875C8.24219 2.64515 7.97985 2.38281 7.65625 2.38281C7.33265 2.38281 7.07031 2.64515 7.07031 2.96875C7.07031 3.29235 7.33265 3.55469 7.65625 3.55469Z" fill="currentColor" />
                          <path d="M13.5156 3.55469H17.0312C17.3548 3.55469 17.6172 3.29234 17.6172 2.96875C17.6172 2.64516 17.3548 2.38281 17.0312 2.38281H13.5156C13.192 2.38281 12.9297 2.64516 12.9297 2.96875C12.9297 3.29234 13.192 3.55469 13.5156 3.55469Z" fill="currentColor" />
                        </svg>
                      </div>
                      SoftwareDevelopment
                      </Link>
                  </li>
                  <li className="dropdown-item dropright">
                  <Link to={`/Espace_User/Allcourses/${encodeURIComponent("PersonalDevelopment")}`} className="dropdown-link dropdown-toggle">
                      <div className="me-4 d-flex text-primary icon-xs">
                        {/* Icon */}
                        <svg width={14} height={18} viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.5717 0H4.16956C4.05379 0.00594643 3.94322 0.0496071 3.85456 0.124286L0.413131 3.57857C0.328167 3.65957 0.280113 3.77191 0.280274 3.88929V16.8514C0.281452 17.4853 0.794988 17.9988 1.42885 18H12.5717C13.1981 17.9989 13.7086 17.497 13.7203 16.8707V1.14857C13.7191 0.514714 13.2056 0.00117857 12.5717 0ZM8.18099 0.857143H10.6988V4.87714L9.80527 3.45214C9.76906 3.39182 9.71859 3.3413 9.65827 3.30514C9.45529 3.18337 9.19204 3.24916 9.07027 3.45214L8.18099 4.87071V0.857143ZM3.7367 1.46786V2.66143C3.73552 3.10002 3.38029 3.45525 2.9417 3.45643H1.74813L3.7367 1.46786ZM12.8546 16.86C12.8534 17.0157 12.7274 17.1417 12.5717 17.1429H1.42885C1.42665 17.1429 1.42445 17.143 1.42226 17.143C1.26486 17.1441 1.13635 17.0174 1.13527 16.86V4.32214H2.9417C3.85793 4.31979 4.60006 3.57766 4.60242 2.66143V0.857143H7.31527V5.23286C7.31345 5.42593 7.37688 5.61391 7.49527 5.76643C7.67533 5.99539 7.98036 6.08561 8.25599 5.99143L8.28813 5.98071C8.49272 5.89484 8.66356 5.7443 8.77456 5.55214L9.44099 4.48071L10.1074 5.55214C10.2184 5.7443 10.3893 5.89484 10.5938 5.98071C10.8764 6.0922 11.1987 6.00509 11.3867 5.76643C11.5051 5.61391 11.5685 5.42593 11.5667 5.23286V0.857143H12.5717C12.7266 0.858268 12.8523 0.982982 12.8546 1.13786V16.86Z" fill="currentColor" />
                          <path d="M10.7761 14.3143H3.22252C2.98584 14.3143 2.79395 14.5062 2.79395 14.7429C2.79395 14.9796 2.98584 15.1715 3.22252 15.1715H10.7761C11.0128 15.1715 11.2047 14.9796 11.2047 14.7429C11.2047 14.5062 11.0128 14.3143 10.7761 14.3143Z" fill="currentColor" />
                          <path d="M10.7761 12.2035H3.22252C2.98584 12.2035 2.79395 12.3954 2.79395 12.6321C2.79395 12.8687 2.98584 13.0606 3.22252 13.0606H10.7761C11.0128 13.0606 11.2047 12.8687 11.2047 12.6321C11.2047 12.3954 11.0128 12.2035 10.7761 12.2035Z" fill="currentColor" />
                          <path d="M10.7761 10.0928H3.22252C2.98584 10.0928 2.79395 10.2847 2.79395 10.5213C2.79395 10.758 2.98584 10.9499 3.22252 10.9499H10.7761C11.0128 10.9499 11.2047 10.758 11.2047 10.5213C11.2047 10.2847 11.0128 10.0928 10.7761 10.0928Z" fill="currentColor" />
                          <path d="M10.7761 7.98218H3.22252C2.98584 7.98218 2.79395 8.17407 2.79395 8.41075C2.79395 8.64743 2.98584 8.83932 3.22252 8.83932H10.7761C11.0128 8.83932 11.2047 8.64743 11.2047 8.41075C11.2047 8.17407 11.0128 7.98218 10.7761 7.98218Z" fill="currentColor" />
                        </svg>
                      </div>
                      PersonalDevelopment
                      </Link>
                  </li>
             
                  <li className="dropdown-item dropright">
                  <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Photography")}`} className="dropdown-link dropdown-toggle">
                      <div className="me-4 d-flex text-primary icon-xs">
                        {/* Icon */}
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0ZM17.8937 6.25H10C9.75668 6.24934 9.51387 6.27238 9.275 6.31875L12.0813 1.50625C14.6328 2.13449 16.7668 3.87617 17.8937 6.25ZM12.5 10C12.5048 11.3807 11.3893 12.5038 10.0086 12.5086C8.62789 12.5134 7.50477 11.3979 7.5 10.0172C7.49523 8.63648 8.6107 7.51336 9.99141 7.50859C10.8075 7.50578 11.5737 7.90152 12.0438 8.56875L12.0938 8.6375C12.3582 9.04277 12.4993 9.51609 12.5 10ZM10 1.25C10.2563 1.25 10.5125 1.25 10.7625 1.2875L6.9625 7.8125C6.83379 7.98977 6.72086 8.17801 6.625 8.375L3.86875 3.75C5.50613 2.1457 7.7077 1.24805 10 1.25ZM1.25 10C1.25043 8.10965 1.86699 6.27098 3.00625 4.7625L6.25 10.1875C6.29629 11.0459 6.63609 11.8623 7.2125 12.5H1.5875C1.3543 11.6875 1.24063 10.8453 1.25 10ZM2.10625 13.75H10C10.2433 13.7507 10.4861 13.7276 10.725 13.6812L7.91875 18.4937C5.36723 17.8655 3.23316 16.1238 2.10625 13.75ZM10 18.75C9.74375 18.75 9.4875 18.75 9.2375 18.7125L13.0375 12.1875C13.309 11.8108 13.5082 11.387 13.625 10.9375L16.75 15.5875C15.084 17.5953 12.6089 18.7549 10 18.75ZM13.125 7.98125L13.0375 7.85L12.9875 7.775C12.9167 7.67918 12.8396 7.58543 12.7563 7.49375H18.3813C19.0941 9.84641 18.7737 12.3912 17.5 14.4938L13.125 7.98125Z" fill="currentColor" />
                        </svg>
                      </div>
                      Photography
                      </Link>
                  </li>
               
                  <li className="dropdown-item dropright">
                  <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Music")}`} className="dropdown-link dropdown-toggle">
                      <div className="me-4 d-flex text-primary icon-xs">
                        {/* Icon */}
                        <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.7859 0.164169C17.6493 0.0430309 17.468 -0.0150898 17.2864 0.00408285L5.71501 1.28978C5.3893 1.32583 5.14284 1.6011 5.14288 1.92877V13.3845C4.56001 13.0365 3.89315 12.8542 3.21431 12.8573C1.44194 12.8574 0 14.0107 0 15.4288C0 16.8469 1.44195 18.0002 3.21427 18.0002C4.9866 18.0002 6.42854 16.8469 6.42854 15.4288V5.72165L16.7143 4.57543V12.0969C16.1312 11.7495 15.4644 11.5679 14.7857 11.5717C13.0133 11.5717 11.5714 12.725 11.5714 14.1431C11.5714 15.5612 13.0134 16.7145 14.7857 16.7145C16.558 16.7145 18 15.5612 18 14.1431V0.64311C18 0.460272 17.9221 0.286098 17.7859 0.164169ZM3.21427 16.7145C2.169 16.7145 1.2857 16.1256 1.2857 15.4288C1.2857 14.732 2.169 14.1431 3.21427 14.1431C4.25954 14.1431 5.14284 14.732 5.14284 15.4288C5.14284 16.1256 4.25958 16.7145 3.21427 16.7145ZM14.7857 15.4288C13.7404 15.4288 12.8571 14.8399 12.8571 14.1431C12.8571 13.4462 13.7404 12.8574 14.7857 12.8574C15.831 12.8574 16.7143 13.4462 16.7143 14.1431C16.7143 14.8399 15.831 15.4288 14.7857 15.4288ZM16.7143 3.28201L6.42854 4.42503V2.50738L16.7143 1.36116V3.28201Z" fill="currentColor" />
                        </svg>
                      </div>
                      Audio + Music
                      </Link>
                  </li>
                
                  <li className="dropdown-item dropright">
                  <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Marketing")}`} className="dropdown-link dropdown-toggle">
                      <div className="me-4 d-flex text-primary icon-xs">
                        {/* Icon */}
                        <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.3555 10.3555H19.4219C19.0659 10.3555 18.7773 10.644 18.7773 11C18.7773 11.356 19.0659 11.6445 19.4219 11.6445H21.3555C21.7114 11.6445 22 11.356 22 11C22 10.644 21.7114 10.3555 21.3555 10.3555Z" fill="currentColor" />
                          <path d="M20.5222 14.4114L19.2331 13.1223C18.9815 12.8707 18.5733 12.8707 18.3216 13.1223C18.0699 13.374 18.0699 13.7821 18.3216 14.0338L19.6107 15.3229C19.8624 15.5746 20.2705 15.5746 20.5222 15.3229C20.7739 15.0712 20.7739 14.6631 20.5222 14.4114Z" fill="currentColor" />
                          <path d="M20.5222 6.67703C20.2705 6.42536 19.8624 6.42536 19.6107 6.67703L18.3216 7.96609C18.0699 8.2178 18.0699 8.62588 18.3216 8.87759C18.5733 9.1293 18.9814 9.12926 19.2331 8.87759L20.5222 7.58853C20.7739 7.33682 20.7739 6.92874 20.5222 6.67703Z" fill="currentColor" />
                          <path d="M14.9102 2.62109C13.942 2.62109 13.1379 3.33631 12.9982 4.26611L12.4102 4.85405C11.3869 5.87735 9.87993 6.48828 8.37891 6.48828H4.51172C3.67146 6.48828 2.95505 7.02715 2.68898 7.77734H2.57812C1.15655 7.77734 0 8.93389 0 10.3555C0 11.777 1.15655 12.9336 2.57812 12.9336H2.68898C2.8835 13.482 3.31873 13.9173 3.86719 14.1118V17.4453C3.86719 18.5115 4.73464 19.3789 5.80082 19.3789C6.86697 19.3789 7.73438 18.5115 7.73438 17.4453V14.2227H8.37891C9.87989 14.2227 11.3869 14.8336 12.4102 15.8569L12.9982 16.4448C13.1379 17.3746 13.9421 18.0898 14.9102 18.0898C15.9763 18.0898 16.8438 17.2224 16.8438 16.1562V4.55469C16.8438 3.4885 15.9763 2.62109 14.9102 2.62109ZM2.57812 11.6445C1.86734 11.6445 1.28906 11.0663 1.28906 10.3555C1.28906 9.64468 1.86734 9.06641 2.57812 9.06641V11.6445ZM6.44531 17.4453C6.44531 17.8007 6.15618 18.0898 5.80078 18.0898C5.44539 18.0898 5.15625 17.8007 5.15625 17.4453V14.2227H6.44531V17.4453ZM7.73438 12.9336H4.51172C4.15632 12.9336 3.86719 12.6445 3.86719 12.2891V8.42187C3.86719 8.06648 4.15632 7.77734 4.51172 7.77734H7.73438V12.9336ZM12.9766 14.6242C11.8877 13.6819 10.4877 13.0963 9.01914 12.9628L9.01918 7.74808C10.4877 7.61462 11.8877 7.02909 12.9766 6.08665V14.6242ZM15.5547 16.1562C15.5547 16.5116 15.2656 16.8008 14.9102 16.8008H14.9102C14.5548 16.8008 14.2656 16.5116 14.2656 16.1562V4.55469C14.2656 4.19929 14.5548 3.91016 14.9102 3.91016C15.2656 3.91016 15.5547 4.19929 15.5547 4.55469V16.1562Z" fill="currentColor" />
                        </svg>
                      </div>
                      Marketing
                      </Link>
                  </li>
                  <li className="dropdown-item dropright">
                  <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Finance")}`} className="dropdown-link dropdown-toggle">
                      <div className="me-4 d-flex text-primary icon-xs">
                        {/* Icon */}
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.0833 1.80566H4.08796C3.03241 1.81029 2.17593 2.66678 2.17593 3.72696V3.75011H1.91667C0.861111 3.75011 0.00462963 4.60196 0 5.65752V16.2733C0.00462963 17.3288 0.856482 18.1899 1.91667 18.1946H15.912C16.9676 18.1899 17.8241 17.3334 17.8241 16.2733V16.2501H18.0833C19.1389 16.2501 19.9954 15.3983 20 14.3427V3.72696C19.9954 2.66678 19.1435 1.81029 18.0833 1.80566ZM15.912 17.2686H1.91667C1.37037 17.264 0.930556 16.8196 0.925926 16.2733V5.65752C0.930556 5.11585 1.37037 4.67603 1.91667 4.67603H15.912C16.4537 4.67603 16.8981 5.11122 16.8981 5.65752V8.30566C16.8148 8.32418 16.7315 8.33344 16.6528 8.33344H13.9815C12.5278 8.33344 11.3472 9.514 11.3472 10.9677C11.3472 12.4214 12.5278 13.602 13.9815 13.6066H16.6481C16.7315 13.602 16.8148 13.5927 16.8935 13.5834L16.8981 16.2733C16.8981 16.8196 16.4583 17.264 15.912 17.2686ZM19.0741 14.3427C19.0694 14.8844 18.6296 15.3242 18.0833 15.3242H17.8241V13.2501C18.0231 13.1159 18.2037 12.9492 18.3565 12.764L19.0741 11.8381V14.3427ZM17.625 12.2038C17.3935 12.5047 17.0324 12.6807 16.6528 12.6853H13.9815C13.037 12.6807 12.2731 11.9168 12.2731 10.9723C12.2731 10.0279 13.037 9.264 13.9815 9.25937H16.6481C16.9676 9.25937 17.2824 9.18992 17.5694 9.05103C17.875 8.90752 18.1435 8.68992 18.3519 8.4214L19.0694 7.49548L19.0741 10.3242L17.625 12.2038ZM19.0741 5.98159L17.8241 7.5927V5.65752C17.8241 4.60196 16.9676 3.75011 15.912 3.75011H3.10185V3.72696C3.10185 3.18066 3.54167 2.73622 4.08796 2.73159H18.0833C18.6296 2.73622 19.0694 3.18066 19.0741 3.72696V5.98159Z" fill="currentColor" />
                          <path d="M15.0185 10.5093H13.9074C13.6528 10.5093 13.4445 10.7176 13.4445 10.9722C13.4445 11.2269 13.6528 11.4352 13.9074 11.4352H15.0185C15.2732 11.4352 15.4815 11.2269 15.4815 10.9722C15.4815 10.7176 15.2732 10.5093 15.0185 10.5093Z" fill="currentColor" />
                        </svg>
                      </div>
                      Finance &amp; Accounting
                      </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Collapse */}
            <div className="collapse navbar-collapse z-index-lg" id="navbarCollapse">
              {/* Navigation */}
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown dropdown-full-width">
                <Link to="/Espace_User/" className="nav-link px-xl-4">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle px-xl-4" id="navbarShop" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
                    Categories
                  </a>
                  <ul className="dropdown-menu border-xl shadow-none" aria-labelledby="navbarShop">
                    <li className="dropdown-item">
                    <Link to="/Espace_User/Allcourses" className="dropdown-link">
                        All Categories
                    </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/Espace_User/LatestCours" className="dropdown-link">
                      Latest Cours
                    </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown dropdown-full-width">
                  <Link to="/Espace_User/MyCoures" className="nav-link px-xl-4">
                  My Coures
                    </Link>
                </li>
                <li className="nav-item dropdown dropdown-full-width">
                  <Link to="/Espace_User/Institut" className="nav-link px-xl-4">
                  Institut
                    </Link>
                </li>
                <li className="nav-item dropdown dropdown-full-width">
                  <Link to="/Espace_User/ContactUs" className="nav-link px-xl-4">
                  Contact Us
                    </Link>
                </li>
                <li className="nav-item dropdown dropdown-full-width">
                  <Link to="/Espace_User/FAQ" className="nav-link px-xl-4">
                  FAQ
                    </Link>
                </li>
              </ul>
            </div>
            {/* Search, Account & Cart */}
            <ul className="navbar-nav flex-row ms-auto ms-xl-0 me-n2 me-md-n4 align-items-center">
              <li className="nav-item border-0 px-0">
                {/* Button trigger account modal */}
                <a href="#" className="nav-link d-flex px-3 px-md-4 align-items-center text-white-all icon-xs" data-bs-toggle="modal" data-bs-target="#accountModal">
                  {/* Icon */}
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2252 3.0777C15.3376 1.10738 12.7258 -0.0045765 9.99712 0.000444175C4.48284 -0.00650109 0.00695317 4.45809 7.91636e-06 9.97242C-0.00342287 12.6991 1.1084 15.3085 3.07726 17.1948C3.08299 17.2005 3.08512 17.209 3.09082 17.2141C3.14864 17.2698 3.21148 17.3169 3.27005 17.3705C3.43071 17.5133 3.59138 17.6611 3.76061 17.7989C3.85128 17.8703 3.94554 17.9417 4.03838 18.0074C4.19833 18.1266 4.35828 18.2459 4.52535 18.3558C4.6389 18.4273 4.756 18.4986 4.87236 18.5701C5.02658 18.6629 5.18012 18.7564 5.33936 18.8414C5.47434 18.9128 5.61211 18.9742 5.74922 19.0392C5.89917 19.1106 6.04698 19.182 6.20049 19.2462C6.354 19.3105 6.50826 19.3605 6.6639 19.4162C6.81954 19.4719 6.9538 19.5233 7.10304 19.569C7.27157 19.6197 7.44436 19.6589 7.61573 19.7011C7.75853 19.736 7.89706 19.776 8.04416 19.8046C8.24123 19.8439 8.44117 19.8689 8.64112 19.896C8.76467 19.9132 8.88534 19.9374 9.01027 19.9496C9.33732 19.9817 9.66718 19.9996 9.99992 19.9996C10.3327 19.9996 10.6626 19.9817 10.9896 19.9496C11.1146 19.9374 11.2352 19.9132 11.3587 19.896C11.5587 19.8689 11.7586 19.8439 11.9557 19.8046C12.0985 19.776 12.2413 19.7332 12.3841 19.7011C12.5555 19.6589 12.7283 19.6196 12.8968 19.569C13.046 19.5233 13.1903 19.4676 13.3359 19.4162C13.4816 19.3648 13.6473 19.3091 13.7994 19.2462C13.9514 19.1834 14.1007 19.1098 14.2506 19.0392C14.3877 18.9742 14.5256 18.9128 14.6605 18.8414C14.8197 18.7564 14.9732 18.6629 15.1275 18.5701C15.2439 18.4986 15.361 18.4337 15.4745 18.3558C15.6416 18.2459 15.8016 18.1267 15.9615 18.0074C16.0543 17.936 16.1485 17.8717 16.2392 17.7989C16.4085 17.6632 16.5691 17.519 16.7298 17.3705C16.7883 17.3169 16.8512 17.2698 16.909 17.2141C16.9147 17.2091 16.9169 17.2005 16.9226 17.1948C20.9046 13.38 21.04 7.05955 17.2252 3.0777ZM15.6203 16.4472C15.4904 16.5614 15.3561 16.6699 15.2205 16.7749C15.1405 16.8363 15.0605 16.897 14.9784 16.9556C14.8491 17.0491 14.7178 17.1377 14.5842 17.2226C14.4871 17.2848 14.3879 17.3447 14.2879 17.4033C14.1622 17.4747 14.0344 17.5461 13.9051 17.6175C13.7909 17.676 13.6745 17.7311 13.5574 17.7853C13.4403 17.8396 13.3111 17.8974 13.1847 17.9481C13.0583 17.9988 12.924 18.0467 12.7919 18.0909C12.6713 18.1323 12.5506 18.1752 12.4285 18.2116C12.2857 18.2544 12.1364 18.2894 11.9886 18.3251C11.8729 18.3522 11.7587 18.383 11.6416 18.4058C11.4724 18.4387 11.2996 18.4615 11.1261 18.4851C11.0275 18.4979 10.9297 18.5158 10.8304 18.5258C10.5562 18.5522 10.2784 18.5679 9.99783 18.5679C9.71722 18.5679 9.43945 18.5522 9.16524 18.5258C9.066 18.5158 8.96818 18.4979 8.8696 18.4851C8.6961 18.4615 8.5233 18.4387 8.35406 18.4058C8.23696 18.383 8.1227 18.3523 8.00705 18.3251C7.85924 18.2894 7.71213 18.2537 7.5672 18.2116C7.44512 18.1752 7.32441 18.1323 7.20375 18.0909C7.07166 18.0452 6.93953 17.9988 6.811 17.9481C6.68248 17.8974 6.5611 17.8417 6.43826 17.7853C6.31542 17.7289 6.20476 17.6761 6.09054 17.6175C5.9613 17.5504 5.83348 17.4797 5.7078 17.4033C5.60784 17.3448 5.50856 17.2848 5.41145 17.2226C5.27794 17.1377 5.14653 17.0491 5.01729 16.9556C4.93516 16.897 4.8552 16.8363 4.77521 16.7749C4.63952 16.6699 4.5053 16.5607 4.37535 16.4472C4.34393 16.4236 4.31536 16.3936 4.28469 16.3664C4.31661 13.9374 5.87708 11.7926 8.17843 11.0146C9.32912 11.562 10.6651 11.562 11.8158 11.0146C14.1171 11.7926 15.6776 13.9374 15.7096 16.3664C15.6796 16.3936 15.651 16.4208 15.6203 16.4472ZM7.50716 5.7256C8.2803 4.3506 10.0217 3.86272 11.3967 4.63586C12.7717 5.409 13.2596 7.15038 12.4864 8.52538C12.2299 8.98159 11.8529 9.35856 11.3967 9.61511C11.3931 9.61511 11.3888 9.61511 11.3845 9.61938C11.1952 9.72477 10.9951 9.80954 10.7876 9.87217C10.7505 9.88288 10.7162 9.89715 10.6769 9.90644C10.6055 9.92501 10.5305 9.93786 10.457 9.9507C10.3185 9.97493 10.1784 9.98898 10.0378 9.99283H9.95641C9.81588 9.98898 9.67576 9.97493 9.53727 9.9507C9.46585 9.93786 9.39016 9.92501 9.31736 9.90644C9.2795 9.89715 9.24594 9.88288 9.2067 9.87217C8.99922 9.80954 8.79911 9.72481 8.60974 9.61938L8.5969 9.61511C7.2219 8.84197 6.73402 7.10059 7.50716 5.7256ZM16.9763 14.9505C16.518 12.8133 15.1107 11.0014 13.1532 10.0286C14.7534 8.28555 14.6375 5.57535 12.8944 3.97522C11.1514 2.3751 8.44117 2.49099 6.84104 4.23404C5.33677 5.8727 5.33677 8.38998 6.84104 10.0286C4.88361 11.0014 3.47624 12.8133 3.01802 14.9505C0.27991 11.0937 1.18681 5.74744 5.04365 3.00933C8.90048 0.271226 14.2467 1.17813 16.9848 5.03496C18.0141 6.48481 18.5666 8.21907 18.5658 9.99714C18.5658 11.7737 18.01 13.5057 16.9763 14.9505Z" fill="currentColor" />
                  </svg>
                  <h6 className="text-white ms-1 mb-0 d-none d-xl-block">My Profile</h6>
                </a>
              </li>
            </ul>
             {/* Toggler */}
             <button onClick={handleLogout} className="navbar-toggler ms-4 ms-md-5 shadow-none bg-teal text-white icon-xs p-0 outline-0 h-40p w-40p d-flex d-xl-none place-flex-center" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
             <i className="fa-solid fa-right-from-bracket" style={{"color": "#ffffff"}} />
                </button>
          </div>
        </header>
        {/* HERO 
      ================================================== */}
        <section className="py-15 pt-xl-14 mt-n14 pb-lg-15 bg-dark bg-cover position-relative">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-5 col-lg-6 order-md-2" data-aos="fade-in">
                {/* Image */}
                <img src="../assets/img/illustrations/illustration-4.png" className="img-fluid ms-xl-5 mw-md-150 mw-lg-130 mb-6 mb-md-0" alt="..." />
              </div>
              <div className="col-12 col-md-7 col-lg-6 order-md-1">
                {/* Heading */}
                <h1 className="display-2 text-white mb-6" data-aos="fade-left" data-aos-duration={150}>
                  More Than 48.259 <span className="display-1 text-orange fw-bold">Online Courses</span>
                </h1>
                {/* Form */}
                  <div className="input-group">
                  <button onClick={handleButtonClick}>
                    <div className="input-group-prepend">
                      <span className="input-group-text border-right-0 text-primary icon-xs rounded-left-xl">
                        {/* Icon */}
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.80758 0C3.95121 0 0 3.95121 0 8.80758C0 13.6642 3.95121 17.6152 8.80758 17.6152C13.6642 17.6152 17.6152 13.6642 17.6152 8.80758C17.6152 3.95121 13.6642 0 8.80758 0ZM8.80758 15.9892C4.8477 15.9892 1.62602 12.7675 1.62602 8.80762C1.62602 4.84773 4.8477 1.62602 8.80758 1.62602C12.7675 1.62602 15.9891 4.8477 15.9891 8.80758C15.9891 12.7675 12.7675 15.9892 8.80758 15.9892Z" fill="currentColor" />
                          <path d="M19.762 18.6121L15.1007 13.9509C14.7831 13.6332 14.2687 13.6332 13.9511 13.9509C13.6335 14.2682 13.6335 14.7831 13.9511 15.1005L18.6124 19.7617C18.7712 19.9205 18.9791 19.9999 19.1872 19.9999C19.395 19.9999 19.6032 19.9205 19.762 19.7617C20.0796 19.4444 20.0796 18.9295 19.762 18.6121Z" fill="currentColor" />
                        </svg>
                      </span>
                    </div>
                    </button>
                    <input
                        type="search"
                        className="form-control ps-2 border-left-0 rounded-right-xl border-0"
                        placeholder="Search for a course"
                        list="courseOptions"
                        value={searchTerm}
                        onChange={handleChange}
                        onInput={(e) => handleSelectCourse(e.target.value)}
                      />
                      <datalist id="courseOptions">
                        {MyfilteredCourses.map((course) => (
                          <option key={course.id} value={course.title}/>
                        ))}
                      </datalist>

                  </div>
                {/* Text */}
                <p className="text-white text-capitalize" data-aos="fade-up" data-aos-duration={200}>
                  Trending Search: Development, Business, Design, Merketing
                </p>
              </div>
            </div> {/* / .row */}
          </div> {/* / .container */}
          {/* Shape */}
          <div className="shape shape-blur mb-n-1 shape-bottom shape-fluid-x svg-shim text-white-ice">
            <svg viewBox="0 0 1920 230" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M0,229l1920,0V-0.4c0,25.8-19.6,47.3-45.2,49.8L54.8,223.8C25.4,226.6,0,203.5,0,174V229z" />
            </svg>
          </div>
        </section>
        {/* FEATURED PRODUCT
    ================================================== */}
        <section className="pt-5 pb-9 py-md-11">
          <div className="container">
            <div className="row align-items-center mb-5" data-aos="fade-up">
              <div className="col-md mb-2 mb-md-0">
                <h1 className="mb-1">Featured Courses</h1>
                <p className="font-size-lg text-capitalize">Discover your perfect program in our courses.</p>
              </div>
              <div className="col-md-auto">
              <select 
                className="ipnSec form-select form-select-sm text-primary fw-medium shadow"
                value={selectedCategoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              </div>
            </div>
            <Flickity
            key={filteredCourses} 
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      {filteredCourses.slice(0, 8).sort((a, b) => b.rating - a.rating).map(course => (
        <div className="col-12 col-md-6 col-xl-4 pb-4 pb-md-7" key={course.id} data-aos="fade-up" data-aos-delay={50} style={{paddingRight: '15px', paddingLeft: '15px'}}>
                {/* Card */}
                <div className="card border shadow p-2 sk-fade">
                  {/* Image */}
                  <div className="card-zoom position-relative">
                    <div className="badge-float sk-fade-top top-0 right-0 mt-4 me-4">
                        <Link to={`/Espace_User/CourseSingle/${course.id}`} className="btn btn-xs btn-dark text-white rounded-circle lift opacity-dot-7 p-2 d-inline-flex justify-content-center align-items-center w-36 h-36">
                        {/* Icon */}
                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.2437 1.20728C10.0203 1.20728 8.87397 1.66486 7.99998 2.48357C7.12598 1.66486 5.97968 1.20728 4.7563 1.20728C2.13368 1.20728 0 3.341 0 5.96366C0 7.2555 0.425164 8.52729 1.26366 9.74361C1.91197 10.6841 2.80887 11.5931 3.92937 12.4454C5.809 13.8753 7.66475 14.6543 7.74285 14.6867L7.99806 14.7928L8.25384 14.6881C8.33199 14.6562 10.1889 13.8882 12.0696 12.4635C13.1907 11.6142 14.0881 10.7054 14.7367 9.7625C15.575 8.54385 16 7.26577 16 5.96371C16 3.341 13.8663 1.20728 11.2437 1.20728ZM8.00141 13.3353C6.74962 12.7555 1.33966 10.0142 1.33966 5.96366C1.33966 4.07969 2.87237 2.54698 4.75634 2.54698C5.827 2.54698 6.81558 3.03502 7.46862 3.88598L8.00002 4.57845L8.53142 3.88598C9.18446 3.03502 10.173 2.54698 11.2437 2.54698C13.1276 2.54698 14.6604 4.07969 14.6604 5.96366C14.6603 10.0433 9.25265 12.7613 8.00141 13.3353Z" fill="currentColor" />
                        </svg>
                      </Link>
                    </div>
                    <Link to={`/Espace_User/CourseSingle/${course.id}`} className="card-img sk-thumbnail d-block">
                      <img className="rounded shadow-light-lg" src={`http://127.0.0.1:8000/images/${course.image}`} alt="..." />
                    </Link>
                    <span className="badge sk-fade-bottom badge-lg badge-orange badge-pill badge-float bottom-0 left-0 mb-4 ms-4">
                      <span className="text-white text-uppercase fw-bold font-size-xs">{course.category.name}</span>
                    </span>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-2 pb-2 mb-1 pt-4 position-relative">
                    {/* Preheading */} <svg width={15} height={15} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.8102 9.52183C13.313 9.08501 12.7102 8.70758 12.0181 8.40008C11.7223 8.2687 11.3761 8.40191 11.2447 8.69762C11.1134 8.99334 11.2466 9.33952 11.5423 9.47102C12.1258 9.73034 12.6287 10.0436 13.0367 10.4021C13.5396 10.8441 13.8281 11.484 13.8281 12.1582V13.2422C13.8281 13.5653 13.5653 13.8281 13.2422 13.8281H1.75781C1.43475 13.8281 1.17188 13.5653 1.17188 13.2422V12.1582C1.17188 11.484 1.46038 10.8441 1.96335 10.4021C2.55535 9.88186 4.2802 8.67188 7.5 8.67188C9.89079 8.67188 11.8359 6.72672 11.8359 4.33594C11.8359 1.94515 9.89079 0 7.5 0C5.10921 0 3.16406 1.94515 3.16406 4.33594C3.16406 5.7336 3.82896 6.97872 4.85893 7.77214C2.97432 8.18642 1.80199 8.98384 1.18984 9.52183C0.433731 10.1862 0 11.147 0 12.1582V13.2422C0 14.2115 0.788498 15 1.75781 15H13.2422C14.2115 15 15 14.2115 15 13.2422V12.1582C15 11.147 14.5663 10.1862 13.8102 9.52183ZM4.33594 4.33594C4.33594 2.59129 5.75535 1.17188 7.5 1.17188C9.24465 1.17188 10.6641 2.59129 10.6641 4.33594C10.6641 6.08059 9.24465 7.5 7.5 7.5C5.75535 7.5 4.33594 6.08059 4.33594 4.33594Z" fill="currentColor" />
                            </svg>
                    <Link to={`/Espace_User/CourseSingle/${course.id}`}>
                      
                      <span className="mb-1 d-inline-block text-gray-800">{course.category.name}</span></Link>
                    {/* Heading */}
                    <div className="position-relative">
                    <Link to={`/Espace_User/CourseSingle/${course.id}`} className="d-block stretched-link"><h4 className="line-clamp-2 h-md-48 h-lg-58 me-md-6 me-lg-10 me-xl-4 mb-2">{course.title}</h4></Link>
                      <div className="d-lg-flex align-items-end flex-wrap mb-n1">
                        <div className="star-rating mb-2 mb-lg-0 me-lg-3">
                          <div className="rating" style={{ width: `${ course.rating * 20}%` }} />
                        </div>
                      </div>
                      <div className="row mx-n2 align-items-end mh-50">
                        <div className="col px-2">
                          <ul className="nav mx-n3">
                            <li className="nav-item px-3">
                              <div className="d-flex align-items-center">
                                <div className="me-2 d-flex icon-uxs text-secondary">
                                  {/* Icon */}
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.1947 7.06802L14.6315 7.9985C14.2476 7.31186 13.712 6.71921 13.0544 6.25992C12.8525 6.11877 12.6421 5.99365 12.4252 5.88303C13.0586 5.25955 13.452 4.39255 13.452 3.43521C13.452 1.54098 11.9124 -1.90735e-06 10.0197 -1.90735e-06C8.12714 -1.90735e-06 6.58738 1.54098 6.58738 3.43521C6.58738 4.39255 6.98075 5.25955 7.61414 5.88303C7.39731 5.99365 7.1869 6.11877 6.98502 6.25992C6.32752 6.71921 5.79178 7.31186 5.40787 7.9985L2.8447 7.06802C2.33612 6.88339 1.79688 7.26044 1.79688 7.80243V16.5178C1.79688 16.8465 2.00256 17.14 2.31155 17.2522L9.75312 19.9536C9.93073 20.018 10.1227 20.0128 10.2863 19.9536L17.7278 17.2522C18.0368 17.14 18.2425 16.8465 18.2425 16.5178V7.80243C18.2425 7.26135 17.704 6.88309 17.1947 7.06802ZM10.0197 1.5625C11.0507 1.5625 11.8895 2.40265 11.8895 3.43521C11.8895 4.46777 11.0507 5.30792 10.0197 5.30792C8.98866 5.30792 8.14988 4.46777 8.14988 3.43521C8.14988 2.40265 8.98866 1.5625 10.0197 1.5625ZM9.23844 18.1044L3.35938 15.9703V8.91724L9.23844 11.0513V18.1044ZM10.0197 9.67255L6.90644 8.54248C7.58164 7.51892 8.75184 6.87042 10.0197 6.87042C11.2875 6.87042 12.4577 7.51892 13.1329 8.54248L10.0197 9.67255ZM16.68 15.9703L10.8009 18.1044V11.0513L16.68 8.91724V15.9703Z" fill="currentColor" />
                                  </svg>
                                </div>
                                <div className="font-size-sm">{course.lessons} lessons</div>
                              </div>
                            </li>
                            <li className="nav-item px-3">
                              <div className="d-flex align-items-center">
                                <div className="me-2 d-flex icon-uxs text-secondary">
                                  {/* Icon */}
                                  <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.3164 4.20996C13.985 4.37028 13.8464 4.76904 14.0067 5.10026C14.4447 6.00505 14.6667 6.98031 14.6667 8C14.6667 11.6759 11.6759 14.6667 8 14.6667C4.32406 14.6667 1.33333 11.6759 1.33333 8C1.33333 4.32406 4.32406 1.33333 8 1.33333C9.52328 1.33333 10.9543 1.83073 12.1387 2.77165C12.4259 3.00098 12.846 2.95296 13.0754 2.66471C13.3047 2.37663 13.2567 1.95703 12.9683 1.72803C11.5661 0.613607 9.8016 0 8 0C3.58903 0 0 3.58903 0 8C0 12.411 3.58903 16 8 16C12.411 16 16 12.411 16 8C16 6.77767 15.7331 5.60628 15.2067 4.51969C15.0467 4.18766 14.6466 4.04932 14.3164 4.20996Z" fill="currentColor" />
                                    <path d="M7.99967 2.66663C7.63167 2.66663 7.33301 2.96529 7.33301 3.33329V7.99996C7.33301 8.36796 7.63167 8.66663 7.99967 8.66663H11.333C11.701 8.66663 11.9997 8.36796 11.9997 7.99996C11.9997 7.63196 11.701 7.33329 11.333 7.33329H8.66634V3.33329C8.66634 2.96529 8.36768 2.66663 7.99967 2.66663Z" fill="currentColor" />
                                  </svg>
                                </div> 
                                <div className="font-size-sm">{course.duration}</div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-auto px-2 text-right">
                          <ins className="h4 mb-0 d-block mb-lg-n1">${course.price}</ins>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

      ))}
        </Flickity>
          </div>
        </section>
        {/* CATEGORIES
    ================================================== */}
        <section className="py-5 py-md-11 bg-white">
          <div className="container">
            <div className="row align-items-end mb-md-7 mb-4" data-aos="fade-up">
              <div className="col-md mb-4 mb-md-0">
                <h1 className="mb-1">Trending Categories</h1>
                
              </div>
              <div className="col-md-auto">
              <Link to="/Espace_User/Allcourses"  className="d-flex align-items-center fw-medium">
                  Browse All
                  <div className="ms-2 d-flex">
                    {/* Icon */}
                    <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.7779 4.6098L3.32777 0.159755C3.22485 0.0567475 3.08745 0 2.94095 0C2.79445 0 2.65705 0.0567475 2.55412 0.159755L2.2264 0.487394C2.01315 0.700889 2.01315 1.04788 2.2264 1.26105L5.96328 4.99793L2.22225 8.73895C2.11933 8.84196 2.0625 8.97928 2.0625 9.1257C2.0625 9.27228 2.11933 9.4096 2.22225 9.51269L2.54998 9.84025C2.65298 9.94325 2.7903 10 2.9368 10C3.0833 10 3.2207 9.94325 3.32363 9.84025L7.7779 5.38614C7.88107 5.2828 7.93774 5.14484 7.93741 4.99817C7.93774 4.85094 7.88107 4.71305 7.7779 4.6098Z" fill="currentColor" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4">
              <div className="col mb-md-6 mb-4 px-2 px-md-4" data-aos="fade-up" data-aos-delay={50}>
                {/* Card */}
                <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Design")}`}  className="card icon-category border shadow-dark p-md-5 p-3 text-center lift">
                  {/* Image */}
                  <div className="position-relative text-light">
                    <div className="position-absolute bottom-0 right-0 left-0 icon-h-p">
                      <i className="fas fa-bezier-curve" />
                    </div>
                    {/* Icon BG */}
                    <svg width={116} height={82} viewBox="0 0 116 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9238 65.8391C11.9238 65.8391 20.4749 72.4177 35.0465 70.036C49.6182 67.6542 75.9897 78.4406 75.9897 78.4406C75.9897 78.4406 90.002 85.8843 104.047 79.2427C118.093 72.6012 115.872 58.8253 115.872 58.8253C115.743 56.8104 115.606 46.9466 97.5579 22.0066C91.0438 13.0024 84.1597 6.97958 75.9458 3.74641C58.8245 -2.99096 37.7881 -0.447684 22.9067 9.81852C15.5647 14.8832 7.65514 22.0695 3.0465 31.5007C-7.27017 52.6135 11.9238 65.8391 11.9238 65.8391Z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-0 pb-0 pt-6">
                    <h5 className="mb-0 line-clamp-1">Design</h5>
                    <p className="mb-0 line-clamp-1">Over {courses.reduce((count, course) => course.category.name === 'Design' ? count + 1 : count, 0) } Courses</p>
                  </div>
                  </Link>
              </div>
              <div className="col mb-md-6 mb-4 px-2 px-md-4" data-aos="fade-up" data-aos-delay={100}>
                {/* Card */}
                <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Business")}`}  className="card icon-category border shadow-dark p-md-5 p-3 text-center lift">
                  {/* Image */}
                  <div className="position-relative text-light">
                    <div className="position-absolute bottom-0 right-0 left-0 icon-h-p">
                      <i className="fas fa-briefcase" />
                    </div>
                    {/* Icon BG */}
                    <svg width={116} height={82} viewBox="0 0 116 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9238 65.8391C11.9238 65.8391 20.4749 72.4177 35.0465 70.036C49.6182 67.6542 75.9897 78.4406 75.9897 78.4406C75.9897 78.4406 90.002 85.8843 104.047 79.2427C118.093 72.6012 115.872 58.8253 115.872 58.8253C115.743 56.8104 115.606 46.9466 97.5579 22.0066C91.0438 13.0024 84.1597 6.97958 75.9458 3.74641C58.8245 -2.99096 37.7881 -0.447684 22.9067 9.81852C15.5647 14.8832 7.65514 22.0695 3.0465 31.5007C-7.27017 52.6135 11.9238 65.8391 11.9238 65.8391Z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-0 pb-0 pt-6">
                    <h5 className="mb-0 line-clamp-1">Business</h5>
                    <p className="mb-0 line-clamp-1">Over {courses.reduce((count, course) => course.category.name === 'Business' ? count + 1 : count, 0) } Courses</p>
                  </div>
                </Link>
              </div>
              <div className="col mb-md-6 mb-4 px-2 px-md-4" data-aos="fade-up" data-aos-delay={150}>
                {/* Card */}
                <Link to={`/Espace_User/Allcourses/${encodeURIComponent("SoftwareDevelopment")}`}  className="card icon-category border shadow-dark p-md-5 p-3 text-center lift">
                  {/* Image */}
                  <div className="position-relative text-light">
                    <div className="position-absolute bottom-0 right-0 left-0 icon-h-p">
                      <i className="fas fa-laptop-code" />
                    </div>
                    {/* Icon BG */}
                    <svg width={116} height={82} viewBox="0 0 116 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9238 65.8391C11.9238 65.8391 20.4749 72.4177 35.0465 70.036C49.6182 67.6542 75.9897 78.4406 75.9897 78.4406C75.9897 78.4406 90.002 85.8843 104.047 79.2427C118.093 72.6012 115.872 58.8253 115.872 58.8253C115.743 56.8104 115.606 46.9466 97.5579 22.0066C91.0438 13.0024 84.1597 6.97958 75.9458 3.74641C58.8245 -2.99096 37.7881 -0.447684 22.9067 9.81852C15.5647 14.8832 7.65514 22.0695 3.0465 31.5007C-7.27017 52.6135 11.9238 65.8391 11.9238 65.8391Z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-0 pb-0 pt-6">
                    <h5 className="mb-0 line-clamp-1">Software Development</h5>
                    <p className="mb-0 line-clamp-1">Over {courses.reduce((count, course) => course.category.name === 'SoftwareDevelopment' ? count + 1 : count, 0) } Courses</p>
                  </div>
                </Link>
              </div>
              <div className="col mb-md-6 mb-4 px-2 px-md-4" data-aos="fade-up" data-aos-delay={200}>
                {/* Card */}
                <Link to={`/Espace_User/Allcourses/${encodeURIComponent("PersonalDevelopment")}`} className="card icon-category border shadow-dark p-md-5 p-3 text-center lift">
                  {/* Image */}
                  <div className="position-relative text-light">
                    <div className="position-absolute bottom-0 right-0 left-0 icon-h-p">
                      <i className="far fa-file-alt" />
                    </div>
                    {/* Icon BG */}
                    <svg width={116} height={82} viewBox="0 0 116 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9238 65.8391C11.9238 65.8391 20.4749 72.4177 35.0465 70.036C49.6182 67.6542 75.9897 78.4406 75.9897 78.4406C75.9897 78.4406 90.002 85.8843 104.047 79.2427C118.093 72.6012 115.872 58.8253 115.872 58.8253C115.743 56.8104 115.606 46.9466 97.5579 22.0066C91.0438 13.0024 84.1597 6.97958 75.9458 3.74641C58.8245 -2.99096 37.7881 -0.447684 22.9067 9.81852C15.5647 14.8832 7.65514 22.0695 3.0465 31.5007C-7.27017 52.6135 11.9238 65.8391 11.9238 65.8391Z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-0 pb-0 pt-6">
                    <h5 className="mb-0 line-clamp-1">Personal Development</h5>
                    <p className="mb-0 line-clamp-1">Over {courses.reduce((count, course) => course.category.name === 'PersonalDevelopment' ? count + 1 : count, 0) } Courses</p>
                  </div>
                </Link>
              </div>
              <div className="col mb-md-6 mb-4 px-2 px-md-4" data-aos="fade-up" data-aos-delay={250}>
                {/* Card */}
                <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Photography")}`}  className="card icon-category border shadow-dark p-md-5 p-3 text-center lift">
                  {/* Image */}
                  <div className="position-relative text-light">
                    <div className="position-absolute bottom-0 right-0 left-0 icon-h-p">
                      <i className="fas fa-camera" />
                    </div>
                    {/* Icon BG */}
                    <svg width={116} height={82} viewBox="0 0 116 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9238 65.8391C11.9238 65.8391 20.4749 72.4177 35.0465 70.036C49.6182 67.6542 75.9897 78.4406 75.9897 78.4406C75.9897 78.4406 90.002 85.8843 104.047 79.2427C118.093 72.6012 115.872 58.8253 115.872 58.8253C115.743 56.8104 115.606 46.9466 97.5579 22.0066C91.0438 13.0024 84.1597 6.97958 75.9458 3.74641C58.8245 -2.99096 37.7881 -0.447684 22.9067 9.81852C15.5647 14.8832 7.65514 22.0695 3.0465 31.5007C-7.27017 52.6135 11.9238 65.8391 11.9238 65.8391Z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-0 pb-0 pt-6">
                    <h5 className="mb-0 line-clamp-1">Photography</h5>
                    <p className="mb-0 line-clamp-1">Over {courses.reduce((count, course) => course.category.name === 'Photography' ? count + 1 : count, 0) } Courses</p>
                  </div>
                </Link>
              </div>
              <div className="col mb-md-6 mb-4 px-2 px-md-4" data-aos="fade-up" data-aos-delay={300}>
                {/* Card */}
                <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Music")}`}  className="card icon-category border shadow-dark p-md-5 p-3 text-center lift">
                  {/* Image */}
                  <div className="position-relative text-light">
                    <div className="position-absolute bottom-0 right-0 left-0 icon-h-p">
                      <i className="fas fa-music" />
                    </div>
                    {/* Icon BG */}
                    <svg width={116} height={82} viewBox="0 0 116 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9238 65.8391C11.9238 65.8391 20.4749 72.4177 35.0465 70.036C49.6182 67.6542 75.9897 78.4406 75.9897 78.4406C75.9897 78.4406 90.002 85.8843 104.047 79.2427C118.093 72.6012 115.872 58.8253 115.872 58.8253C115.743 56.8104 115.606 46.9466 97.5579 22.0066C91.0438 13.0024 84.1597 6.97958 75.9458 3.74641C58.8245 -2.99096 37.7881 -0.447684 22.9067 9.81852C15.5647 14.8832 7.65514 22.0695 3.0465 31.5007C-7.27017 52.6135 11.9238 65.8391 11.9238 65.8391Z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-0 pb-0 pt-6">
                    <h5 className="mb-0 line-clamp-1">Audio + Music</h5>
                    <p className="mb-0 line-clamp-1">Over {courses.reduce((count, course) => course.category.name === 'Music' ? count + 1 : count, 0) } Courses</p>
                  </div>
                </Link>
              </div>
              <div className="col mb-md-6 mb-4 px-2 px-md-4" data-aos="fade-up" data-aos-delay={350}>
                {/* Card */}
                <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Marketing")}`}  className="card icon-category border shadow-dark p-md-5 p-3 text-center lift">
                  {/* Image */}
                  <div className="position-relative text-light">
                    <div className="position-absolute bottom-0 right-0 left-0 icon-h-p">
                      <i className="fas fa-bullhorn" />
                    </div>
                    {/* Icon BG */}
                    <svg width={116} height={82} viewBox="0 0 116 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9238 65.8391C11.9238 65.8391 20.4749 72.4177 35.0465 70.036C49.6182 67.6542 75.9897 78.4406 75.9897 78.4406C75.9897 78.4406 90.002 85.8843 104.047 79.2427C118.093 72.6012 115.872 58.8253 115.872 58.8253C115.743 56.8104 115.606 46.9466 97.5579 22.0066C91.0438 13.0024 84.1597 6.97958 75.9458 3.74641C58.8245 -2.99096 37.7881 -0.447684 22.9067 9.81852C15.5647 14.8832 7.65514 22.0695 3.0465 31.5007C-7.27017 52.6135 11.9238 65.8391 11.9238 65.8391Z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-0 pb-0 pt-6">
                    <h5 className="mb-0 line-clamp-1">Marketing</h5>
                    <p className="mb-0 line-clamp-1">Over {courses.reduce((count, course) => course.category.name === 'Marketing' ? count + 1 : count, 0) } Courses</p>
                  </div>
                </Link>
              </div>
              <div className="col mb-md-6 mb-4 px-2 px-md-4" data-aos="fade-up" data-aos-delay={400}>
                {/* Card */}
                <Link to={`/Espace_User/Allcourses/${encodeURIComponent("Finance")}`}  className="card icon-category border shadow-dark p-md-5 p-3 text-center lift">
                  {/* Image */}
                  <div className="position-relative text-light">
                    <div className="position-absolute bottom-0 right-0 left-0 icon-h-p">
                      <i className="fas fa-wallet" />
                    </div>
                    {/* Icon BG */}
                    <svg width={116} height={82} viewBox="0 0 116 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9238 65.8391C11.9238 65.8391 20.4749 72.4177 35.0465 70.036C49.6182 67.6542 75.9897 78.4406 75.9897 78.4406C75.9897 78.4406 90.002 85.8843 104.047 79.2427C118.093 72.6012 115.872 58.8253 115.872 58.8253C115.743 56.8104 115.606 46.9466 97.5579 22.0066C91.0438 13.0024 84.1597 6.97958 75.9458 3.74641C58.8245 -2.99096 37.7881 -0.447684 22.9067 9.81852C15.5647 14.8832 7.65514 22.0695 3.0465 31.5007C-7.27017 52.6135 11.9238 65.8391 11.9238 65.8391Z" fill="currentColor" />
                    </svg>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-0 pb-0 pt-6">
                    <h5 className="mb-0 line-clamp-1">Finance &amp; Accounting</h5>
                    <p className="mb-0 line-clamp-1">Over {courses.reduce((count, course) => course.category.name === 'Finance' ? count + 1 : count, 0) } Courses</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* VIDEO
    ================================================== */}
        <div className="center-y mt-n14 mt-md-n15">
        <div class="container pic-max">
        <a
       href="https://www.youtube.com/watch?v=Nlw6a-qhKEI&pp=ygULbTNhIGwzY2hyYW4%3D"
       className="pic-Af py-12 py-md-14 bg-cover rounded text-center d-block"
       style={{backgroundImage: 'url(../img/cover1.jpg)'}}
       data-aos="fade-up"
       data-fancybox
      >
                <div  class="btn h-90p w-90p size-30-all rounded-circle btn-white d-inline-flex align-items-center justify-content-center shadow lift text-dark">
                    <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8704 6.15374L3.42038 0.328572C2.73669 -0.0923355 1.9101 -0.109836 1.20919 0.281759C0.508282 0.673291 0.0898438 1.38645 0.0898438 2.18929V13.7866C0.0898438 15.0005 1.06797 15.9934 2.27016 16C2.27344 16 2.27672 16 2.27994 16C2.65563 16 3.04713 15.8822 3.41279 15.6591C3.70694 15.4796 3.79991 15.0957 3.62044 14.8016C3.44098 14.5074 3.05697 14.4144 2.76291 14.5939C2.59188 14.6982 2.42485 14.7522 2.27688 14.7522C1.82328 14.7497 1.33763 14.3611 1.33763 13.7866V2.18933C1.33763 1.84492 1.51713 1.53907 1.81775 1.3711C2.11841 1.20314 2.47294 1.21064 2.76585 1.39098L12.2159 7.21615C12.4999 7.39102 12.6625 7.68262 12.6618 8.01618C12.6611 8.34971 12.4974 8.64065 12.2118 8.81493L5.37935 12.9983C5.08548 13.1783 4.9931 13.5623 5.17304 13.8562C5.35295 14.1501 5.73704 14.2424 6.03092 14.0625L12.8625 9.87962C13.5166 9.48059 13.9081 8.78496 13.9096 8.01868C13.9112 7.25249 13.5226 6.55524 12.8704 6.15374Z" fill="currentColor"/>
                    </svg>
                </div>
            </a>
        </div>
 {/* / .container */}
        </div>
        {/* COUNTUP 
    ================================================== */}
        <div className="p-p-1 pt-md-15 pb-9 bg-white">
          <div className="container mt-5">
            <div className="row w-xl-80 mx-xl-auto text-center">
              <div className="col-md-3 mb-6 mb-md-0 newW" data-aos="fade-up" data-aos-delay={50}>
                <div className="h1">
                    <CountUp end={749} redraw={true}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </div>
                <p className="font-size-lg fw-medium mb-0">Creative Events</p>
              </div>
              <div className="col-md-3 mb-6 mb-md-0 newW" data-aos="fade-up" data-aos-delay={100}>
              <div className="h1">
                    <CountUp end={863} redraw={true}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </div>
                <p className="font-size-lg fw-medium mb-0">Skilled Tutors</p>
              </div>
              <div className="col-md-3 mb-6 mb-md-0 newW" data-aos="fade-up" data-aos-delay={150}>
  
                <div className="h1">
                <CountUp end={11} redraw={true}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                        k+</div>
                <p className="font-size-lg fw-medium mb-0">Online Courses</p>
              </div>
              <div className="col-md-3 mb-6 mb-md-0 newW" data-aos="fade-up" data-aos-delay={200}>
              <div className="h1">
                    <CountUp end={3} redraw={true}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
           
                k+</div>
                <p className="font-size-lg fw-medium mb-0">People Worldwide</p>
              </div>
            </div>
          </div>
        </div>
        {/* BLOG
    ================================================== */}
        <section className="bg-white py-5 py-md-11">
          <div className="container">
            <div className="row align-items-end mb-4 mb-md-7" data-aos="fade-up">
              <div className="col-md mb-4 mb-md-0">
                <h1 className="mb-1">Latest News</h1>
              </div>
              <div className="col-md-auto">
              <Link to="/Espace_User/LatestCours" className="d-flex align-items-center fw-medium">
                  Browse All
                  <div className="ms-2 d-flex">
                    {/* Icon */}
                    <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.7779 4.6098L3.32777 0.159755C3.22485 0.0567475 3.08745 0 2.94095 0C2.79445 0 2.65705 0.0567475 2.55412 0.159755L2.2264 0.487394C2.01315 0.700889 2.01315 1.04788 2.2264 1.26105L5.96328 4.99793L2.22225 8.73895C2.11933 8.84196 2.0625 8.97928 2.0625 9.1257C2.0625 9.27228 2.11933 9.4096 2.22225 9.51269L2.54998 9.84025C2.65298 9.94325 2.7903 10 2.9368 10C3.0833 10 3.2207 9.94325 3.32363 9.84025L7.7779 5.38614C7.88107 5.2828 7.93774 5.14484 7.93741 4.99817C7.93774 4.85094 7.88107 4.71305 7.7779 4.6098Z" fill="currentColor" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row row-cols-md-2 row-cols-lg-3neww">
            {courses.slice(0, 6).sort((a, b) => new Date(b.date) - new Date(a.date)).map(course => (
              <div className="col-md mb-5 mb-lg-0">
                {/* Card */}
                <div className="card border shadow p-2 lift sk-fade">
                  {/* Image */}
                  <div className="card-zoom position-relative">
                  <Link to={`/Espace_User/CourseSingle/${course.id}`} className="card-img d-block sk-thumbnail img-ratio-3">
                      <img className="rounded shadow-light-lg img-fluid" src={`http://127.0.0.1:8000/images/${course.image}`}   alt="..." />
                      </Link>
                      <Link to={`/Espace_User/CourseSingle/${course.id}`} className="badge sk-fade-bottom badge-lg badge-purple badge-pill badge-float bottom-0 left-0 mb-4 ms-4 px-5 me-4">
                      <span className="text-white fw-normal font-size-sm">{course.category.name}</span>
                    </Link>
                  </div>
                  {/* Footer */}
                  <div className="card-footer px-2 pb-0 pt-4">
                    <ul className="nav mx-n3 mb-3">
                      <li className="nav-item px-3">
                        <div className="d-flex align-items-center text-gray-800">
                        <div className="me-3 d-flex">
                            {/* Icon */}
                            <svg width={15} height={15} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.8102 9.52183C13.313 9.08501 12.7102 8.70758 12.0181 8.40008C11.7223 8.2687 11.3761 8.40191 11.2447 8.69762C11.1134 8.99334 11.2466 9.33952 11.5423 9.47102C12.1258 9.73034 12.6287 10.0436 13.0367 10.4021C13.5396 10.8441 13.8281 11.484 13.8281 12.1582V13.2422C13.8281 13.5653 13.5653 13.8281 13.2422 13.8281H1.75781C1.43475 13.8281 1.17188 13.5653 1.17188 13.2422V12.1582C1.17188 11.484 1.46038 10.8441 1.96335 10.4021C2.55535 9.88186 4.2802 8.67188 7.5 8.67188C9.89079 8.67188 11.8359 6.72672 11.8359 4.33594C11.8359 1.94515 9.89079 0 7.5 0C5.10921 0 3.16406 1.94515 3.16406 4.33594C3.16406 5.7336 3.82896 6.97872 4.85893 7.77214C2.97432 8.18642 1.80199 8.98384 1.18984 9.52183C0.433731 10.1862 0 11.147 0 12.1582V13.2422C0 14.2115 0.788498 15 1.75781 15H13.2422C14.2115 15 15 14.2115 15 13.2422V12.1582C15 11.147 14.5663 10.1862 13.8102 9.52183ZM4.33594 4.33594C4.33594 2.59129 5.75535 1.17188 7.5 1.17188C9.24465 1.17188 10.6641 2.59129 10.6641 4.33594C10.6641 6.08059 9.24465 7.5 7.5 7.5C5.75535 7.5 4.33594 6.08059 4.33594 4.33594Z" fill="currentColor" />
                            </svg>
                          </div>
                          <div className="font-size-sm">{course.category.name}</div>
                        </div>
                      </li>
                      <li className="nav-item px-3">
                        <div className="d-flex align-items-center text-gray-800">
                          <div className="me-2 d-flex">
                            {/* Icon */}
                            <svg width={15} height={15} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.0664 1.17188H11.7188V0.46875C11.7188 0.209883 11.5089 0 11.25 0C10.9911 0 10.7812 0.209883 10.7812 0.46875V1.17188H4.21875V0.46875C4.21875 0.209883 4.0089 0 3.75 0C3.4911 0 3.28125 0.209883 3.28125 0.46875V1.17188H1.93359C0.867393 1.17188 0 2.03927 0 3.10547V13.0664C0 14.1326 0.867393 15 1.93359 15H13.0664C14.1326 15 15 14.1326 15 13.0664V3.10547C15 2.03927 14.1326 1.17188 13.0664 1.17188ZM1.93359 2.10938H3.28125V2.57812C3.28125 2.83699 3.4911 3.04688 3.75 3.04688C4.0089 3.04688 4.21875 2.83699 4.21875 2.57812V2.10938H10.7812V2.57812C10.7812 2.83699 10.9911 3.04688 11.25 3.04688C11.5089 3.04688 11.7188 2.83699 11.7188 2.57812V2.10938H13.0664C13.6157 2.10938 14.0625 2.55621 14.0625 3.10547V4.21875H0.9375V3.10547C0.9375 2.55621 1.38434 2.10938 1.93359 2.10938ZM13.0664 14.0625H1.93359C1.38434 14.0625 0.9375 13.6157 0.9375 13.0664V5.15625H14.0625V13.0664C14.0625 13.6157 13.6157 14.0625 13.0664 14.0625Z" fill="currentColor" />
                            </svg>
                          </div>
                          <div className="font-size-sm">{new Date(course.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        </div>
                      </li>
                    </ul>
                    {/* Heading */}
                    <div className="d-block"><h5 className="line-clamp-2 h-48 h-lg-52">{course.title}</h5></div>
                    <div className="row mx-n2 align-items-end mh-50">
                        <div className="col px-2">
                          <ul className="nav mx-n3">
                            <li className="nav-item px-3">
                              <div className="d-flex align-items-center">
                                <div className="me-2 d-flex icon-uxs text-secondary">
                                  {/* Icon */}
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.1947 7.06802L14.6315 7.9985C14.2476 7.31186 13.712 6.71921 13.0544 6.25992C12.8525 6.11877 12.6421 5.99365 12.4252 5.88303C13.0586 5.25955 13.452 4.39255 13.452 3.43521C13.452 1.54098 11.9124 -1.90735e-06 10.0197 -1.90735e-06C8.12714 -1.90735e-06 6.58738 1.54098 6.58738 3.43521C6.58738 4.39255 6.98075 5.25955 7.61414 5.88303C7.39731 5.99365 7.1869 6.11877 6.98502 6.25992C6.32752 6.71921 5.79178 7.31186 5.40787 7.9985L2.8447 7.06802C2.33612 6.88339 1.79688 7.26044 1.79688 7.80243V16.5178C1.79688 16.8465 2.00256 17.14 2.31155 17.2522L9.75312 19.9536C9.93073 20.018 10.1227 20.0128 10.2863 19.9536L17.7278 17.2522C18.0368 17.14 18.2425 16.8465 18.2425 16.5178V7.80243C18.2425 7.26135 17.704 6.88309 17.1947 7.06802ZM10.0197 1.5625C11.0507 1.5625 11.8895 2.40265 11.8895 3.43521C11.8895 4.46777 11.0507 5.30792 10.0197 5.30792C8.98866 5.30792 8.14988 4.46777 8.14988 3.43521C8.14988 2.40265 8.98866 1.5625 10.0197 1.5625ZM9.23844 18.1044L3.35938 15.9703V8.91724L9.23844 11.0513V18.1044ZM10.0197 9.67255L6.90644 8.54248C7.58164 7.51892 8.75184 6.87042 10.0197 6.87042C11.2875 6.87042 12.4577 7.51892 13.1329 8.54248L10.0197 9.67255ZM16.68 15.9703L10.8009 18.1044V11.0513L16.68 8.91724V15.9703Z" fill="currentColor" />
                                  </svg>
                                </div>
                                <div className="font-size-sm">{course.lessons} lessons</div>
                              </div>
                            </li>
                            <li className="nav-item px-3">
                              <div className="d-flex align-items-center">
                                <div className="me-2 d-flex icon-uxs text-secondary">
                                  {/* Icon */}
                                  <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.3164 4.20996C13.985 4.37028 13.8464 4.76904 14.0067 5.10026C14.4447 6.00505 14.6667 6.98031 14.6667 8C14.6667 11.6759 11.6759 14.6667 8 14.6667C4.32406 14.6667 1.33333 11.6759 1.33333 8C1.33333 4.32406 4.32406 1.33333 8 1.33333C9.52328 1.33333 10.9543 1.83073 12.1387 2.77165C12.4259 3.00098 12.846 2.95296 13.0754 2.66471C13.3047 2.37663 13.2567 1.95703 12.9683 1.72803C11.5661 0.613607 9.8016 0 8 0C3.58903 0 0 3.58903 0 8C0 12.411 3.58903 16 8 16C12.411 16 16 12.411 16 8C16 6.77767 15.7331 5.60628 15.2067 4.51969C15.0467 4.18766 14.6466 4.04932 14.3164 4.20996Z" fill="currentColor" />
                                    <path d="M7.99967 2.66663C7.63167 2.66663 7.33301 2.96529 7.33301 3.33329V7.99996C7.33301 8.36796 7.63167 8.66663 7.99967 8.66663H11.333C11.701 8.66663 11.9997 8.36796 11.9997 7.99996C11.9997 7.63196 11.701 7.33329 11.333 7.33329H8.66634V3.33329C8.66634 2.96529 8.36768 2.66663 7.99967 2.66663Z" fill="currentColor" />
                                  </svg>
                                </div> 
                                <div className="font-size-sm">{course.duration}</div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-auto px-2 text-right">
                          <ins className="h4 mb-0 d-block mb-lg-n1">${course.price}</ins>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            ))};
            </div>
          </div>
        </section>
        {/* FOOTER
    ================================================== */}
        <Footer/>
      </div>
    );
}

export default Index 

