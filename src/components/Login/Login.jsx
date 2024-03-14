import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../Register/Register";
import axios from 'axios';
// import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export const Login = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        email: email,
        password: password
      });

      console.log(response);

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso:', response.data);
        // navigate("/home");
      } else {
        console.error('Error al iniciar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="text-center background-image">
      <Card color="transparent" shadow={false} className="flex items-center">
        <h1 className="text-2xl md:text-4xl text-white galarama">
          LUXYNEMA
        </h1>
        <Typography variant="h4" color="white">
          Sign In
        </Typography>
        <form className="mt-8 mb-2 w-full max-w-screen-sm mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <p color="white" className="-mb-5 galarama text-lg text-white">
              Email
            </p>
            <Input
              id="email"
              type="email"
              size="lg"
              placeholder="email@email.com"
              className=" !border-t-white-200 focus:!border-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={handleEmailChange}
            />
            <p color="white" className="-mb-5 galarama text-lg text-white ">
              Password
            </p>
            <Input
              id="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-white-200 focus:!border-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button
            className="mt-6 bg-[color:var(--azul-fuerte)] transition-all duration-300 hover:bg-[color:var(--negro)]"
            fullWidth
            onClick={handleLogin}
          >
            sign in
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Don&apos;t have an account?{" "}
            <Link to="/register" element={<Register />} className="font-medium text-white transition-all duration-300 hover:text-[color:var(--azul)] underline">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
















// import React, { useState, useEffect } from "react";
// import "./Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import { Register } from "../Register/Register";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../credentials";

// export const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");


//   const getToken = () => {
//     return sessionStorage.getItem("token");// O sessionStorage, dependiendo de tus necesidades
//   };
//   console.log(getToken);

//   useEffect(() => {
//     const user = auth.currentUser;

//     if (user) {
//       navigate("/add");
//     } else {
//       console.log("Usuario no iniciado");
//     }
//   }, [navigate]);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleRegister = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log(user);
//         navigate("/add");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage, errorCode);
//         console.log(errorMessage);
//       });
//   };

//   return (
//     <div className="background-image">
//       <div className="container">
//         <div className="text-container text-center">
//           <h1 className="text-2xl galarama">LUXYNEMA</h1>
//           <p className="text-lg">THE THEATER FOR YOU</p>
//         </div>

//         <main className="login-container">
//           <div className="text-container">
//             <h1 className="text-2xl font-bold mb-2">SIGN IN!</h1>
//           </div>
//           <div className="mb-4">
//             <input
//               className="input-field"
//               id="email"
//               type="email"
//               placeholder="Email Address"
//               required
//               value={email}
//               onChange={handleEmailChange}
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               className="input-field"
//               id="password"
//               type="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={handlePasswordChange}
//             />
//           </div>
//           <button
//             className="bg-white rounded-xl py-4 px-6 galarama cursor-pointer mb-4"
//             onClick={handleRegister}
//           >
//             <span className="text-xl">Sign In</span>
//           </button>

//           <div className="flex">
//             <p className="text-xl">Don't have an account?</p>
//             <Link
//               to="/register"
//               element={<Register />}
//               className="text-xl pl-2 underline cursor-pointer hover:text-[color:var(--azul)] transition-all duration-1500"
//             >
//               Register
//             </Link>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

/* import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Importa Axios
import { Register } from "../Register/Register";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      // Enviar datos de inicio de sesión al backend
      const response = await axios.post('http://127.0.0.1:8000/login_admin/', {
        email: email,
        password: password
      });

      console.log(response)

      // Verificar si la solicitud fue exitosa y si hay un token en la respuesta
      if (response.status === 200 && response.data.idToken) {
        const token = response.data.token;

        // Guardar el token en el almacenamiento local (localStorage) o en una cookie
        localStorage.setItem('token', token);

        // Configurar el token para las solicitudes subsiguientes
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Manejar la respuesta del backend según corresponda
        console.log('Inicio de sesión exitoso:', response.data);

        // Redirigir al usuario a la página de inicio o a donde sea necesario
        navigate("/home");
      } else {
        console.error('Error al iniciar sesión: No se recibió un token en la respuesta');
      }
    } catch (error) {
      // Manejar errores de la solicitud al backend
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="text-center background-image">
      <Card color="transparent" shadow={false} className="flex items-center">
        <h1 className="text-2xl md:text-4xl text-white galarama">
          LUXYNEMA
        </h1>
        <Typography variant="h4" color="white">
          Sign In
        </Typography>
        <form className="mt-8 mb-2 w-full max-w-screen-sm mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <p color="white" className="-mb-5 galarama text-lg text-white">
              Email
            </p>
            <Input
              id="email"
              type="email"
              size="lg"
              placeholder="email@email.com"
              className=" !border-t-white-200 focus:!border-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={handleEmailChange}
            />
            <p color="white" className="-mb-5 galarama text-lg text-white ">
              Password
            </p>
            <Input
              id="password"
              type="password"
              size="lg"
              placeholder="******"
              className=" !border-t-white-200 focus:!border-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button
            className="mt-6 bg-[color:var(--azul-fuerte)] transition-all duration-300 hover:bg-[color:var(--negro)]"
            fullWidth
            onClick={handleLogin}
          >
            sign in
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Don&apos;t have an account?{" "}
            <Link to="/register" element={<Register />} className="font-medium text-white transition-all duration-300 hover:text-[color:var(--azul)] underline">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
 */