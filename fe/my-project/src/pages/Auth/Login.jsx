import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //  role berdasarkan email
    if (formData.email === "admin@mail.com") {
      navigate("/dashboard/admin");
    } else if (formData.email === "kasir@mail.com") {
      navigate("/dashboard/kasir");
    } else if (formData.email === "gudang@mail.com") {
      navigate("/dashboard/gudang");
    } else if (formData.email === "owner@mail.com") {
      navigate("/dashboard/owner");
    } else {
      alert("Email tidak dikenali! Coba pakai admin@mail.com, kasir@mail.com, gudang@mail.com, atau owner@mail.com");
    }
  };

  return (
    <div className="flex   items-center   justify-center min-h-screen bg-gray-100 p-23 ">
      <div className="w-full max-w-md flex justify-center  bg-white shadow-lg rounded-lg p-">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
}
