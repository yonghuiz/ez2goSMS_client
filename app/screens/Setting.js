import React, { useState, Component } from 'react'
import {
    View,
    StatusBar,
    TouchableOpacity,
    Picker,
    Text,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import {
    SYNC_INTERVAL_SEC,
    saveData,
    SMS_URLS,
    SMS_COUNT_LIMIT,
    GET_APP_KEY_URL,
    UPDATE_APP_KEY_FLAG
} from '../config/config'
import ZIPText from '../component/ZIPText'
import CommonTextInput from '../component/CommonTextInput'
 import Hud from 'react-native-lyhud'
import { Navigation } from 'react-native-navigation'
import DropDownPicker from 'react-native-dropdown-picker'

export default class Setting extends Component {
    static options() {
        return {
            topBar: {
                title: {
                    text: 'Setting Screen',
                },

            },
            bottomTab: {
                icon: require('../../assets/images/camera.png'),
                text: 'Settings',
                iconColor: 'red',
                textColor: 'black'

            }

        }
    };
    constructor(props) {
        super(props);
        this.state = {
            interval: '' + SYNC_INTERVAL_SEC,
            hudType: 'none',
            smsLimit: '' + SMS_COUNT_LIMIT,
            stopCount: 0,
            apps: [],
            appKey: '',
            appSecret: '',
            appKeyflag: 0,
        }
        this.handleChangeAppKey = this.handleChangeAppKey.bind(this);
        // this.updateAppKeyflag = this.updateAppKeyflag.bind(this)


    }
    showHud(type,msg,after=null){
        if (this.state.hudType !== type) {
            this.setState({
                hudType:type,
            },()=>{this.hud.show(msg,after);})
        } else {
            this.hud.show(msg,after);
        }
    }

    componentDidMount() {
        this.getAppKeys();
    }

    getAppKeys() {
  
        netWork('GET', GET_APP_KEY_URL, null, true)
            .then(json => {
                // json.data.App.map(app => ({key : app.app_id, value:app.app_key}));
                this.setState({
                    apps: json.data.App,
                    appKey: json.data.App[0].app_key,
                    appSecret: json.data.App[0].app_secret,
                });
                console.log("getAppKeys", json.data.App)
            })
            .catch(err => {
                this.setState({ apps: [] });
            })

    }

    updateAppKeyflag() {
        
        netWork('GET', UPDATE_APP_KEY_FLAG, 'appkeyflag=1', true)
        .then(json => {
            this.setState({
                hudType: 'success',
              
            }, () => {
                this.hud.show(json.msg, 1500);
            });
            this.time = setTimeout(() => {
                this.props.onSave;
                Navigation.pop(this.props.componentId);
                // this.props.navigator.pop();
            }, 1500)
        })
        .catch(err => {
            this.setState({
                hudType: 'error',
            }, () => {
                this.hud.show(err, 1500);
            })
        })
    }
    handleChangeAppKey(event) {
        let vals = event.target.value.split(',');
        this.setState({ appKey: vals[0], appSecret: vals[1] });
    }

    render() {

        return (

            <View style={{ flex: 1, backgroundColor: 'white', minHeight: 300 }}>
                <StatusBar barStyle="light-content" animated={true} />
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
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
                   
                  
                    <Text>
                        {`\n`}
                        APP ID + APP Key
                    </Text>
                    <Picker
                        selectedValue={this.state.apps[0]}
                        mode={'dropdown'}
                        onValueChange={value => this.setState({ appKey: value })}
                    >
                          {
                            this.state.apps.map(app =>
                                <Picker.Item label={app.app_id+'      '+app.app_key} value={app.app_id} />
                            )
                        }

                    </Picker>
                   
                    <ZIPText style={{ color: 'green', fontSize: 14 }}>
                        {`\n`}
                       App_ID Selected : {"    " + this.state.appKey + ", Please save it !"}
                    </ZIPText>
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
                            console.log('sec:' + sec);
                            if (Number.isNaN(sec) || sec <= 0 || sec > 300) {
                                alert('please input between 1 sec and 300 second');
                                return;
                                //this.showHud('error','please input between 1 sec and 300 second',2000);
                            }
                            saveData(this.state.interval, this.state.smsLimit);
                            this.updateAppKeyflag();
                            // this.props.onSave();
                            // this.props.navigator.pop();
                           
                        }}
                    >

                        <ZIPText style={{ color: 'white', fontSize: 16 }}>
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

                            if (this.state.stopCount == 0) {
                                this.setState({ stopCount: this.state.stopCount + 1 })
                                return;
                            }
                            this.props.onStop();
                            // this.props.navigator.pop();
                            Navigation.pop(this.props.componentId);

                        }}
                    >
                        <ZIPText style={{ color: 'white', fontSize: 16 }}>
                            {this.state.stopCount == 0 ? 'Stop Timer' : 'Confirm to Stop Timer'}
                        </ZIPText>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
                 <Hud hudType={this.state.hudType} ref={r=>this.hud = r}/> 
            </View>
        );
    }
}