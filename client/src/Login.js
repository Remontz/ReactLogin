import {useRef, useState, useEffect} from 'react'

const Login = () => {
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


  return (
    <section>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'> {errMsg} </p>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
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