import React ,{useState, useEffect} from 'react'
import './Institut.css'
import './styleAll.css'
import NavBar from './NavBar'
import Footer from './Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from '../../function/useAuth';
import axios from "axios";
import { Link } from 'react-router-dom';

const Institut = () => {
  const [formations, setformatoin] = useState([]);
  const token = localStorage.getItem('token');
    useAuth();
  useEffect(() => {
    AOS.init({
    });
  }, []);
  useEffect(() => {
    // Fetch the courses from the API
    axios.get('http://127.0.0.1:8000/api/formations' , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setformatoin(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
            <div>
                <NavBar/>
              {/* FEATURE GENERAL
          ==================================================  */}
              <section className="py-5 pt-md-11 pb-md-13 pb-xl-15 bg-white">
                <div className="container pb-md-5">
                  <div className="row align-items-center">
                    <div className="col-lg-6 mb-6 mb-lg-0">
                      <img className="img-fluid rounded" src="../assets/img/covers/cover-17.jpg" alt="..." />
                    </div>
                    <div className="col-lg-6">
                      <div className="ms-xl-5">
                        <h1 className="font-lora fw-bold text-black mb-4">Welcome to New Generation</h1>
                        <p className="mb-5 line-height-lg">At our institute, we are dedicated to providing a dynamic and forward-thinking educational experience. We believe in nurturing the talents and potential of each individual student, empowering them to thrive in an ever-evolving world.
                          At New Generation, we prioritize innovation and excellence in education. Our experienced and passionate faculty members are committed to delivering high-quality instruction, leveraging the latest teaching methodologies and technologies. We foster a stimulating and inclusive learning environment that encourages creativity, critical thinking, and collaboration..</p>
                        <ul className="mb-6 ps-4">
                          <li className="mb-5">Creative Study Pattern</li>
                          <li className="mb-5">Quick Crash Courses</li>
                          <li className="mb-5">Certification Awarded</li>
                          <li className="mb-5">Provided with Experimental Examples</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* FEATURES
          ================================================== */}
              <section className="py-8 py-lg-0 mt-lg-n10 mt-xl-n13 z-index-0 position-relative">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 mb-6 mb-lg-0">
                      {/* Card */}
                      <div className="card px-6 py-5 px-md-7 py-md-6 shadow lift bg-mongoose">
                        <div className="mb-4 text-white icon-45">
                          {/* Icon */}
                          <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.416 40H6.24935C3.72102 40 1.66602 37.945 1.66602 35.4167V4.58333C1.66602 2.055 3.72102 0 6.24935 0H32.0827C32.7727 0 33.3327 0.56 33.3327 1.25V6.66667H35.416C36.106 6.66667 36.666 7.22667 36.666 7.91667V38.75C36.666 39.44 36.106 40 35.416 40ZM4.16602 8.665V35.4167C4.16602 36.565 5.10102 37.5 6.24935 37.5H34.166V9.16667H6.24935C5.49935 9.16667 4.79102 8.98667 4.16602 8.665ZM6.24935 2.5C5.10102 2.5 4.16602 3.435 4.16602 4.58333C4.16602 5.73167 5.10102 6.66667 6.24935 6.66667H30.8327V2.5H6.24935Z" fill="currentColor" />
                            <path d="M20.4173 31.6665C20.189 31.6665 19.964 31.6048 19.7606 31.4815L15.0006 28.5515L10.2407 31.4815C9.85398 31.7198 9.37232 31.7282 8.97398 31.5082C8.57732 31.2865 8.33398 30.8682 8.33398 30.4165V7.9165H10.834V28.1798L14.344 26.0198C14.7473 25.7732 15.2523 25.7732 15.6556 26.0198L19.1656 28.1798V7.9165H21.6673V30.4165C21.6673 30.8682 21.424 31.2865 21.0273 31.5082C20.8373 31.6132 20.6273 31.6665 20.4173 31.6665Z" fill="currentColor" />
                          </svg>
                        </div>
                        <h2 className="font-size-xxl text-white font-lora mb-5 fw-bold">NEW GENERATION ?</h2>
                        <p className="font-montserrat text-capitalize line-clamp-3 mb-7 text-white font-size-sm line-height-md">Discover limitless possibilities at New Generation! Our institute offers a transformative educational experience .</p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-6 mb-lg-0">
                      {/* Card */}
                      <div className="card px-6 py-5 px-md-7 py-md-6 shadow lift">
                        <div className="mb-4 text-biscay icon-45">
                          {/* Icon */}
                          <svg width={45} height={45} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5292 21.3608C24.1425 21.3608 25.4549 20.0484 25.4549 18.435C25.4549 16.8218 24.1425 15.5093 22.5292 15.5093C20.916 15.5093 19.6035 16.8218 19.6035 18.435C19.6035 20.0484 20.916 21.3608 22.5292 21.3608ZM22.5292 17.2672C23.1732 17.2672 23.6971 17.7911 23.6971 18.435C23.6971 19.079 23.1732 19.603 22.5292 19.603C21.8853 19.603 21.3613 19.0791 21.3613 18.435C21.3613 17.791 21.8852 17.2672 22.5292 17.2672Z" fill="currentColor" />
                            <path d="M44.1211 43.2422H41.359V29.6367H44.0908C44.4383 29.6367 44.7532 29.4319 44.8942 29.1143C45.0352 28.7967 44.9757 28.4258 44.7425 28.1681L40.0994 23.0367C39.9328 22.8525 39.696 22.7474 39.4477 22.7474H35.0561V18.0027H36.0644C36.5498 18.0027 36.9433 17.6092 36.9433 17.1238V13.6978C36.9433 13.2123 36.5498 12.8188 36.0644 12.8188H31.8015L23.3933 6.99161V5.69566H27.8975C28.3829 5.69566 28.7764 5.30218 28.7764 4.81676V0.878906C28.7764 0.393486 28.3829 0 27.8975 0H22.5143C22.0289 0 21.6354 0.393486 21.6354 0.878906V6.99161L13.2274 12.8189H8.7598C8.27437 12.8189 7.88089 13.2124 7.88089 13.6978V17.1239C7.88089 17.6093 8.27437 18.0028 8.7598 18.0028H9.97269V22.7475H5.60988C5.3615 22.7475 5.12481 22.8525 4.95817 23.0367L0.315088 28.1681C0.0819141 28.4258 0.0225 28.7966 0.163389 29.1143C0.304365 29.4319 0.619277 29.6367 0.966797 29.6367H3.69861V43.2422H0.878906C0.393486 43.2422 0 43.6357 0 44.1211C0 44.6065 0.393486 45 0.878906 45H44.1211C44.6064 45 45 44.6065 45 44.1211C45 43.6357 44.6064 43.2422 44.1211 43.2422ZM42.1102 27.8789H31.7655V24.5053H39.0577L42.1102 27.8789ZM31.7655 33.6109H34.8044V36.6498H31.7655V33.6109ZM27.0186 3.93785H23.3933V1.75781H27.0186V3.93785ZM9.6387 14.5767H13.5022C13.6811 14.5767 13.8558 14.5221 14.0028 14.4201L22.5143 8.52117L31.0259 14.4201C31.173 14.5221 31.3476 14.5767 31.5265 14.5767H35.1854V16.2449H30.1731L23.02 11.2121C22.7167 10.9986 22.3119 10.9986 22.0085 11.2121L14.8554 16.2449H9.63853V14.5767H9.6387ZM5.99994 24.5053H13.2921V27.8789H2.94741L5.99994 24.5053ZM13.2921 36.6498H10.2531V33.6109H13.2921V36.6498ZM5.45643 29.6367H13.2921V31.8531H9.37424C8.88882 31.8531 8.49533 32.2465 8.49533 32.732V37.5287C8.49533 38.0141 8.88882 38.4076 9.37424 38.4076H13.2921V43.2422H5.45643V29.6367ZM15.0499 24.5053H18.6775C19.1629 24.5053 19.5564 24.1118 19.5564 23.6264C19.5564 23.141 19.1629 22.7475 18.6775 22.7475H11.7304V18.0028H15.1337C15.3148 18.0028 15.4914 17.9469 15.6394 17.8428L22.5142 13.0057L29.3891 17.8428C29.5372 17.9469 29.7138 18.0028 29.8949 18.0028H33.2982V22.7475H26.4185C25.9332 22.7475 25.5396 23.141 25.5396 23.6264C25.5396 24.1118 25.9332 24.5053 26.4185 24.5053H30.0076V43.2422H27.2089V34.0658C27.2089 31.604 25.2061 29.6012 22.7442 29.6012C20.2824 29.6012 18.2797 31.6041 18.2797 34.0658V43.2422H15.0498V24.5053H15.0499ZM20.0376 43.2422V34.0658C20.0376 32.5732 21.2518 31.359 22.7443 31.359C24.2369 31.359 25.4512 32.5732 25.4512 34.0658V43.2422H20.0376ZM31.7655 43.2422V38.4076H35.6833C36.1687 38.4076 36.5622 38.0141 36.5622 37.5287V32.732C36.5622 32.2465 36.1687 31.8531 35.6833 31.8531H31.7655V29.6367H39.6011V43.2422H31.7655Z" fill="currentColor" />
                            <path d="M23.3395 23.2902C23.0377 22.5658 21.9671 22.5879 21.7007 23.3302C21.5743 23.6822 21.6918 24.09 21.9878 24.3192C22.2741 24.5409 22.6738 24.5648 22.9837 24.3776C23.3496 24.1566 23.504 23.685 23.3395 23.2902Z" fill="currentColor" />
                          </svg>
                        </div>
                        <h2 className="font-size-xxl font-lora mb-5 fw-bold text-biscay">Diverse Programs </h2>
                        <p className="font-montserrat text-capitalize line-clamp-3 mb-7 font-size-sm line-height-md"> We offer a wide range of programs across various disciplines, catering to diverse interests and career aspirations. </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-6 mb-lg-0">
                      {/* Card */}
                      <div className="card px-6 py-5 px-md-7 py-md-6 shadow lift bg-biscay">
                        <div className="mb-4 text-white icon-45">
                          {/* Icon */}
                          <svg width={40} height={40} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.3177 5.02078H29.9584V1.17188C29.9584 0.524687 29.4337 0 28.7865 0H1.17188C0.524687 0 0 0.524687 0 1.17188V33.8073C0 37.222 2.77805 40 6.19273 40C6.19273 40 25.6601 40.0001 33.8073 40.0001C37.2274 40 40 37.2274 40 33.8073V8.70305C40 6.67266 38.3481 5.02078 36.3177 5.02078ZM32.8852 7.36453C32.7212 7.78547 32.6355 8.23766 32.6355 8.70312V12.5521H29.9584V7.36461H32.8852V7.36453ZM6.19273 37.6562C4.07039 37.6562 2.34375 35.9296 2.34375 33.8073V2.34375H27.6146V33.8073C27.6146 35.2623 28.1177 36.5992 28.9578 37.6562H6.19273ZM37.6562 33.8073C37.6562 35.933 35.933 37.6562 33.8073 37.6562C32.0902 37.6562 30.6363 36.5317 30.1405 34.9791H33.8073C34.4545 34.9791 34.9791 34.4545 34.9791 33.8073C34.9791 33.1601 34.4545 32.6354 33.8073 32.6354H29.9583V29.9583H33.8073C34.4545 29.9583 34.9791 29.4336 34.9791 28.7864C34.9791 28.1392 34.4545 27.6145 33.8073 27.6145H29.9583V24.9374H33.8073C34.4545 24.9374 34.9791 24.4127 34.9791 23.7655C34.9791 23.1184 34.4545 22.5937 33.8073 22.5937H29.9583V19.9166H33.8073C34.4545 19.9166 34.9791 19.3919 34.9791 18.7447C34.9791 18.0975 34.4545 17.5728 33.8073 17.5728H29.9583V14.8957H33.8073C34.4545 14.8957 34.9791 14.371 34.9791 13.7238V8.70312C34.9791 7.97195 35.5703 7.36453 36.3177 7.36453C37.0557 7.36453 37.6562 7.96508 37.6562 8.70312V33.8073H37.6562Z" fill="currentColor" />
                            <path d="M23.7643 5.02081H6.19141C5.54422 5.02081 5.01953 5.5455 5.01953 6.19269C5.01953 6.83988 5.54422 7.36456 6.19141 7.36456H23.7643C24.4115 7.36456 24.9362 6.83988 24.9362 6.19269C24.9362 5.5455 24.4115 5.02081 23.7643 5.02081Z" fill="currentColor" />
                            <path d="M23.7663 22.5937H17.4902C16.843 22.5937 16.3184 23.1184 16.3184 23.7656C16.3184 24.4128 16.843 24.9374 17.4902 24.9374H23.7663C24.4134 24.9374 24.9381 24.4128 24.9381 23.7656C24.9381 23.1184 24.4134 22.5937 23.7663 22.5937Z" fill="currentColor" />
                            <path d="M12.4674 22.5937H6.19141C5.54422 22.5937 5.01953 23.1184 5.01953 23.7656C5.01953 24.4128 5.54422 24.9374 6.19141 24.9374H12.4674C13.1146 24.9374 13.6393 24.4128 13.6393 23.7656C13.6393 23.1184 13.1146 22.5937 12.4674 22.5937Z" fill="currentColor" />
                            <path d="M23.7663 32.6354H17.4902C16.843 32.6354 16.3184 33.1601 16.3184 33.8073C16.3184 34.4544 16.843 34.9791 17.4902 34.9791H23.7663C24.4134 34.9791 24.9381 34.4544 24.9381 33.8073C24.9381 33.1601 24.4134 32.6354 23.7663 32.6354Z" fill="currentColor" />
                            <path d="M12.4674 32.6354H6.19141C5.54422 32.6354 5.01953 33.1601 5.01953 33.8073C5.01953 34.4544 5.54422 34.9791 6.19141 34.9791H12.4674C13.1146 34.9791 13.6393 34.4544 13.6393 33.8073C13.6393 33.1601 13.1146 32.6354 12.4674 32.6354Z" fill="currentColor" />
                            <path d="M23.7663 27.6145H17.4902C16.843 27.6145 16.3184 28.1392 16.3184 28.7864C16.3184 29.4336 16.843 29.9583 17.4902 29.9583H23.7663C24.4134 29.9583 24.9381 29.4336 24.9381 28.7864C24.9381 28.1392 24.4134 27.6145 23.7663 27.6145Z" fill="currentColor" />
                            <path d="M12.4674 27.6145H6.19141C5.54422 27.6145 5.01953 28.1392 5.01953 28.7864C5.01953 29.4336 5.54422 29.9583 6.19141 29.9583H12.4674C13.1146 29.9583 13.6393 29.4336 13.6393 28.7864C13.6393 28.1392 13.1146 27.6145 12.4674 27.6145Z" fill="currentColor" />
                            <path d="M23.7643 10.0416H6.19141C5.54422 10.0416 5.01953 10.5663 5.01953 11.2134V18.7447C5.01953 19.3919 5.54422 19.9166 6.19141 19.9166H23.7643C24.4115 19.9166 24.9362 19.3919 24.9362 18.7447V11.2134C24.9362 10.5663 24.4115 10.0416 23.7643 10.0416ZM22.5924 17.5729H7.36328V12.3854H22.5924V17.5729Z" fill="currentColor" />
                          </svg>
                        </div>
                        <h2 className="font-size-xxl text-white font-lora mb-5 fw-bold">Expert Faculty</h2>
                        <p className="font-montserrat text-capitalize line-clamp-3 mb-7 text-white font-size-sm line-height-md">Our experienced faculty members are passionate about teaching and dedicated to your success. </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
      {/* EVENTS
    ================================================== */}
      <section className="bg-white py-5 py-md-8">
        <div className="container container-wd">
          <div className="row align-items-end mb-4 mb-md-7">
            <div className="col-md mb-4 mb-md-0">
              <h1 className="mb-1">Upcoming Events</h1>
            </div>
            <div className="col-md-auto">
            <Link to="/Espace_User/AllFormation" className="d-flex align-items-center fw-medium">
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
          <div className="row row-cols-xl-2">
            {formations.slice(0, 6).sort((a, b) => new Date(b.date) - new Date(a.date)).map(formation => (
            <div className="col-xl mb-5 mb-md-6" key={formation.id}>
              {/* Card */}
              <div className="card border shadow p-2 lift">
                <div className="row gx-0 align-items-center">
                  {/* Image */}
                  <Link to={`/Espace_User/FormationSingle/${formation.id}`}   className="col-auto d-block mw-md-152" style={{maxWidth: '120px'}}>
                    <img className="img-fluid rounded shadow-light-lg h-100 h-md-auto o-f-c"  src={`http://127.0.0.1:8000/images/${formation.image}`} alt="..." />
                  </Link>
                  {/* Body */}
                  <div className="col">
                    <div className="card-body py-0 px-md-5 px-3">
                      <Link to={`/Espace_User/FormationSingle/${formation.id}`}   className="d-block mb-2"><h5 className="line-clamp-2 h-xl-52">{formation.title}</h5></Link>
                      <ul className="nav mx-n3 d-block d-md-flex">
                        <li className="nav-item px-3 mb-3 mb-md-0">
                          <div className="d-flex align-items-center">
                            <div className="me-2 d-flex text-secondary icon-uxs">
                              {/* Icon */}
                              <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3164 4.20996C13.985 4.37028 13.8464 4.76904 14.0067 5.10026C14.4447 6.00505 14.6667 6.98031 14.6667 8C14.6667 11.6759 11.6759 14.6667 8 14.6667C4.32406 14.6667 1.33333 11.6759 1.33333 8C1.33333 4.32406 4.32406 1.33333 8 1.33333C9.52328 1.33333 10.9543 1.83073 12.1387 2.77165C12.4259 3.00098 12.846 2.95296 13.0754 2.66471C13.3047 2.37663 13.2567 1.95703 12.9683 1.72803C11.5661 0.613607 9.8016 0 8 0C3.58903 0 0 3.58903 0 8C0 12.411 3.58903 16 8 16C12.411 16 16 12.411 16 8C16 6.77767 15.7331 5.60628 15.2067 4.51969C15.0467 4.18766 14.6466 4.04932 14.3164 4.20996Z" fill="currentColor" />
                                <path d="M7.99967 2.66663C7.63167 2.66663 7.33301 2.96529 7.33301 3.33329V7.99996C7.33301 8.36796 7.63167 8.66663 7.99967 8.66663H11.333C11.701 8.66663 11.9997 8.36796 11.9997 7.99996C11.9997 7.63196 11.701 7.33329 11.333 7.33329H8.66634V3.33329C8.66634 2.96529 8.36768 2.66663 7.99967 2.66663Z" fill="currentColor" />
                              </svg>
                            </div>
                            <div className="font-size-sm">{formation.time}</div>
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
                            <div className="font-size-sm">{formation.location}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Link to={`/Espace_User/FormationSingle/${formation.id}`}   className="col-auto rounded-lg d-none d-md-flex w-100p h-100p place-center bg-dark me-5">
                    <div className="w-100 text-center">
                      <h3 className="text-white mb-0 fw-semi-bold font-size-xxl">{new Date(formation.date).toLocaleDateString('en-US', { day: 'numeric' })}</h3>
                      <span className="h4 mb-0 text-white fw-normal">{new Date(formation.date).toLocaleDateString('en-US', { month: 'long'})}</span>
                    </div>
                    </Link>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

              {/* FEATURES GENERAL
          ================================================== */}
              <section className="py-5 py-md-8 bg-white">
                <div className="container container-wd">
                  <div className="row align-items-center mb-6">
                    <div className="col-md-6Neww order-2" data-aos="fade-left" data-aos-duration="800">
                      <h2>Cutting-edge Education</h2>
                      <p className="line-clamp-3 line-height-md">At New Generation, we embrace innovation and stay at the forefront of educational advancements. Our curriculum is designed to equip you with the skills and knowledge needed to thrive in today's rapidly changing world..</p>
                    </div>
                    <div className="col-md-6Neww  order-1 mb-8 mb-md-0" data-aos="fade-up-right" data-aos-duration="800">
                      <img className="img-fluid" src="../assets/img/post/post-10.png" alt="..." />
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6Neww  order-2 order-md-1" data-aos="fade-right" data-aos-duration="2000">
                      <h2>Future Opportunities</h2>
                      <p className="line-clamp-3 line-height-md">Studying at New Generation opens doors to exciting future opportunities. Our institute has a strong network of industry connections, internships, and career services, helping you launch a successful career or pursue further education.</p>
                    </div>
                    <div className="col-md-6Neww  order-1 mb-8 mb-md-0 order-md-2 text-right" data-aos="zoom-in" data-aos-duration="2000">
                      <img className="img-fluid" src="../assets/img/post/post-11.png" alt="..." />
                    </div>
                  </div>
                </div>
              </section>
              <Footer/>
            </div>
  )}
  
export default Institut