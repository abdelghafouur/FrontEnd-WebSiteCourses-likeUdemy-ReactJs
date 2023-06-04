import React from 'react'
import './FAQ.css'
import './styleAll.css'
import NavBar from './NavBar'
import Footer from './Footer'


const FAQ = () => {

  return (
            <div>
                <NavBar/>
              {/* PAGE TITLE
          ================================================== */}
              <header className="py-8 py-md-11" style={{backgroundImage: 'none'}}>
                <div className="container text-center py-xl-2">
                  <h1 className="display-4 fw-semi-bold mb-0">Frequently Asked Questions</h1>
                </div>
              </header>
              {/* FAQ
          ================================================== */}
              <div className="container mb-11 CntrF">
                <div className="w-xl-65 mx-auto">
                  <h1>Payments</h1>
                  <div className="mb-8" id="accordionCurriculum">
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="curriculumheadingOne">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#CurriculumcollapseOne" aria-expanded="true" aria-controls="CurriculumcollapseOne">
                            What are online courses?
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
                        </h5>
                      </div>
                      <div id="CurriculumcollapseOne" className="collapse show" aria-labelledby="curriculumheadingOne" data-parent="#accordionCurriculum">
                        <div className="p-6 border-top">
                          <p>Online courses are educational programs offered over the internet that allow learners to access course materials, lectures, and assignments remotely. They provide flexibility and convenience for individuals to enhance their knowledge and skills in various subjects.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="curriculumheadingTwo">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#CurriculumcollapseTwo" aria-expanded="false" aria-controls="CurriculumcollapseTwo">
                          What are the advantages of taking online courses?
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
                        </h5>
                      </div>
                      <div id="CurriculumcollapseTwo" className="collapse" aria-labelledby="curriculumheadingTwo" data-parent="#accordionCurriculum">
                        <div className="p-6 border-top">
                          <p> Online courses offer several advantages, including flexibility to learn at your own pace and schedule, accessibility from anywhere with an internet connection, the ability to balance work or other commitments alongside learning, and access to a wide range of course options and subjects.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="curriculumheadingTwo">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#CurriculumcollapseTwo" aria-expanded="false" aria-controls="CurriculumcollapseTwo">
                          How do I enroll in an online course?
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
                        </h5>
                      </div>
                      <div id="CurriculumcollapseTwo" className="collapse" aria-labelledby="curriculumheadingTwo" data-parent="#accordionCurriculum">
                        <div className="p-6 border-top">
                          <p> To enroll in an online course, you typically need to visit our website, browse the available courses, and select the course you're interested in. Follow the enrollment instructions provided on the course page, which may involve creating an account, completing a registration form, and making a payment if required.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h1>Suggestions</h1>
                  <div className="mb-8" id="accordionSuggestions">
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="suggestionsheadingOne">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#suggestionscollapseOne" aria-expanded="true" aria-controls="suggestionscollapseOne">
                          Can I access the course materials at any time?
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
                        </h5>
                      </div>
                      <div id="suggestionscollapseOne" className="collapse show" aria-labelledby="suggestionsheadingOne" data-parent="#accordionSuggestions">
                        <div className="p-6 border-top">
                          <p>Yes, in most cases, you can access the course materials at any time. Once you enroll in a course, you will typically have access to the course content, including lectures, readings, and assignments, for the duration of the course. This allows you to study at your convenience and revisit the materials as needed.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="suggestionsheadingTwo">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#suggestionscollapseTwo" aria-expanded="false" aria-controls="suggestionscollapseTwo">
                          How long do online courses typically last?
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
                        </h5>
                      </div>
                      <div id="suggestionscollapseTwo" className="collapse" aria-labelledby="suggestionsheadingTwo" data-parent="#accordionSuggestions">
                        <div className="p-6 border-top">
                          <p>The duration of online courses can vary. Some courses may be short and focused, lasting a few weeks, while others may span several months. The course duration will be mentioned in the course details, allowing you to plan your study schedule accordingly.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer/>
            </div>
    )};
  
export default FAQ 