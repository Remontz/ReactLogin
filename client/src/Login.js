import {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from './context/AuthProvider'
import axios from './api/axios'

const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()


    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try{
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data))    
            console.log(JSON.stringify(response))
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles
            setAuth({user, pwd, roles, accessToken})    
            setUser('')
            setPwd('')
            setSuccess(true)
        } catch (err) {
            
        }

        
    }

  return (
    <section>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'> {errMsg} </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>
                Username:
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
            </label>

            <label htmlFor='password'>
                Password:
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
            </label>
            <button>Sign In</button>
        </form>
        <p>
            Need an Account? <br />
            <span>
                {/* put router link here */}
                <a href='#'>Sign Up</a>
            </span>
        </p>
    </section>
  )
}

export default Login