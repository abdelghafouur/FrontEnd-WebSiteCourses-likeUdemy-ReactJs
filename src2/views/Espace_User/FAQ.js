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
                            Why won't my payment go through?
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
                          <p>Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus.</p>
                          <p>Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="curriculumheadingTwo">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#CurriculumcollapseTwo" aria-expanded="false" aria-controls="CurriculumcollapseTwo">
                            How do I get a refund?
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
                          <p>Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                          <p>Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="curriculumheadingThree">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#CurriculumcollapseThree" aria-expanded="false" aria-controls="CurriculumcollapseThree">
                            How do I redeem a coupon?
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
                      <div id="CurriculumcollapseThree" className="collapse" aria-labelledby="curriculumheadingThree" data-parent="#accordionCurriculum">
                        <div className="p-6 border-top">
                          <p>Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                          <p>Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="curriculumheadingFour">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#CurriculumcollapseFour" aria-expanded="false" aria-controls="CurriculumcollapseFour">
                            Changing account name
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
                      <div id="CurriculumcollapseFour" className="collapse" aria-labelledby="curriculumheadingFour" data-parent="#accordionCurriculum">
                        <div className="p-6 border-top">
                          <p>Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                          <p>Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
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
                            Why won't my payment go through?
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
                          <p>Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus.</p>
                          <p>Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="suggestionsheadingTwo">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#suggestionscollapseTwo" aria-expanded="false" aria-controls="suggestionscollapseTwo">
                            How do I get a refund?
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
                          <p>Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                          <p>Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="suggestionsheadingThree">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#suggestionscollapseThree" aria-expanded="false" aria-controls="suggestionscollapseThree">
                            How do I redeem a coupon?
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
                      <div id="suggestionscollapseThree" className="collapse" aria-labelledby="suggestionsheadingThree" data-parent="#accordionSuggestions">
                        <div className="p-6 border-top">
                          <p>Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                          <p>Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded shadow mb-6 overflow-hidden">
                      <div className="d-flex align-items-center" id="suggestionsheadingFour">
                        <h5 className="mb-0 w-100">
                          <button className="d-flex align-items-center text-left p-5 min-height-80 text-dark fw-medium collapse-accordion-toggle line-height-one" type="button" data-bs-toggle="collapse" data-bs-target="#suggestionscollapseFour" aria-expanded="false" aria-controls="suggestionscollapseFour">
                            Changing account name
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
                      <div id="suggestionscollapseFour" className="collapse" aria-labelledby="suggestionsheadingFour" data-parent="#accordionSuggestions">
                        <div className="p-6 border-top">
                          <p>Pharetra nulla ullamcorper sit lectus. Fermentum mauris pellentesque nec nibh sed et, vel diam, massa. Placerat quis vel fames interdum urna lobortis sagittis sed pretium. Aliquam eget posuere sit enim elementum nulla vulputate magna. Morbi sed arcu proin quis tortor non risus. Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
                          <p>Elementum lectus a porta commodo suspendisse arcu, aliquam lectus faucibus. Nisl malesuada tortor, ligula aliquet felis vitae enim. Mi augue aliquet mauris non elementum tincidunt eget facilisi. Pellentesque massa ipsum tempus vel aliquam massa eu pulvinar eget.</p>
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