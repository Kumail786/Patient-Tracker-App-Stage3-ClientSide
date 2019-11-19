import React, { Component } from 'react'
import Background from '../../images/back.jpeg'
import Logo from '../../images/loggedlogo.jpeg'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import {

    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,


} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Loader from '../../images/laoder.gif'
class LoggedInScreen extends Component {
    constructor() {
        super()
this.state = {
    loader : true
}
    }
  async  UNSAFE_componentWillReceiveProps(nextProps,nextState){
        if(nextProps.auth.auth.doctor){
         await   this.setState({
                loader : false
            })
        }
    }

    render() {
        if(!this.state.loader || this.props.auth.auth){
        console.log(this.props.auth)
        const name = this.props.auth.auth.doctor.name
        const changed = name.split(' ')[0]
        return (
            <ImageBackground source={Background} style={{ width: "100%", height: "100%" }}>
                <Animatable.View animation="slideInLeft" style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>

                    <Animatable.View animation="zoomIn" style={{ width: "70%", backgroundColor: "#B44241", flex: 0.8, justifyContent: "center", alignItems: "center", borderRadius: 160, borderBottomWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderLeftWidth: 1 }}>
                        <View style={{ width: "70%", backgroundColor: "#ED8637", flex: 0.7, justifyContent: "center", alignItems: "center", borderRadius: 100, borderBottomWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderLeftWidth: 1 }}>
                            <View style={{ width: "70%", height: "70%", borderRadius: 100, borderBottomWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderLeftWidth: 1 }}>
                                <Animatable.Image source={Logo} style={{ width: "100%", height: "100%", borderRadius: 100 }}></Animatable.Image>
                            </View>
                        </View>
                    </Animatable.View>
                    <View style={{ marginTop: 20,paddingHorizontal:30 }}>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "white" }}>Hello Doctor {changed}</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 30, color: "white" }}>Manage Your Patients</Text>
                    </View>

                    <View style={{ marginTop: 50 }}>
                        <TouchableOpacity delayLongPress={0} style={{ backgroundColor: "#ED8637", padding: 20, borderRadius: 20, marginBottom: 20 }} onPress={() => {Actions.patientsList()}}>
                            <Animatable.Text animation="pulse" iterationCount="infinite" style={{ fontSize: 20, textAlign: "center", color: "white", fontWeight: "bold" }}>View Patients</Animatable.Text>
                        </TouchableOpacity>
                        <TouchableOpacity delayLongPress={0} style={{ backgroundColor: "#3385ff", padding: 20, borderRadius: 20, marginLeft: "auto", marginRight: "auto" }} onPress={() => { Actions.addpatient() }}>
                            <Animatable.Text animation="pulse" iterationCount="infinite" style={{ fontSize: 20, textAlign: "center", color: "white", fontWeight: "bold" }}>Add New Patient</Animatable.Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ImageBackground>
        )
    }else{
        return<View><Image style={{width:"100%",height:"100%"}} source={Loader}></Image></View>
    }
    }
    }


const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInScreen)

