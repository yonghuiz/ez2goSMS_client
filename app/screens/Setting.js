import React, { Component } from 'react'
import {
    View,
    StatusBar,
    TouchableOpacity,
    Keyboard,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {
    SYNC_INTERVAL_SEC,
    saveData,
    SMS_URLS,
    SMS_COUNT_LIMIT,
} from '../config/config'
import ZIPText from '../component/ZIPText'
import CommonTextInput from '../component/CommonTextInput'
// import Hud from 'react-native-lyhud'
import { Navigation } from 'react-native-navigation'

export default class Setting extends Component{

    constructor(props) {
        super(props);
        this.state = {
            interval: ''+SYNC_INTERVAL_SEC,
            hudType:'none',
            smsLimit: ''+SMS_COUNT_LIMIT,
            stopCount:0,
        }
    }
    // showHud(type,msg,after=null){
    //     if (this.state.hudType !== type) {
    //         this.setState({
    //             hudType:type,
    //         },()=>{this.hud.show(msg,after);})
    //     } else {
    //         this.hud.show(msg,after);
    //     }
    // }

    render(){     
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar barStyle="light-content" animated={true}/>
                <KeyboardAwareScrollView
                    style={{flex: 1}}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        padding: 8,
                    }}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <CommonTextInput
                        leftTitle={"Interval"}
                        rightTitle={"Seconds"}
                        placeholder={'Enter Time Interval'}
                        placeholderTextColor={'lightgray'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        underlineColorAndroid={'transparent'}
                        value={this.state.interval}
                        keyboardType={"numeric"}
                        onChangeText={(text) => {
                            this.setState({
                                interval: text,
                            })
                        }}
                    />
                    <CommonTextInput
                        leftTitle={"SMS Limit"}
                        rightTitle={"Per Request"}
                        placeholder={'Enter SMS Limit'}
                        placeholderTextColor={'lightgray'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        underlineColorAndroid={'transparent'}
                        value={this.state.smsLimit}
                        keyboardType={"numeric"}
                        disable={true}
                        onChangeText={(text) => {
                            this.setState({
                                smsLimit: text,
                            })
                        }}
                    />
                    <CommonTextInput
                        leftTitle={"SMS_URL"}
                        placeholder={'SMS_URL'}
                        placeholderTextColor={'lightgray'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        underlineColorAndroid={'transparent'}
                        value={SMS_URLS[0].get}
                        disable={true}
                    />
                    
                    <TouchableOpacity
                        style={{
                            height: 50,
                            backgroundColor: 'green',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 3,
                            marginTop: 16,
                        }}
                        activeOpacity={1}
                        onPress={() => {
                            let sec = Number(this.state.interval);
                            console.log('sec:'+sec);
                            if(Number.isNaN(sec)||sec<=0||sec>300){
                                alert('please input between 1 sec and 300 second');
                                return;
                                //this.showHud('error','please input between 1 sec and 300 second',2000);
                            }
                            saveData(this.state.interval,this.state.smsLimit);
                            this.props.onSave();
                            // this.props.navigator.pop();
                            Navigation.pop(this.props.componentId);
                            
                        }}
                    >
                        <ZIPText style={{color:'white',fontSize:16}}>
                            Save
                        </ZIPText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            height: 50,
                            backgroundColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 3,
                            marginTop: 16,
                        }}
                        activeOpacity={1}
                        onPress={() => {
                            
                            if(this.state.stopCount==0){
                                this.setState({stopCount:this.state.stopCount+1})
                                return;
                            }
                            this.props.onStop();
                            // this.props.navigator.pop();
                            Navigation.pop(this.props.componentId);
                            
                        }}
                    >
                        <ZIPText style={{color:'white',fontSize:16}}>
                            {this.state.stopCount==0?'Stop Timer':'Confirm to Stop Timer'}
                        </ZIPText>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
                {/* <Hud hudType={this.state.hudType} ref={r=>this.hud = r}/>  */}
            </View>
        );
    }
}