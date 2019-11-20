import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import HeaderComp from '../patientslist/header/header'
import { addrecord } from '../../store/actions/dataActions'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
class addRecord extends Component {
    constructor() {
        super()
        this.state = {
            checkupDate: '',
            medicineSuggested: '',
            cost: ''

        }
    }
    render() {
        const id = this.props.id
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <Header backgroundColor="white"
                    leftComponent={<TouchableOpacity delayLongPress={0}><Icon name="chevron-left" size={25} color="green" onPress={() => { Actions.history() }}></Icon></TouchableOpacity>}
                ></Header>
                <KeyboardAwareScrollView>
                    <View style={styles.inputView}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", color: "#00ace6" }}>Add New Record</Text>

                        <TextInput placeholder="Enter Check Up Date" style={styles.inputs} onChangeText={(checkupDate) => { this.setState({ checkupDate }) }}></TextInput>

                        <TextInput placeholder="Enter Medicines You Suggested" style={styles.inputs} onChangeText={(medicineSuggested) => { this.setState({ medicineSuggested }) }}></TextInput>
                        <TextInput placeholder="Enter Cost" style={styles.inputs} onChangeText={(cost) => { this.setState({ cost }) }}></TextInput>
                        <TouchableOpacity delayLongPress={0} style={styles.buttons} onPress={() => { this.props.addrecord(this.state, id) }}>
                            <Text style={styles.buttontext}>Add To History</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    inputs: {
       
        borderRadius: 10,
        height: 40,
        marginTop: 20,
        padding: 5,
        paddingLeft: 10,
        borderBottomWidth : 2,


    },
    inputView: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 100,
        lineHeight: 20,


    },
    buttons: {
        backgroundColor: "#00ace6",
        width: 180,
        height: 50,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10

    },
    buttontext: {
        color: "white",
        fontSize: 18,
    }

})

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        id: state.dataReducer.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        addrecord: (data, id) => dispatch(addrecord(data, id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addRecord)