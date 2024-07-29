import React,{ useState } from 'react'
import './otp.css';
const User_reg =()=>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [flag, setFlag] = useState(0)
    const[message,setMessage]=useState('')
    const [otp, setOtp] = useState('')
    const [userotp, setUserotp] = useState('')
    const [remaining, setRemaining] = useState(3)
    const[loading,setLoading]=useState()
    const[contact,setcontact]=useState()



const sendotp = async () =>{
    setLoading('loading')
    const rn = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
    setOtp(rn)
    const new_user = {
      "email": email,
      "otp": rn,
      password:password
      
  }
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_user)
  };

  const response = await fetch('https://interio-s72e.onrender.com/send_otp', requestOptions);
  const data = await response.json();
  setLoading('')
  if (data.message === 'success') {
      setFlag(1)
  }
  else {
      alert("Sorry Your Email is Not Valid, Try Again")
  }
}



const registration = async () =>{
    alert(otp+" "+userotp)
    if(otp == userotp)
    {
          const new_user = {
            "email": email,
            "name": name,
            "password": password
        
        }
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };
    
        const response = await fetch('https://interio-s72e.onrender.com/user_register', requestOptions);
        const data = await response.json();

        console.log(65, data)
    
        if (data.id == null) {
            setFlag(0)
            setMessage("Registration Successfully")
        }
        else {
            setMessage("Registration Failure")
        }
    }
    else
    {
      const x = remaining - 1
      if(x == 0)
      {
          setFlag(0)
          setMessage("")
      }
      setRemaining(x)
      setMessage("OTP not valid, Try again."+x+" times more left")
    }
}




    const save = () =>{
       
        setFlag(1)

    }
//mmaq lyut wciz qzke   ----password
    return (
        <>
        <div id={loading}></div>

            {
                flag == 0 ?
                <div className="inputt">

                                            
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control"    onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="col">
                             <label for="exampleInputName" class="form-label">name</label>
                              <input type="text"  onChange={(e) => setName(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password"  onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                        </div>
                       
                        <button style={{color:'black',backgroundColor:'peachpuff',marginLeft:'40px'}} type="submit" className="btn btn-primary" onClick={sendotp}>submit</button>
                </div>
               

                </div>
    
    
            
            :

           

                <div class="col-auto">
                     <label for="inputPassword2" class="visually-hidden">Enter otp</label>
                      <input type="password" class="form-control" id="inputPassword2" placeholder="otp" onChange={(e) => setUserotp(e.target.value)}/>
                      <button style={{color:'black',backgroundColor:'peachpuff',marginLeft:'40px'}} type="submit" className="btn btn-primary" onClick={registration}>Verify OTP</button>
                      {message}
                 </div>
           
            }
            


        </>

    )
}
export default User_reg
