import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput, SafeAreaView,ActivityIndicator } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { logOut } from '../../store/actions/authActions'
import { Actions } from 'react-native-router-flux';
import { getHistory } from '../../store/actions/dataActions'
import Loader from '../../images/laoder.gif'
import { ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
    ;
class PatientHistory extends Component {

    constructor() {
        super()
        this.state = {
            keyword: '',
            loading: true,
            patient : {}
        }

    }
    async UNSAFE_componentWillMount() {

        this.props.getHistory(this.props.id)

    }


    async UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        console.log(nextProps.patient)
        console.log(this.state)
        await this.setState({
            loading: false,
            patient : nextProps.patient
        })
    }

    render() {

        
        if (!this.state.loading) {
            const history = this.state.patient.history
console.log(history)

            return (

                <View style={{ width: "100%", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", flex: 1 }}>
                    <Header backgroundColor={"white"}
                        leftComponent={<TouchableOpacity delayLongPress={0}><Icon name="chevron-left" size={25} color="green" onPress={() => { Actions.patientsList() }}></Icon></TouchableOpacity>}
                        centerComponent={<Animatable.View animation="slideInLeft" style={{ width: "130%", borderRadius: 10, borderRightWidth: 2, borderTopWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2, paddingTop: 10 }}>
                            <TextInput placeholder="Search History By CheckUp Date" style={{ textAlign: "center" }} onChangeText={(keyword) => { this.setState({ keyword }) }}></TextInput>
                        </Animatable.View>}
                        rightComponent={<Icon name="sign-out-alt" size={25} color="red" onPress={async () => {
                            this.props.logOut()
                            await this.setState({
                                logout: true
                            })
                        }}></Icon>}
                    />
                    <SafeAreaView>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Animatable.View animation="slideInUp" style={{ marginBottom: 100 }}>
                                <Animatable.Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", padding: 10, color: "#ff9933" }} animation="zoomIn">Visited : {history ? history.length : 0} Times</Animatable.Text>
                                {history && history
                                    .filter(items => (items.checkupDate).toLowerCase().includes(this.state.keyword))
                                    .map(data => {

                                        return (
                                            <ListItem
                                                key={data}
                                                title={<View><Text style={{ fontSize: 15, textTransform: "capitalize" }}>Checkup Date : {data.checkupDate}</Text></View>}
                                                bottomDivider
                                                pad={20}

                                                leftIcon={<Icon name="file-medical" color="red" size={25}></Icon>}
                                                subtitle={<View style={{ paddingTop: 10 }}><Text>Medicines : {data.medicineSuggested}</Text><Text>Cost : {data.cost}</Text></View>}
                                            />
                                        )
                                    }
                                    )}

                                <TouchableOpacity delayLongPress={0} style={{ alignItems: "center", width: "60%", marginLeft: "auto", marginRight: "auto", backgroundColor: "orange", padding: 20, marginTop: 20, borderRadius: 20 }} onPress={() => { Actions.addrecord() }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Add New Record</Text></TouchableOpacity>
                            </Animatable.View>
                        </ScrollView>
                    </SafeAreaView>



                </View>

            )
        }
        else {
            return <View>
                 <Header backgroundColor={"white"}
                        leftComponent={<TouchableOpacity delayLongPress={0}><Icon name="chevron-left" size={25} color="green" onPress={() => { Actions.patientsList() }}></Icon></TouchableOpacity>}
                        centerComponent={<Animatable.View animation="slideInLeft" style={{ width: "130%", borderRadius: 10, borderRightWidth: 2, borderTopWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2, paddingTop: 10 }}>
                            <TextInput placeholder="Search History By CheckUp Date" style={{ textAlign: "center" }} onChangeText={(keyword) => { this.setState({ keyword }) }}></TextInput>
                        </Animatable.View>}
                        rightComponent={<Icon name="sign-out-alt" size={25} color="red" onPress={async () => {
                            this.props.logOut()
                            await this.setState({
                                logout: true
                            })
                        }}></Icon>}
                    />
                    <View style={{marginVertical:200}}>
                        <ActivityIndicator size="large" color="orange"/>
                    </View>
            </View>
        }

    }
}
const mapStateToProps = (state) => {
    return {
        patient: state.dataReducer.history,
        auth: state.authReducer,
        id: state.dataReducer.id,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        getHistory: (id) => dispatch(getHistory(id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHistory)
