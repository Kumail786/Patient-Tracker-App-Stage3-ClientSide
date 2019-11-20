import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput, SafeAreaView,ActivityIndicator } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchBar from 'react-native-search-bar';
import Background from '../../images/pat.jpg'
import { connect } from 'react-redux'
import { getPatients } from '../../store/actions/dataActions'
import { Actions } from 'react-native-router-flux';
import { logOut, idGetter } from '../../store/actions/authActions';
import { ListItem } from 'react-native-elements'
import Loader from '../../images/laoder.gif'
import * as Animatable from 'react-native-animatable'
class Patientlist extends Component {

    constructor() {
        super()
        this.state = {
            keyword: '',
            loading: true,

        }

    }
    async UNSAFE_componentWillMount() {
        this.props.getPatients()
        await this.setState({
            logout: false
        })
    }
    async UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.patients) {
            await this.setState({
                loading: false
            })
        }

    }


    render() {
        const patients = this.props.patients
        
        var totalpatients = 0



        if (!this.state.logout && !this.state.loading) {
            

            return (

                <View style={{ width: "100%", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", flex: 1 }}>
                    <Header backgroundColor={"white"}
                        leftComponent={<TouchableOpacity onLongPress={() => { Actions.loggedIn() }}><Icon name="chevron-left" size={25} color="green" onPress={() => { Actions.loggedIn() }}></Icon></TouchableOpacity>}
                        centerComponent={<Animatable.View animation="slideInLeft" style={{ width: "130%", borderRadius: 10, borderRightWidth: 2, borderTopWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2, paddingTop: 10 }}>
                            <TextInput placeholder="Search For The Patient" style={{ textAlign: "center" }} onChangeText={(keyword) => { this.setState({ keyword }) }}></TextInput>
                        </Animatable.View>}
                        rightComponent={<Icon name="sign-out" size={25} color="red" onPress={async () => {

                            this.props.logOut()
                            await this.setState({
                                logout: true
                            })
                        }}></Icon>}
                    />

                    <SafeAreaView>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Animatable.View animation="slideInUp" style={{ marginBottom: 100 }}>


                                <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", padding: 10, color: "#ff9933" }}>Total Patients : {patients.length}</Text>


                                {patients && patients.filter(items => (items.name).toLowerCase().includes(this.state.keyword)).map(patient => {
                                    const docid = this.props.auth.auth.doctor._id
                                    if (patient.docid == docid) {
                                        totalpatients = totalpatients + 1
                                        return (

                                            <ListItem
                                                key={patient._id}
                                                title={<View><Text style={{ fontSize: 20, textTransform: "capitalize", fontWeight: "bold" }}>{patient.name}</Text></View>}
                                                bottomDivider
                                                pad={20}
                                                rightIcon={<Icon name="chevron-right" size={25} color="#00ace6" onPress={() => { this.props.idGetter(patient._id) }}></Icon>}
                                                leftIcon={<Icon name="user" color="#33cc33" size={25}></Icon>}
                                                subtitle={<View style={{ paddingTop: 10 }}><Text>Disease : {patient.disease}</Text><Text>Date Of Appointment : {patient.dateOfArrival}</Text></View>}
                                            />
                                        )
                                    }
                                })}
                            </Animatable.View>
                        </ScrollView>
                    </SafeAreaView>



                </View>

            )
        } else {
            return <View>
            <Header backgroundColor={"white"}
                        leftComponent={<TouchableOpacity onLongPress={() => { Actions.loggedIn() }}><Icon name="chevron-left" size={25} color="green" onPress={() => { Actions.loggedIn() }}></Icon></TouchableOpacity>}
                        centerComponent={<Animatable.View animation="slideInLeft" style={{ width: "130%", borderRadius: 10, borderRightWidth: 2, borderTopWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2, paddingTop: 10 }}>
                            <TextInput placeholder="Search For The Patient" style={{ textAlign: "center" }} onChangeText={(keyword) => { this.setState({ keyword }) }}></TextInput>
                        </Animatable.View>}
                        rightComponent={<Icon name="sign-out" size={25} color="red" onPress={async () => {

                            this.props.logOut()
                            await this.setState({
                                logout: true
                            })
                        }}></Icon>}
                    />
                    <View style={{marginVertical:200}}>
                <ActivityIndicator size="large" color="orange"  />
                </View>
                </View>
        }

    }
}
const mapStateToProps = (state) => {
    return {
        patients: state.dataReducer.patients,
        auth: state.authReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        logOut: () => dispatch(logOut()),
        idGetter: (id) => dispatch(idGetter(id)),
        getPatients: () => dispatch(getPatients())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patientlist)
