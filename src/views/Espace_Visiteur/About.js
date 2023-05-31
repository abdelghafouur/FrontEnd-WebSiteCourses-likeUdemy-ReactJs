import React ,{useState} from 'react'

import Header from '../../components/header'
import SecondaryButton from '../../components/secondary-button'
import PostReaction from '../../components/post-reaction'
import Footer from '../../components/footer'
import './About.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const BlogPost = (props) => {
  const [mystylee, setmystylee] = useState("");
  return (
    <div className={`blog-post-container ${mystylee}`}>
      <div className="blog-post-hero">
        <div className="blog-post-fixed-header">
          <Header setmystylee={setmystylee} rootClassName="header-root-class-name"></Header>
        </div>
        
        <h1 className="blog-post-text Text2XL">
          Learn better with support along the way.
        </h1>
        <div className="blog-post-bg"></div>
      </div>
      <div className="blog-post-post-details">
        <div className="blog-post-container01">
          <svg viewBox="0 0 1170.2857142857142 1024" className="blog-post-icon">
            <path d="M585.143 292.571h-219.429v219.429h219.429v-219.429zM658.286 658.286v73.143h-365.714v-73.143h365.714zM658.286 219.429v365.714h-365.714v-365.714h365.714zM1024 658.286v73.143h-292.571v-73.143h292.571zM1024 512v73.143h-292.571v-73.143h292.571zM1024 365.714v73.143h-292.571v-73.143h292.571zM1024 219.429v73.143h-292.571v-73.143h292.571zM146.286 768v-548.571h-73.143v548.571c0 20 16.571 36.571 36.571 36.571s36.571-16.571 36.571-36.571zM1097.143 768v-621.714h-877.714v621.714c0 12.571-2.286 25.143-6.286 36.571h847.429c20 0 36.571-16.571 36.571-36.571zM1170.286 73.143v694.857c0 60.571-49.143 109.714-109.714 109.714h-950.857c-60.571 0-109.714-49.143-109.714-109.714v-621.714h146.286v-73.143h1024z"></path>
          </svg>
        </div>
        <span className="blog-post-text01 TextXL">posted 08 Mar 2023</span>
        <span className="blog-post-text02">
          <span className="blog-post-text03">
            &apos;Learn from the comfort of your own home with our convenient online courses .&apos;
          </span>
          <span className="blog-post-text05"> Ayoub Elamin</span>
        </span>
        <span className="blog-post-text06">
          <span className="blog-post-text07">
          Welcome to our online learning platform! We believe 
          that everyone deserves access to quality education,
           no matter where they are in the world. That's why
            we offer a wide range of online courses that you 
            can take from the comfort of your own home, at your own pace.
          </span>
          <br></br>
        </span>
      </div>
      <div className="blog-post-container02">
        <div className="blog-post-story">
          <h3 className="blog-post-text10 Text2XL">
          NEW GENERATION Institute...
          </h3>
          <img
            alt="image"
            src="/playground_assets/ec2.jpg"
            className="blog-post-image"
          />
          <span className="blog-post-text11 TextLG">
            <span className="blog-post-text12">
            One notable institute in Morocco that offers language courses is the 
            Institut Français du Maroc , which was established in 2010 as a cultural
             and educational organization to promot language and culture in Morocco.<br/>
             The institute offers a wide range of language courses for all
             levels, from beginner to advanced, as well as specialized 
             courses for professionals and children.
            </span>
            <br></br>
            <span></span>
            <br></br>
            <span className="blog-post-text15">
            One notable institute in Morocco that offers language courses is the 
            Institut Français du Maroc , which was established in 2010 as a cultural
             and educational organization to promot language and culture in Morocco.<br/>
             The institute offers a wide range of language courses for all
             levels, from beginner to advanced, as well as specialized 
             courses for professionals and children.
            </span>
            <br></br>
          </span>
          <div className="blog-post-post">
            <span className="blog-post-text35 TextXL">What people say...</span>
            <div className="blog-post-divider"></div>
            <div className="blog-post-container04">
              <div className="blog-post-container05">
                <img
                  alt="image"
                  src="/playground_assets/cm6.jpg"
                  className="blog-post-image2"
                />
                <div className="blog-post-container06">
                  <span className="blog-post-text36 TextSM">SOUHAIL BENYARI</span>
                  <div className="blog-post-container07">
                    <span className="blog-post-text37 TextXS">6 days ago</span>
                  </div>
                </div>
              </div>
              <SecondaryButton button="FOLLOW"></SecondaryButton>
            </div>
            <span className="blog-post-text38 TextMD">
              <span className="blog-post-text39">
              The course was clearly organized with good videos, 
              good readings and book references. The teachers 
              are academic researchers with experience in the 
              field and also experienced teachers. I enjoyed 
              the course very much.
              </span>
              <br></br>
            </span>
            <img
              alt="image"
              src="/playground_assets/cour2.jpg"
              className="blog-post-image3"
            />
            <div className="blog-post-container08">
              <div className="blog-post-container09">
                <svg viewBox="0 0 1024 1024" className="blog-post-icon2">
                  <path d="M982 426v86q0 16-6 32l-130 300q-20 52-78 52h-384q-34 0-60-26t-26-60v-426q0-34 26-60l280-282 46 46q18 18 18 44v14l-42 196h270q34 0 60 25t26 59zM42 896v-512h172v512h-172z"></path>
                </svg>
                <span className="blog-post-text40 TextXS">150</span>
                <svg viewBox="0 0 1024 1024" className="blog-post-icon4">
                  <path d="M1024 512c0 202.286-229.143 365.714-512 365.714-28 0-56-1.714-82.857-4.571-74.857 66.286-164 113.143-262.857 138.286-20.571 5.714-42.857 9.714-65.143 12.571-12.571 1.143-24.571-8-27.429-21.714v-0.571c-2.857-14.286 6.857-22.857 15.429-33.143 36-40.571 77.143-74.857 104-170.286-117.714-66.857-193.143-170.286-193.143-286.286 0-201.714 229.143-365.714 512-365.714s512 163.429 512 365.714z"></path>
                </svg>
                <span className="blog-post-text41 TextXS">36</span>
                <svg viewBox="0 0 1024 1024" className="blog-post-icon6">
                  <path d="M1024 365.714c0 9.714-4 18.857-10.857 25.714l-292.571 292.571c-6.857 6.857-16 10.857-25.714 10.857-20 0-36.571-16.571-36.571-36.571v-146.286h-128c-246.286 0-408 47.429-408 320 0 23.429 1.143 46.857 2.857 70.286 0.571 9.143 2.857 19.429 2.857 28.571 0 10.857-6.857 20-18.286 20-8 0-12-4-16-9.714-8.571-12-14.857-30.286-21.143-43.429-32.571-73.143-72.571-177.714-72.571-257.714 0-64 6.286-129.714 30.286-190.286 79.429-197.143 312.571-230.286 500-230.286h128v-146.286c0-20 16.571-36.571 36.571-36.571 9.714 0 18.857 4 25.714 10.857l292.571 292.571c6.857 6.857 10.857 16 10.857 25.714z"></path>
                </svg>
                <span className="blog-post-text42 TextXS">12</span>
              </div>
              <div className="blog-post-container10">
                <img
                  alt="image"
                  src="/playground_assets/cm6.jpg"
                  className="blog-post-image4"
                />
                <img
                  alt="image"
                  src="/playground_assets/cm3.png"
                  className="blog-post-image5"
                />
                <img
                  alt="image"
                  src="/playground_assets/cm5.jpg"
                  className="blog-post-image6"
                />
                <span className="blog-post-text43 TextXS">and 40+ more</span>
              </div>
            </div>
            <div className="blog-post-divider1"></div>
            <span className="blog-post-text44 TextSM">Load previous</span>
            <PostReaction
              name="Aya El Aloui"
              text="This course went beyond my expectations. High quality content with brilliant professionals and learners to share experiences."
              likes="3"
              image_src="/playground_assets/cm3.png"
            ></PostReaction>
            <PostReaction
              name="Karim nouari"
              text="What a great course - so informative and pitched at just the right level."
              shares="1"
              image_src="/playground_assets/cm5.jpg"
            ></PostReaction>
            <span className="blog-post-text45 TextSM">Load next</span>
            <div className="blog-post-container11">
              <img
                alt="image"
                src="/playground_assets/cm4.jpg"
                className="blog-post-image7"
              />
              <textarea
                rows="1"
                placeholder="Write your comment"
                className="blog-post-textarea textarea TextSM"
                disabled
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <br/><br/>
    
        <br/>
      <Footer></Footer>
      
    </div>
    
  )
}

export default BlogPost
