import React, { useRef ,useState} from "react";
import ReactDom from "react-dom";
import pic1 from '../pic/login22.png'
import pic3 from '../pic/login23.png'
import pic2 from '../pic/logod3.png'
import './model.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Modal1 = ({ setShowModal ,setstylee,etat1,myclasse1,myclasse2}) => {
  // close the modal when clicking outside the modal.
  const [etat ,setEtat] = useState(etat1)
  const [classe1 ,setclasse1] = useState(myclasse1)
  const [classe2 ,setclasse2] = useState(myclasse2)
  const [email ,setemail] = useState("")
  const [password ,setpassword] = useState("")
  const [Firstname ,setFirstname ]= useState('')
  const [Lastname ,setLastname ]= useState('')
  const [Tele ,setTele ]= useState('')
  const [Date ,setDate ]= useState('')
  const [Sexe ,setSexe ]= useState('')
  const [Adresse ,setAdresse ]= useState('')
  const [Info ,setInfo]= useState('')
  const [Info2 ,setInfo2]= useState('')

  const modalRef = useRef();
  const navigate = useNavigate();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      setstylee("")
      setInfo2("")
    }
  };
  const closeModal1 = (e) => {
    setShowModal(false);
    setstylee("")
    setInfo2("")
  
};
  function model1()
    {
      setEtat("etat1")
      setclasse1('divAfficher')
      setclasse2('')
      setInfo2("")
    }
  function model2()
    {
      setEtat("etat2")
      setclasse1('')
      setclasse2('divAfficher')
      setInfo2("")
    }
    function model3()
    {
      setEtat("etat3")
      setclasse1('')
      setclasse2('divAfficher')
      setInfo2("")
    }
    function model4()
    {
      setEtat("etat4")
      setclasse1('')
      setclasse2('divAfficher')
      setInfo2("")
    }
    function model5()
    {
      setEtat("etat5")
      setclasse1('')
      setclasse2('divAfficher')
      setInfo2("")
    }
    function Login(e)
    {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login', { email, password })
        .then(response => {
            // Handle successful login

            console.log(response.data); // You can access the response data here
            // Redirect to another page or perform any other action
            const { token, user } = response.data;
            // Store user information in state or browser storage
            localStorage.setItem('user', JSON.stringify(user));

            // Store the token in local storage or cookie
            localStorage.setItem('token', token);
            navigate('/Espace_User/');

            //  window.location.href = 'http://localhost:3001/Espace_User/?user=' + encodeURIComponent(JSON.stringify(user)) + '&token=' + encodeURIComponent(token);
        })
        .catch(error => {
            // Handle login error
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data); // You can access the error response data here
            console.log(error.response.status); // You can access the error status code here
            setInfo(error.response.data.message); // Set the error message to display to the user
            } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            } else {
            // Something else happened in making the request
            console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }
    function Register(event)
    {
          event.preventDefault();
          
            
            const formData = new FormData();
            formData.append('firstname', Firstname);
            formData.append('lastname', Lastname);
            formData.append('email', email);
            formData.append('tele', Tele);
            formData.append('date', Date);
            formData.append('sexe', Sexe);
            formData.append('adresse', Adresse);
            formData.append('password', password);
            if(etat == "etat3")
            {
           
              formData.append('role', "User");
            }
          if(etat == "etat4")
            {
             
              formData.append('role', "Prof");
            }
            
            try {
                axios.post('http://127.0.0.1:8000/api/register',formData, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                          }
                     })
                    .then(response => {
                        const { user, message } = response.data;
                        console.log('Login successful');
                        console.log(response.data); 
                        setInfo2('Login successful:');
                        const id = user.id; 
                        const role = user.role; 

                        if(role == "User")
                        {
                      
                          axios.post('http://127.0.0.1:8000/api/UserMailSend', {id})
                                    .then((response) => {
                                      console.log('snnnd');
                                    })
                                    .catch((error) => {
                                      console.log('nott');
                                    });
                        }
                        console.log('Login successful');
                        

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
                        setInfo2('Login nooot successful:')
                    });
            } catch (error) {
                console.log(error)
            }
        }
  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container myMod" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <div>
        <div className="row modeldiv">
                  <div className="col-sm-3 ">
                  </div>
                  <button className={`col-sm-3 div1 ${classe1}`}  onClick={() =>model1()}> S'enregistrer</button>     
                  <button className={`col-sm-3 div1 ${classe2}`}  onClick={() =>model2()}>Connexion</button>     
                  <div className="col-sm-2 ">
                  </div>
          </div>
        {(etat == "etat1")
          ?(
          <div className="row" style={{backgroundColor:"white"}} >
              <div  className="col-sm-6 div2">
                <img width='400px' height='300px' style={{marginLeft:'60px'}} src={pic1} />
                <p className="p" >Pas encore membre? <span onClick={() =>model2()} href="#"> S'enregistrer. </span>  </p>
              </div>
              <div className="col-sm-6 div2">
                <div className="maform">
                    <img width='200px' height='120px' style={{marginTop:'-80px'}} src={pic2} />
                    <form onSubmit={(event)=>Login(event)}>
                      <div className="group">      
                        <input type="email" name="email" onChange={(e)=>setemail(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="label">Username</label>
                      </div>
                      <div className="group">      
                        <input type="password" name="password" onChange={(e)=>setpassword(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="label">Password</label>
                        <p>Forget your password ? <span>  
                        <Link to="/ForgotPasswordForm">
                        Click here.
                        </Link></span></p>
                        {Info}
                      </div>
                      <div>    
                      <button type='submit' className="btnLogin"> Login </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
          
        )
        :(
          (etat == "etat2")
          ?(<div className="row"  style={{backgroundColor:"white"}} >
          <div className="col-sm-6 div3 div2" >
          <img width='400px' height='300px' style={{marginLeft:'60px'}} src={pic3} />
          <p className="p" >Déja membre?  <span onClick={() =>model1()} href="#"> Connexion. </span>  </p>
          </div>
          <div className="col-sm-6 div3 div2 mmm">
            <h6 className="par" >The course course are ar course are are academic course are course are course are course are</h6>
              <button className="btn1" onClick={() =>model3()}>S'enregistrer</button><br/>
              <h2>OU</h2>  
              <h6 className="par2" >The course course are ar course are are academic course are course are course are course are</h6> 
              <button className="btn2" onClick={() =>model4()}>Condddddnexion</button>
          </div>
      </div>)
          :(
            (etat == "etat3")
            ?(
            <div style={{backgroundColor:"white"}} >
              <form className="myyform signup" onSubmit={(event)=>Register(event)}>
                <div className="row">
                  <div  className="col-sm-6 div4">
                      <div className="row ">
                        <div className="col-sm-6">
                          <input type="text" placeholder="First Name" name="firstname" onChange={(e)=>setFirstname(e.target.value)}/>
                        </div>
                        <div className="col-sm-6">
                          <input type="text" placeholder="Last Name" name="lasttname" onChange={(e)=>setLastname(e.target.value)}/>
                        </div>
                      </div> 
                      <input type="email" placeholder="Your Email" name="email" className="frm" onChange={(e)=>setemail(e.target.value)}/><br/>
                      <input type="tele" placeholder="Your Telephone " name="tele" className="frm" onChange={(e)=>setTele(e.target.value)} /><br/>
                      <button type="submit">Sign in</button>
                      {Info2}
                  </div>
                  <div  className="col-sm-6 div4">
                      <div className="row ">
                        <div className="col-sm-6">
                          <input type="date" name="date" onChange={(e)=>setDate(e.target.value)}/>
                        </div>
                        <div className="col-sm-6">
                          <select  name="sexe" onChange={(e)=>setSexe(e.target.value)}>
                            <option value='rien'>Your Sexe</option>
                            <option value='Masculin'>Masculin</option>
                            <option value='Feminin'>Femenin</option>
                          </select>
                        </div>
                      </div> 
                      <input type="password" name="password" placeholder="Your Password" className="frm" onChange={(e)=>setpassword(e.target.value)}/><br/>
                      <input type="text" name="adresse" placeholder="Email Adresse"className="frm" onChange={(e)=>setAdresse(e.target.value)} /><br/>
                      
                  </div>
                </div>
              </form>
            </div>
        )
            :(
              (etat == "etat4")
              ?(<div style={{backgroundColor:"white"}} >
              <form className="myyform signup" onSubmit={(event)=>Register(event)}>
                <div className="row">
                  <div className="col-sm-6 div4">
                      <div className="row ">
                        <div className="col-sm-6">
                          <input type="text" placeholder="First Name" name="firstname" onChange={(e)=>setFirstname(e.target.value)}/>
                        </div>
                        <div className="col-sm-6">
                          <input type="text" placeholder="Last Name" name="lasttname" onChange={(e)=>setLastname(e.target.value)}/>
                        </div>
                      </div> 
                      <input type="email" placeholder="Your Email" name="email" className="frm" onChange={(e)=>setemail(e.target.value)}/><br/>
                      <input type="tele" placeholder="Your Telephone " name="tele" className="frm" onChange={(e)=>setTele(e.target.value)} /><br/>
                  </div>
                  <div  className="col-sm-6 div4">
                      <div className="row ">
                        <div className="col-sm-6">
                          <input type="date" name="date" onChange={(e)=>setDate(e.target.value)}/>
                        </div>
                        <div className="col-sm-6">
                          <select  name="sexe" onChange={(e)=>setSexe(e.target.value)}>
                            <option value='rien'>Your Sexe</option>
                            <option value='Masculin'>Masculin</option>
                            <option value='Feminin'>Femenin</option>
                          </select>
                        </div>
                      </div> 
                      <input type="password" name="password" placeholder="Your Password" className="frm" onChange={(e)=>setpassword(e.target.value)}/><br/>
                      <input type="text" name="adresse" placeholder="Email Adresse"className="frm" onChange={(e)=>setAdresse(e.target.value)} /><br/>
                      {Info2}<button type="submit" style={{marginLeft: '190px'}}><span>Next</span></button> 
                      
                  </div>
                </div>
              </form>
            </div>)
              :(<div style={{backgroundColor:"white"}} >
              <form className="myyform signup">
                <div className="row">
                  <div  className="col-sm-6 div4">
                      <div className="row ">
                        <div className="col-sm-6">
                          <input type="text" placeholder="First Name"/>
                        </div>
                        <div className="col-sm-6">
                          <input type="text" placeholder="Last Name"/>
                        </div>
                      </div> 
                      <input type="text" placeholder="Your Email" className="frm"/><br/>
                      <input type="email" placeholder="Your Telephone "className="frm" /><br/>
                      
                  </div>
                  <div  className="col-sm-6 div4">
                      <div className="row ">
                        <div className="col-sm-6">
                          <input type="date" placeholder="First Name"/>
                        </div>
                        <div className="col-sm-6">
                        <input type="date" placeholder="First Name"/>
                        </div>
                      </div> 
                      <input type="password" placeholder="Your Password" className="frm"/><br/>
                      <input type="email" placeholder="Email Adresse"className="frm" /><br/>
                      <button type="button" style={{marginLeft: '190px'}}>Sign Up</button> 
                  </div>
                </div>
              </form>
            </div>)
            )
          )
          
        )
        
        }</div>
        <button className="button" onClick={() => closeModal1()}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default Modal1