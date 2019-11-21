import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../images/doctor1.png'
import LoginBackground from '../../images/wallpaper.jpg'
import { connect } from 'react-redux'
import { SignIn } from '../../store/actions/authActions'
import * as Animatable from 'react-native-animatable'
import {

    Image,
    TextInput,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
class Login extends Component {
    constructor() {
        super()
        this.state = {

            email: '',
            password: '',
            error: ''

        }


    }


    async UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        
        if (nextProps.auth.authError === "SIGNIN_FAILED") {
            console.log("aya")
            return await this.setState({
                error: nextProps.auth.auth.message
            })

        }
    }

    render() {

       



        return (
            <View style={styles.mainView}>
                <View style={styles.backView}>
                    <ImageBackground source={LoginBackground} style={styles.back}>
                        <KeyboardAwareScrollView>
                            <Animatable.Image animation="zoomIn" source={Logo} style={styles.logo}></Animatable.Image>
                            <Animatable.Text  style={styles.text}>Hello Doctor, Login To Get Started</Animatable.Text>

                            <View style={styles.inputView}>
                                <Animatable.View>
                                    <TextInput placeholder="Enter Your Email" style={styles.inputs} onChangeText={(email) => this.setState({ email })}></TextInput>


                                    <TextInput secureTextEntry={true} placeholder="Enter Your Password" style={styles.inputs} onChangeText={(password) => this.setState({ password })}></TextInput>
                                </Animatable.View>
                                <Text style={styles.error}>{this.state.error}</Text>
                                <TouchableOpacity delayLongPress={0} style={styles.buttons} onPress={() => {
                                    console.log(this.state)
                                    this.props.SignIn(this.state)
                                }}>
                                    <Animatable.Text animation="pulse" iterationCount="infinite" easing="ease-out" style={styles.buttontext} >Login</Animatable.Text>
                                </TouchableOpacity>
                                <TouchableOpacity delayLongPress={0} style={styles.buttons}>
                                    <Animatable.Text animation="pulse" iterationCount="infinite" easing="ease-in-sine" style={styles.buttontext} onPress={() => { Actions.signup() }}>New? Create Account</Animatable.Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>

                    </ImageBackground>
                </View>
            </View>
        );
    };


}
const styles = StyleSheet.create({
    mainView: {


        flex: 1,
        justifyContent: "center",



    },

    backView: {
        width: "100%",
        height: "100%",
        backgroundColor: "lightblue"



    },
    back:
    {
        width: "100%", height: "100%"
    },
    text: {
        color: "white",
        fontSize: 30,
        fontFamily: "Helvetica",
        textAlign: "center",
        marginTop: 20,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        lineHeight: 50
    },
    inputs: {
        backgroundColor: "white",
        borderRadius: 50,
        height: 40,
        marginTop: 20,
        padding: 5,
        paddingLeft: 20


    },
    inputView: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 20,
        lineHeight: 20,

    },
    buttons: {
        backgroundColor: "#007f00",
        width: 180,
        height: 50,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20

    },
    logo: {
        borderRadius: 100,
        width: 140,
        height: 130,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 40

    },
    buttontext: {
        color: "white",
        fontSize: 15,
    },
    error: {
        color: "red",
        textAlign: "center",

    }


});

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SignIn: (data) => dispatch(SignIn(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);