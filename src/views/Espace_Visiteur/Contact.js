import React ,{useState}  from 'react'
import Header from '../../components/header'
import SecondaryButton from '../../components/secondary-button'
import Footer from '../../components/footer'
import './Contact.css'
import './home.css'
import axios from 'axios';

const Profile = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  console.log(formData)
    try {
      await axios.post('http://127.0.0.1:8000/api/contact-us', {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      console.log('Email sent successfully!!!');
      // Reset the form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  const [mystylee, setmystylee] = useState("");
  return (
    <div className={`profile-container ${mystylee}`}>
      <div className="profile-image">
        <Header setmystylee={setmystylee} ></Header>
        <img
          alt="image"
          src="/playground_assets/gray-vector.svg"
          className="profile-image1"
        />
        <div className="profile-bg"></div>
      </div>
      <div className="profile-container01">
        <div className="profile-container06">
          <h3 className="profile-text Text2XL">What is NEW GENERATION ?</h3>
          <br/>
          <div className="profile-container07">
            <span className="profile-text1 TextSM">
            <h4 className="titre1">Future proof your career ! </h4>
            <h4>Learn new skills online with world‑class universities and experts. </h4>
            </span>
          </div>
          <div className="profile-container11"></div>
          <div className="home-contact">
            <span className="home-text50 TextXL">
            Our team is available to assist you with any questions or concerns you may have.
            </span>
            <div className="home-form">
              <h1 className="home-text51">Want to contact us?</h1>
              <span className="home-text52 TextXL">
                Complete this form and we will get back to you in 24 hours.
              </span>
              <span className="home-text53 TextXS">FULL NAME</span>
              <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="home-textinput TextSM input"
                value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <span className="home-text54 TextXS">EMAIL</span>
              <input
                type="text"
                placeholder="Email"
                className="home-textinput1 TextSM input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <span className="home-text55 TextXS">MESSAGE</span>
              <textarea
                cols="80"
                rows="4"
                placeholder="Type a message"
                className="home-textarea TextSM textarea"
                value={formData.message}
  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
              <div className="home-container49">
                <SecondaryButton
                  button="Send message"
                  rootClassName="secondary-button-root-class-name"
                ></SecondaryButton>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Profile
