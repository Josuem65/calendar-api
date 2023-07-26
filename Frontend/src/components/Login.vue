<template>
    <div v-if="loginPending">
    <!-- hide the form if logged in -->
        <div v-if="!registered" class="registerForm">
            <a @click="setRegisterStatus(registered)">Login</a>
            <h2>Register</h2>
            <form @submit.prevent="handleRegister">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="newLogin.username">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="newLogin.password">
              <label for="confirmPassword">ConfirmPassword</label>
              <input type="password" id="confirmPassword" v-model="newLogin.confirmPassword">
              <button type="submit">Submit</button> 
            </form>
        </div>
        <div v-else-if="registered" class="loginForm">
            <h2>Login</h2>
            <form @submit.prevent="handleLogin">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="credentials.username">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="credentials.password">
              <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p><a @click="setRegisterStatus">Register</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    data(){
        return{
            loginPending: true,
            registered: false,
            newLogin:{
                username:'',
                password:'',
                confirmPassword:'',
            },
            credentials: {
                username:'',
                password:'',}
        }
    },
    methods:{
        setRegisterStatus: function(registered) {
            return this.registered = !registered
        },
        handleLogin: function() {
            // Changed this.newLogin -> this.credentials to use correct form values during login
            axios.post('http://localhost:8080/api/users/login', this.credentials).then((respond) => {
                if(respond.status === 200) {
                    // logs username and token to the console if request successful
                    console.log(respond.data)
                    return this.loginPending = false
                } else {
                    alert('Incorrect username or password')
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        handleRegister: function() {
            const password = this.newLogin.password
            const confirmPassword = this.newLogin.confirmPassword
            const username = this.newLogin.username
            const correctLength = username.length >= 5 && username.length <= 15 ? true : false
            const userNameValidateed = this.userNameValidation(username, correctLength)
            const passwordsMatch = this.passwordsMatch(password, confirmPassword)

            if(!userNameValidateed && !passwordsMatch) {
                //add class to make input border red and display error
                alert('Username must be between 5-15 characters long & passwords must match')
            } else if(!passwordsMatch) {
                alert('Passwords must match')
            } else if(!userNameValidateed) {
                alert("Username can't contain special characters and must be between 5-15 characters long.")
            } else if(userNameValidateed && passwordsMatch){
                // const user_id = this.generateUserId(username)
                axios.post('http://localhost:8080/api/users/signup', { username: username, password: password}
                ).then(() => {
                    console.log('User login posted!')
                })
            }
        },
        userNameValidation: function(username, requiredLength) {
            // validate username, if username contains characters other than letters and numbers, return false  
            if(username.match(/^[a-zA-Z0-9]+$/) && requiredLength) {
                return true
            } else {
                return false
            }
        },
        passwordsMatch: function(password, confirmPassword) {
            // check if passwords match
            if(password === confirmPassword) {
                return true
            } else {
                return false
            }
        },
        // generateUserId: function(username) {
        //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        //     let result = ''
        //     //get first and last characters of username
        //     const firstChar = username.charAt(0)    
        //     const lastChar = username.charAt(username.length - 1)
        //     const charactersLength = characters.length
        //     for ( let i = 0; i <= 5; i++ ) {
        //         result += characters.charAt(Math.floor(Math.random() * charactersLength))
        //     }
        //     return this.newLogin.user_id = firstChar + result + lastChar
        // }
    }
}
</script>

<style>
</style>