import { useState } from "react";
import axios from "axios";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);

  const sendOtp = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/send-otp`, { email });
    alert("OTP terkirim!");
    setSent(true);
  };

  const verifyOtp = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/verify-otp`, { email, otp });
    alert("OTP berhasil diverifikasi!");
    setSent(false);
    setOtp("");
  };

  return (
    <div>
      <h2>Login / OTP</h2>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      {!sent ? <button onClick={sendOtp}>Kirim OTP</button> : (
        <>
          <input type="text" placeholder="Masukkan OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verifikasi OTP</button>
        </>
      )}
    </div>
  );
    }
