import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const context = useContext(myContext)
   const{loading, setLoading} = context;

   const signup = async () => {
    setLoading(true)
    if (name === "" || email === "" || password === "") {
        return toast.error("All fields are mandatory")
    }

    try {
        const users = await createUserWithEmailAndPassword(auth, email, password);

        const user = {
            name: name,
            uid: users.user.uid,
            email: users.user.email,
            time : Timestamp.now()
        }
        const userRef = collection(fireDB, "users")
        await addDoc(userRef, user);
        toast.success("Signup Succesfully")
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false)
        
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}


    return (
        <div className=' flex justify-center items-center h-screen bg-whitesmoke'>
            <div className=' bg-gradient-to-b from-purple-600 to-purple-400 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Signup</h1>
                </div>

                <div>
                    <input type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        name='name'
                        className=' bg-whitesmoke mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-400 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        name='email'
                        className=' bg-whitesmoke mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-400 outline-none'
                        placeholder='Email'
                    />
                </div>

                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className=' bg-whitesmoke mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-400 outline-none'
                        placeholder='Password'
                    />
                </div>

                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-white w-full text-black font-medium px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-white'>Already have an account? <Link className=' text-white font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup