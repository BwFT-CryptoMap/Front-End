import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import { postSignupUser } from '../actions/index'

export default () => {
    const dispatch = useDispatch()
    const [userInputs, setUserInputs] = useState({ 'username': '', 'password': '', 'email': '' })

    const handleChange = type => event => {
        setUserInputs({ ...userInputs, type: userInputs[type] = event.target.value })
    }

    const handleSignup = event => {
        let tempUserObject = {
            username: userInputs['username'],
            password: userInputs['password'],
            email: userInputs['email']
        }
        dispatch(postSignupUser(tempUserObject))
    }

    const useStyles = makeStyles(theme => ({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        }
    }));

    const classes = useStyles()

    return (
        <div className='login_wrapper'>
            <DialogTitle id='login_dialog_title'><h2>Create Account</h2></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your username, password, and e-mail address to create a new account.
                </DialogContentText>
                <TextField
                    id="username-field"
                    label="Username"
                    className={classes.textField}
                    value={userInputs['username']}
                    onChange={handleChange('username')}
                    margin="normal"
                />
                <TextField
                    id="password-field"
                    label="Password"
                    className={classes.textField}
                    value={userInputs['password']}
                    onChange={handleChange('password')}
                    margin="normal"
                />
                <TextField
                    id="email-field"
                    label="E-mail"
                    className={classes.textField}
                    value={userInputs['email']}
                    onChange={handleChange('email')}
                    margin="normal"
                />
                <DialogActions>
                    <Button color='primary' onClick={handleSignup}> Signup </Button>
                </DialogActions>
            </DialogContent>
        </div>
    )
}