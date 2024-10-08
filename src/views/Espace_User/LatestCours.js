import React, { useState, useEffect }  from 'react'
import './LatestCours.css'
import './styleAll.css'
import NavBar from './NavBar'
import Footer from './Footer'
import useAuth from '../../function/useAuth';
import axios from "axios";
import { Link } from 'react-router-dom';


const LatestCours = () => {
  useAuth();
  const token = localStorage.getItem('token');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);

  useEffect(() => {
    // Fetch all courses from the backend API
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/courses', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
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

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((course) => selectedRatings.includes(course.rating.toString()));
    }
    setFilteredCourses(filtered);
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

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRatings((prevSelected) => [...prevSelected, rating]);
    } else {
      setSelectedRatings((prevSelected) =>
        prevSelected.filter((prevRating) => prevRating !== rating)
      );
    }
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
    // Pagination
    const indexOfLastCourse = (currentPage + 1) * perPage;
    const indexOfFirstCourse = indexOfLastCourse - perPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  
    const pageCount = Math.ceil(filteredCourses.length / perPage);
  
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
                  <h1 className="display-4 fw-semi-bold mb-0">Latest Courses</h1>
                </div>
              </header>
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
                        {/* Heading */}
      <div id="coursefilter5">
        <h4 className="mb-0">
          <button className="p-6 text-dark fw-medium d-flex align-items-center collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#coursefiltercollapse5" aria-expanded="true" aria-controls="coursefiltercollapse5">
            Rating
          </button>
        </h4>
      </div>
      <div id="coursefiltercollapse5" className="collapse show mt-n2 px-6 pb-6" aria-labelledby="coursefilter5" data-parent="#courseSidebar">
        <ul className="list-unstyled list-group list-checkbox">
          <li className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="ratingcustomcheck1"
              value="5"
              onChange={handleRatingChange}
              checked={selectedRatings.includes("5")}
            />
            <label className="custom-control-label font-size-base" htmlFor="ratingcustomcheck1">
  <span className="d-flex align-items-end">
    <span className="star-rating">
      <span className="rating" style={{ width: '100%' }} />
    </span>
    <span className="ms-3">
      <span>&amp; up</span>
    </span>
  </span>
</label>
</li>
<li className="custom-control custom-checkbox">
  <input
    type="checkbox"
    className="custom-control-input"
    id="ratingcustomcheck2"
    value="4"
    onChange={handleRatingChange}
    checked={selectedRatings.includes("4")}
  />
  <label className="custom-control-label font-size-base" htmlFor="ratingcustomcheck2">
    <span className="d-flex align-items-end">
      <span className="star-rating">
        <span className="rating" style={{ width: '80%' }} />
      </span>
      <span className="ms-3">
        <span>&amp; up</span>
      </span>
    </span>
  </label>
</li>
<li className="custom-control custom-checkbox">
  <input
    type="checkbox"
    className="custom-control-input"
    id="ratingcustomcheck3"
    value="3"
    onChange={handleRatingChange}
    checked={selectedRatings.includes("3")}
  />
  <label className="custom-control-label font-size-base" htmlFor="ratingcustomcheck3">
    <span className="d-flex align-items-end">
      <span className="star-rating">
        <span className="rating" style={{ width: '60%' }} />
      </span>
      <span className="ms-3">
        <span>&amp; up</span>
      </span>
    </span>
  </label>
</li>
<li className="custom-control custom-checkbox">
  <input
    type="checkbox"
    className="custom-control-input"
    id="ratingcustomcheck4"
    value="2"
    onChange={handleRatingChange}
    checked={selectedRatings.includes("2")}
  />
  <label className="custom-control-label font-size-base" htmlFor="ratingcustomcheck4">
    <span className="d-flex align-items-end">
      <span className="star-rating">
        <span className="rating" style={{ width: '40%' }} />
      </span>
      <span className="ms-3">
        <span>&amp; up</span>
      </span>
    </span>
  </label>
</li>
<li className="custom-control custom-checkbox">
  <input
    type="checkbox"
    className="custom-control-input"
    id="ratingcustomcheck5"
    value="1"
    onChange={handleRatingChange}
    checked={selectedRatings.includes("1")}
  />
  <label className="custom-control-label font-size-base" htmlFor="ratingcustomcheck5">
    <span className="d-flex align-items-end">
      <span className="star-rating">
        <span className="rating" style={{ width: '20%' }} />
      </span>
      <span className="ms-3">
        <span>&amp; up</span>
      </span>
    </span>
  </label>
</li>
</ul>
</div>
                      </div>
                      <button  onClick={handleFilterButtonClick} className="btn btn-primary btn-block mb-10">FILTER RESULTS</button>
                    </div>
                  </div>
                  <div className="col-xl-8">
                    {/* Card */}
                    {currentCourses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(course => (
                    <div key={course.id} className="card border shadow p-2 lift sk-fade mb-6 flex-md-row align-items-center row gx-0">
                      {/* Image */}
                      <div className="col-md-4New card-zoom position-relative">
                        <div className="badge-float sk-fade-top top-0 right-0 mt-4 me-4">
                          <Link to={`/Espace_User/CourseSingle/${course.id}`}  className="btn btn-xs btn-dark text-white rounded-circle lift opacity-dot-7 me-1 p-2 d-inline-flex justify-content-center align-items-center w-36 h-36">
                            {/* Icon */}
                            <svg width={18} height={18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.8856 8.64995C17.7248 8.42998 13.8934 3.26379 8.99991 3.26379C4.10647 3.26379 0.274852 8.42998 0.114223 8.64974C-0.0380743 8.85843 -0.0380743 9.14147 0.114223 9.35016C0.274852 9.57013 4.10647 14.7363 8.99991 14.7363C13.8934 14.7363 17.7248 9.5701 17.8856 9.35034C18.0381 9.14169 18.0381 8.85843 17.8856 8.64995ZM8.99991 13.5495C5.39537 13.5495 2.27345 10.1206 1.3493 8.99965C2.27226 7.87771 5.38764 4.4506 8.99991 4.4506C12.6043 4.4506 15.726 7.8789 16.6505 9.00046C15.7276 10.1224 12.6122 13.5495 8.99991 13.5495Z" fill="currentColor" />
                              <path d="M8.9999 5.43958C7.03671 5.43958 5.43945 7.03683 5.43945 9.00003C5.43945 10.9632 7.03671 12.5605 8.9999 12.5605C10.9631 12.5605 12.5603 10.9632 12.5603 9.00003C12.5603 7.03683 10.9631 5.43958 8.9999 5.43958ZM8.9999 11.3736C7.69103 11.3736 6.62629 10.3089 6.62629 9.00003C6.62629 7.6912 7.69107 6.62642 8.9999 6.62642C10.3087 6.62642 11.3735 7.6912 11.3735 9.00003C11.3735 10.3089 10.3088 11.3736 8.9999 11.3736Z" fill="currentColor" />
                            </svg>
                          </Link>
                          <Link to={`/Espace_User/CourseSingle/${course.id}`}  className="btn btn-xs btn-dark text-white rounded-circle lift opacity-dot-7 p-2 d-inline-flex justify-content-center align-items-center w-36 h-36">
                            {/* Icon */}
                            <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.2437 1.20728C10.0203 1.20728 8.87397 1.66486 7.99998 2.48357C7.12598 1.66486 5.97968 1.20728 4.7563 1.20728C2.13368 1.20728 0 3.341 0 5.96366C0 7.2555 0.425164 8.52729 1.26366 9.74361C1.91197 10.6841 2.80887 11.5931 3.92937 12.4454C5.809 13.8753 7.66475 14.6543 7.74285 14.6867L7.99806 14.7928L8.25384 14.6881C8.33199 14.6562 10.1889 13.8882 12.0696 12.4635C13.1907 11.6142 14.0881 10.7054 14.7367 9.7625C15.575 8.54385 16 7.26577 16 5.96371C16 3.341 13.8663 1.20728 11.2437 1.20728ZM8.00141 13.3353C6.74962 12.7555 1.33966 10.0142 1.33966 5.96366C1.33966 4.07969 2.87237 2.54698 4.75634 2.54698C5.827 2.54698 6.81558 3.03502 7.46862 3.88598L8.00002 4.57845L8.53142 3.88598C9.18446 3.03502 10.173 2.54698 11.2437 2.54698C13.1276 2.54698 14.6604 4.07969 14.6604 5.96366C14.6603 10.0433 9.25265 12.7613 8.00141 13.3353Z" fill="currentColor" />
                            </svg>
                            </Link>
                        </div>
                        <Link to={`/Espace_User/CourseSingle/${course.id}`}  className="card-img sk-thumbnail img-ratio-2 d-block">
                          <img className="rounded shadow-light-lg" src={`http://127.0.0.1:8000/images/${course.image}`}   alt="..." />
                          </Link>
                        <span className="badge sk-fade-bottom badge-lg badge-orange badge-pill badge-float bottom-0 left-0 mb-4 ms-4">
                          <span className="text-white text-uppercase fw-bold font-size-xs">{course.category.name}</span>
                        </span>
                      </div>
                      {/* Footer */}
                      <div className="col-md-8 card-footer px-2 px-md-5 py-4 py-md-0 position-relative">
                        {/* Preheading */}
                        <Link to={`/Espace_User/CourseSingle/${course.id}`}  style={{"marginLeft":"10px"}}><span className="mb-1 d-inline-block text-gray-800">{course.category.name}</span></Link> 
                        <Link to={`/Espace_User/CourseSingle/${course.id}`}  style={{"marginLeft":"50px"}}><span className="mb-1 d-inline-block text-gray-800">{course.date}</span></Link>
                        {/* Heading */}
                        <div className="position-relative">
                          <Link to={`/Espace_User/CourseSingle/${course.id}`}  className="d-block stretched-link"><h4 className="line-clamp-2 me-md-6 me-lg-10 me-xl-4 mb-3">{course.title}</h4></Link>
                          <ul className="nav mx-n3 mb-3">
                            <li className="nav-item px-3">
                              <div className="d-flex align-items-center">
                                <div className="me-2 d-flex text-secondary icon-uxs">
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
                                <div className="me-2 d-flex text-secondary icon-uxs">
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
                          <div className="row mx-n2 align-items-center">
                            <div className="col px-2">
                              <ins className="h4 mb-0 mb-lg-n1 ms-1">${course.price}</ins>
                            </div>
                            <div className="col-auto px-2">
                              <div className="d-lg-flex align-items-end">
                                <div className="star-rating mb-2 mb-lg-0">
                                  <div className="rating" style={{ width: `${ course.rating * 20}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> 
                    ))}
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
                  </div>
                </div>
              </div>
              <Footer/>
            </div>
  )}

export default LatestCours 