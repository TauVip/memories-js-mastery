import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { useState } from 'react'
import Input from './Input'
import useStyles from './styles'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = e => {
    e.preventDefault()

    if (isSignUp) dispatch(signup(formData, navigate))
    else dispatch(signin(formData, navigate))
  }

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setShowPassword(false)
  }

  const googleSuccess = async res => {
    console.log(res)
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({ type: 'AUTH', data: { result, token } })

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = error => {
    console.log(error)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId='923949904877-olg6f6tsc6j6f9vmq6f38nj0sh0hnkct.apps.googleusercontent.com'
            render={renderProps => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
export default Auth
