import { useState } from "react";
import axios from "axios";

export default function Auth() {
  const [email,setEmail]=useState("");
  const [otp,setOtp]=useState("");
  const [password,setPassword]=useState("");

  async function sendOtp() {
    await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/send-otp`, { email });
    alert("OTP dikirim ke email");
  }

  async function verifyOtp() {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/verify-otp`, { email, otp });
    alert(res.data.message);
  }

  async function resetPassword() {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/reset-password`, { email, password });
    alert(res.data.message);
  }

  return (
    <div>
      <h2>Login / OTP</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button onClick={sendOtp}>Send OTP</button>
      <input placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify OTP</button>
      <input placeholder="New Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={resetPassword}>Reset Password</button>
    </div>
  )
      }
