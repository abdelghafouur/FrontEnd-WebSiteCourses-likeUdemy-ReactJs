import React, { useState,useEffect }  from 'react'
import './LatestCours.css'
import './styleAll.css'
import NavBar from './NavBar'
import Footer from './Footer'
import useAuth from '../../function/useAuth';
import axios from "axios";
import { Link } from 'react-router-dom';

const AllFormation = () => {
  useAuth();
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrices] = useState([]);
  const [selectedDate, setSelectedDate] = useState("default");
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch all courses from the backend API
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/formations', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        setFiltered(data);
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/categories', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterButtonClick = () => {
    // Filter courses based on selected categories and ratings
    let filtered = courses;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) => selectedCategories.includes(course.category_id.toString()));
    }

    if (selectedPrice.length > 0) {
      if(selectedPrice == "Latest" )
        {
          filtered = filtered.sort((a, b) => a.price - b.price)
        }
      if(selectedPrice == "News" )
        {
          filtered = filtered.sort((a, b) => b.price - a.price)
        }
      setSelectedPrices("")
    }
    setFiltered(filtered);
    setCurrentPage(0);
  };
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((prevCategory) => prevCategory !== category)
      );
    }
  };

  const handlePriceChange = (event) => {
      setSelectedPrices(event.target.value);
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleDateChange = (event) => {
          if(event.target.value == "new_courses" )
            {
              setFiltered(currentFormations.sort((a, b) => new Date(b.date) - new Date(a.date)));
            }
          if(event.target.value == "last_courses" )
            {
              setFiltered( currentFormations.sort((a, b) => new Date(a.date) - new Date(b.date)));
            }
    setSelectedDate(event.target.value)
};
    // Pagination
    const indexOfLastFormation = (currentPage + 1) * perPage;
    const indexOfFirstFormation = indexOfLastFormation - perPage;
    const currentFormations = filtered.slice(indexOfFirstFormation, indexOfLastFormation);
  
    const pageCount = Math.ceil(filtered.length / perPage);
  
    const pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i);
    }
  return (
            <div>
                <NavBar/>
              {/* PAGE TITLE
          ================================================== */}
              <header className="py-8 py-md-11" style={{backgroundImage: 'none'}}>
                <div className="container text-center py-xl-2">
                  <h1 className="display-4 fw-semi-bold mb-0">All Formations </h1>
                </div>
              </header>
              {/* CONTROL BAR
          ================================================== */}
              <div className="container mb-6 mb-xl-8 z-index-2">
                <div className="d-lg-flex align-items-center mb-6 mb-xl-0 ffr">
                  <div className="ms-lg-auto d-lg-flex flex-wrap">
                    <div className="mb-4 mb-lg-0 ms-lg-6 cls-Sel ffr">
                      <div className="border rounded d-flex align-items-center choices-label h-50p">
                        <span className="ps-5 sortBy">Sort by:</span>
                        <select
                        className="form-select form-select-sm text-dark border-0 ps-1 bg-transparent flex-grow-1 shadow-none dropdown-menu-end"
                        data-choices
                        value={selectedDate}
                        onChange={handleDateChange} // Add the change event handler
                      >
                        <option value="default">Default</option>
                        <option value="new_courses">New Courses</option>
                        <option value="last_courses">Last Courses</option>
                      </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* COURSE
          ================================================== */}
              <div className="container clrB">
                <div className="row">
                  <div className="col-xl-4 mb-5 mb-xl-0">
                    {/* SIDEBAR FILTER
                      ================================================== */}
                    <div className=" vertical-scroll" id="courseSidebar">
                      <div className="border rounded mb-6 ">
                        {/* Heading */}
                      <div id="coursefilter1">
                        <h4 className="mb-0">
                          <button className="p-6 text-dark fw-medium d-flex align-items-center collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#coursefiltercollapse1" aria-expanded="true" aria-controls="coursefiltercollapse1">
                            Category
                            <span className="ms-auto text-dark d-flex">
                              {/* Icon */}
                              <svg width={15} height={2} viewBox="0 0 15 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width={15} height={2} fill="currentColor" />
                              </svg>
                              <svg width={15} height={16} viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 7H15V9H0V7Z" fill="currentColor" />
                                <path d="M6 16L6 8.74228e-08L8 0L8 16H6Z" fill="currentColor" />
                              </svg>
                            </span>
                          </button>
                        </h4>
                      </div>
                      <div id="coursefiltercollapse1" className="collapse show mt-n2 px-6 pb-6" aria-labelledby="coursefilter1" data-parent="#courseSidebar">
                        <ul className="list-unstyled list-group list-checkbox">
                          {categories.map((category) => (
                            <li className="custom-control custom-checkbox" key={category.id}>
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                value={category.id}
                                onChange={handleCategoryChange}
                                checked={selectedCategories.includes(category.id.toString())}
                                id={`categorycustomcheck${category.id}`}
                              />
                              <label className="custom-control-label font-size-base" htmlFor={`categorycustomcheck${category.id}`}>
                                {category.name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                      </div>
                      <div className="border rounded mb-6 ">
                        {/* Heading */}
                        <div id="coursefilter3">
                          <h4 className="mb-0">
                            <button className="p-6 text-dark fw-medium d-flex align-items-center collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#coursefiltercollapse3" aria-expanded="true" aria-controls="coursefiltercollapse3">
                              Price
                              <span className="ms-auto text-dark d-flex">
                                {/* Icon */}
                                <svg width={15} height={2} viewBox="0 0 15 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width={15} height={2} fill="currentColor" />
                                </svg>
                                <svg width={15} height={16} viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0 7H15V9H0V7Z" fill="currentColor" />
                                  <path d="M6 16L6 8.74228e-08L8 0L8 16H6Z" fill="currentColor" />
                                </svg>
                              </span>
                            </button>
                          </h4>
                        </div>
                        <div id="coursefiltercollapse3" className="collapse show mt-n2 px-6 pb-6" aria-labelledby="coursefilter3" data-parent="#courseSidebar">
                          <ul className="list-unstyled list-group list-checkbox">
                            <li className="custom-control custom-radio">
                              <input type="radio" id="pricecustomradio2" 
                              value="Latest"
                              onChange={handlePriceChange}
                             
                              name="customRadio" className="custom-control-input" />
                              <label className="custom-control-label font-size-base" htmlFor="pricecustomradio2">Low </label>
                            </li>
                            <li className="custom-control custom-radio">
                              <input type="radio" id="pricecustomradio3"
                               value="News"
                               onChange={handlePriceChange}
                               
                              name="customRadio" className="custom-control-input" />
                              <label className="custom-control-label font-size-base" htmlFor="pricecustomradio3">High </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <button  onClick={handleFilterButtonClick} className="btn btn-primary btn-block mb-10">FILTER RESULTS</button>
                    </div>
                  </div>
                  <div className="col-xl-8">
                    {/* Card */}
                    {currentFormations.map(formation => (
                    <div className="col-xl mb-5 mb-md-6" key={formation.id}>
                      {/* Card */}
                      <div className="card border shadow p-2 lift">
                        <div className="row gx-0 align-items-center">
                          {/* Image */}
                         <Link to={`/Espace_User/FormationSingle/${formation.id}`}  className="col-auto d-block mw-md-152" style={{maxWidth: '120px'}}>
                            <img className="img-fluid rounded shadow-light-lg h-100 h-md-auto o-f-c" src={`http://127.0.0.1:8000/images/${formation.image}`} alt="..." />
                          </Link>
                          {/* Body */}
                          <div className="col">
                            <div className="card-body py-0 px-md-5 px-3">
                            <Link to={`/Espace_User/FormationSingle/${formation.id}`}  className="d-block mb-2"><h5 className="line-clamp-2 h-xl-52">{formation.title}</h5></Link>
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
                         <Link to={`/Espace_User/FormationSingle/${formation.id}`}  className="col-auto rounded-lg d-none d-md-flex w-100p h-100p place-center bg-dark me-5">
                            <div className="w-100 text-center">
                              <h3 className="text-white mb-0 fw-semi-bold font-size-xxl">{new Date(formation.date).toLocaleDateString('en-US', { day: 'numeric' })}</h3>
                              <span className="h4 mb-0 text-white fw-normal">{new Date(formation.date).toLocaleDateString('en-US', { month: 'long'})}</span>
                            </div>
                            </Link>
                        </div>
                      </div>
                    </div>
                    ))}
                      {/* Pagination */}
                      <nav className="mt-8 mb-11" aria-label="Page navigationa">
                        {/* Pagination */}
                      <nav className="mt-8 mb-11" aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
                              <span aria-hidden="true">
                                <i className="fas fa-arrow-left" />
                              </span>
                            </a>
                          </li>
                          {pageNumbers.map((number) => (
                            <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                              <a className="page-link" href="#" onClick={() => setCurrentPage(number)}>
                                {number + 1}
                              </a>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === pageNumbers.length - 1 ? 'disabled' : ''}`}>
                            <a className="page-link" href="#" aria-label="Next" onClick={() => setCurrentPage(currentPage + 1)}>
                              <span aria-hidden="true">
                                <i className="fas fa-arrow-right" />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                      </nav>
                  </div>
                </div>
              </div>
              <Footer/>
            </div>
  )}

export default AllFormation 