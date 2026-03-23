import { useState } from "react";
import api from "../api";

export default function LoginHub() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    await api.post("/auth/send-otp", { email });
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await api.post("/auth/verify-otp", { email, otp });
    if(res.message==="OTP berhasil diverifikasi!"){
      localStorage.setItem("userToken", email); // simple token
      window.location.href="/chat-hub";
    }
  };

  return (
    <div>
      {step===1 && (
        <>
          <h2>Login Revan</h2>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
          <button onClick={sendOtp}>Kirim OTP</button>
        </>
      )}
      {step===2 && (
        <>
          <h2>Masukkan OTP</h2>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="OTP"/>
          <button onClick={verifyOtp}>Verifikasi</button>
        </>
      )}
    </div>
  );
}
