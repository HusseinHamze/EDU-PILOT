import { useState } from 'react';
import { motion } from 'framer-motion';

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: ''
  });

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
      
      if (!formData.dob) {
        newErrors.dob = 'Date of birth is required';
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(isSignup ? 'Signup successful' : 'Login successful', formData);
      
      if (isSignup) {
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          dob: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
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
      className="flex items-center justify-center h-screen"
    >
      <motion.div
        className="flex bg-[#AFCBFF] w-[55%] h-[82%] rounded-lg shadow-lg"
        variants={containerVariants}
      >
        {/* Form Side */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between gap-1 items-center bg-[#0E1C36] w-1/2 h-full rounded-l-lg p-10"
          variants={formSideVariants}
        >
          <motion.div
            className="w-full max-w-[300px] flex flex-col gap-3"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="text-[#D7F9FF] text-2xl font-bold">
              {isSignup ? 'Sign Up' : 'Login'}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xs text-[#D7F9FF]/70">
              {isSignup ? 'Create your account' : 'Enter your account details'}
            </motion.p>

            {isSignup && (
              <motion.div variants={itemVariants} className="relative z-0">
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${errors.username ? 'border-red-500' : 'border-[#D7F9FF]/50'} appearance-none text-[#D7F9FF] focus:outline-none focus:ring-0 focus:border-[#AFCBFF] peer`}
                  placeholder=" "
                />
                <label
                  htmlFor="username"
                  className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
                {errors.username && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.username}
                  </motion.p>
                )}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="relative z-0">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-[#D7F9FF]/50'} appearance-none text-[#D7F9FF] focus:outline-none focus:ring-0 focus:border-[#AFCBFF] peer`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Fields */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <div className="relative z-0">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-[#D7F9FF]/50'} appearance-none text-[#D7F9FF] focus:outline-none focus:ring-0 focus:border-[#AFCBFF] peer`}
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {isSignup && (
                <div className="relative z-0">
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${errors.confirmPassword ? 'border-red-500' : 'border-[#D7F9FF]/50'} appearance-none text-[#D7F9FF] focus:outline-none focus:ring-0 focus:border-[#AFCBFF] peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm Password
                  </label>
                  {errors.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>
              )}
            </motion.div>

            {isSignup && (
              <motion.div variants={itemVariants} className="relative z-0">
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 ${errors.dob ? 'border-red-500' : 'border-[#D7F9FF]/50'} appearance-none text-[#D7F9FF] focus:outline-none focus:ring-0 focus:border-[#AFCBFF] peer`}
                  placeholder=" "
                />
                <label
                  htmlFor="dob"
                  className="absolute text-sm text-[#D7F9FF]/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#AFCBFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date of Birth
                </label>
                {errors.dob && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.dob}
                  </motion.p>
                )}
              </motion.div>
            )}

            {!isSignup && (
              <motion.a 
                variants={itemVariants} 
                href="#" 
                className="text-xs text-[#D7F9FF]/50 text-right hover:text-[#AFCBFF] transition-colors"
              >
                Forgot Password?
              </motion.a>
            )}

            <motion.button
              type="submit"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              animate={isLoading ? "loading" : "visible"}
              disabled={isLoading}
              className="bg-[#AFCBFF] text-[#0E1C36] h-12 rounded-full font-bold text-lg hover:bg-[#0059fd] cursor-pointer shadow-lg transition mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="block w-5 h-5 border-2 border-[#0E1C36] border-t-transparent rounded-full"
                  />
                  {isSignup ? 'Signing Up...' : 'Logging In...'}
                </>
              ) : (
                isSignup ? 'Sign Up' : 'Login'
              )}
            </motion.button>
          </motion.div>

          <motion.div
            className="flex items-center justify-between gap-4 w-full max-w-[300px]"
            variants={itemVariants}
          >
            <p className="text-[#D7F9FF]/50 text-sm">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <motion.button
              type="button"
              onClick={toggleAuthMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#AFCBFF] text-[#0E1C36] h-8 px-4 rounded-full text-xs font-bold hover:bg-[#0059fd] cursor-pointer shadow-lg transition"
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Graphic Side */}
        <motion.div
          className="relative flex items-center justify-center w-1/2 h-full rounded-r-lg overflow-hidden"
          variants={graphicSideVariants}
        >
          <motion.div
            className="z-10 flex flex-col items-center text-[#D7F9FF] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-2xl font-bold">Welcome To Edu-Pilot</h1>
            <p className="opacity-70 text-sm">
              {isSignup ? 'Join our community today' : 'Login To Access Your Account'}
            </p>
            <motion.img
              src="login-img.png"
              alt="Main"
              className="w-[300px] h-[300px] mt-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.7 }}
            />
          </motion.div>

          <motion.img 
            src="/Vector1.svg" 
            alt="Decoration" 
            className="absolute w-[350px] h-[350px] bottom-0 right-0" 
            initial={{ x: 100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.8 }} 
          />
          <motion.img 
            src="/Vector2.svg" 
            alt="Decoration" 
            className="absolute w-[200px] h-[200px] left-[-25%]" 
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.9 }} 
          />
          <motion.img 
            src="/Vector3.svg" 
            alt="Decoration" 
            className="absolute w-[200px] h-[200px] top-[-15%]" 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 1.0 }} 
          />
          <motion.img 
            src="/Vector4.svg" 
            alt="Decoration" 
            className="absolute w-[150px] h-[150px] top-0 right-0" 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 1.1 }} 
          />
          <motion.img 
            src="/Vector5.svg" 
            alt="Decoration" 
            className="absolute w-[100px] h-[100px] right-0 top-[15%]" 
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