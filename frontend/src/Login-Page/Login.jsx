import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const formSideVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  const graphicSideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50, delay: 0.2 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    loading: { opacity: 0.7 }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isSignup && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignup) {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const url = isSignup ? '/api/signup' : '/api/login'; // Ensure the API endpoint matches Laravel's routing
      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          baseURL: 'http://localhost:8000', // Adjust base URL to match Laravel's local server
        }
      );
      console.log(response.data);

      if (isSignup) {
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        navigate('/Home'); // Redirect to the home page after successful signup
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setErrors({});
  };

  return (
    <motion.div
  initial="hidden"
  animate="visible"
  className="flex items-center justify-center min-h-screen p-4"
>
  <motion.div
    className="flex flex-col md:flex-row bg-[#AFCBFF] w-full md:w-[50%] h-auto md:h-[70vh] rounded-lg shadow-lg overflow-hidden"
    variants={containerVariants}
  >
    {/* Form Side */}
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between items-center bg-[#0E1C36] w-full md:w-1/2 p-4 sm:p-6 dark:bg-[#142c5e]"
      variants={formSideVariants}
    >
      <motion.div
        className="w-full sm:max-w-[260px] flex flex-col gap-2"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <motion.h1 variants={itemVariants} className="text-[#D7F9FF] text-xl font-bold">
            {isSignup ? 'Sign Up' : 'Login'}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xs text-[#D7F9FF]/70 mt-1">
            {isSignup ? 'Create your account' : 'Enter your account details'}
          </motion.p>
        </motion.div>

        {/* Username */}
        {isSignup && (
          <motion.div variants={itemVariants} className="min-h-[60px]">
            <div className="relative z-0">
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className={`block py-2 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                  errors.username ? 'border-red-500' : 'border-[#D7F9FF]/50'
                } text-[#D7F9FF] focus:outline-none focus:border-[#AFCBFF] peer`}
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-5 scale-75 top-2 -z-10 origin-[0] peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
              >
                Username
              </label>
            </div>
            {errors.username && (
              <motion.p animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                {errors.username}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Email */}
        <motion.div variants={itemVariants} className="min-h-[60px]">
          <div className="relative z-0">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`block py-2 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                errors.email ? 'border-red-500' : 'border-[#D7F9FF]/50'
              } text-[#D7F9FF] focus:outline-none focus:border-[#AFCBFF] peer`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-5 scale-75 top-2 -z-10 origin-[0] peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
            >
              Email
            </label>
          </div>
          {errors.email && (
            <motion.p animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div variants={itemVariants} className="min-h-[60px]">
          <div className="relative z-0">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`block py-2 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                errors.password ? 'border-red-500' : 'border-[#D7F9FF]/50'
              } text-[#D7F9FF] focus:outline-none focus:border-[#AFCBFF] peer`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-5 scale-75 top-2 -z-10 origin-[0] peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
            >
              Password
            </label>
          </div>
          {errors.password && (
            <motion.p animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
              {errors.password}
            </motion.p>
          )}
        </motion.div>

        {/* Confirm Password */}
        {isSignup && (
          <motion.div variants={itemVariants} className="min-h-[60px]">
            <div className="relative z-0">
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block py-2 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#D7F9FF]/50'
                } text-[#D7F9FF] focus:outline-none focus:border-[#AFCBFF] peer`}
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-5 scale-75 top-2 -z-10 origin-[0] peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
              >
                Confirm Password
              </label>
            </div>
            {errors.confirmPassword && (
              <motion.p animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Forgot Password */}
        {!isSignup && (
          <motion.a
            variants={itemVariants}
            href="#"
            className="text-xs text-[#D7F9FF]/50 text-right hover:text-[#AFCBFF] transition-colors -mt-1 block"
          >
            Forgot Password?
          </motion.a>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={isLoading ? 'loading' : 'visible'}
          disabled={isLoading}
          className="bg-[#AFCBFF] text-[#0E1C36] h-10 rounded-full cursor-pointer font-bold text-sm hover:bg-[#0059fd] shadow-md transition mt-1 w-full"
        >
          {isLoading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-4 h-4 border-2 border-[#0E1C36] border-t-transparent rounded-full mr-2"
              />
              {isSignup ? 'Signing Up...' : 'Logging In...'}
            </>
          ) : isSignup ? (
            'Sign Up'
          ) : (
            'Login'
          )}
        </motion.button>
      </motion.div>

      {/* Toggle Auth */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full sm:max-w-[260px] mt-2"
        variants={itemVariants}
      >
        <p className="text-[#D7F9FF]/50 text-xs">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
        </p>
        <motion.button
          type="button"
          onClick={toggleAuthMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#AFCBFF] text-[#0E1C36] h-7 px-3 rounded-full cursor-pointer text-xs font-bold hover:bg-[#0059fd] shadow-md transition w-full sm:w-auto"
        >
          {isSignup ? 'Login' : 'Sign Up'}
        </motion.button>
      </motion.div>
    </motion.form>

    {/* Graphic Side */}
    <motion.div
      className="relative flex items-center justify-center w-full md:w-1/2 h-full rounded-r-lg overflow-hidden"
      variants={graphicSideVariants}
    >
      <motion.div
        className="z-10 flex flex-col items-center text-[#D7F9FF] text-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Welcome To Edu-Pilot</h1>
        <p className="opacity-70 text-xs sm:text-sm md:text-base">
          {isSignup ? 'Join our community today' : 'Login To Access Your Account'}
        </p>
        <motion.img
          src="login-img.png"
          alt="Main"
          className="w-[150px] sm:w-[200px] md:w-[300px] h-auto mt-6 md:mt-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.7 }}
        />
      </motion.div>

      {/* Decorations */}
      <motion.img
        src="/Vector1.svg"
        alt="Decoration"
        className="absolute hidden md:block w-[350px] bottom-0 right-0 opacity-60"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
      <motion.img
        src="/Vector2.svg"
        alt="Decoration"
        className="absolute hidden md:block w-[200px] left-[-25%]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      />
      <motion.img
        src="/Vector3.svg"
        alt="Decoration"
        className="absolute hidden md:block w-[200px] top-[-15%]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
      />
      <motion.img
        src="/Vector4.svg"
        alt="Decoration"
        className="absolute hidden md:block w-[150px] top-0 right-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1 }}
      />
      <motion.img
        src="/Vector5.svg"
        alt="Decoration"
        className="absolute hidden md:block w-[100px] right-0 top-[15%]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2 }}
/>
    </motion.div>
  </motion.div>
</motion.div>

  );
}

export default Login;