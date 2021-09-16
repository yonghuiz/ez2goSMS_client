
import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    FlatList,
    SectionList,
    Image,
    BackAndroid,
    TouchableWithoutFeedbackBase,
} from 'react-native';
import { Navigation } from 'react-native-navigation'
import {
    SYNC_INTERVAL_SEC,
    // ScreenSize,
    zipNavigatorStyle,
    GET_APP_VERSION,
    SMS_URLS,
    GET_MESSAGELIST,
    UPDATE_MESSAGE,
    SMS_COUNT_LIMIT,
    IsProductVersion,
}
    from '../config/config'
import timeFormat from '../utils/timeFormat'
import SmsAndroid from 'react-native-sms-android'
// import Icon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Ionicons'
import Wakeful from 'react-native-wakeful';
import KeepAwake from 'react-native-keep-awake';
var PushNotification = require('react-native-push-notification');
import BackgroundTimer from 'react-native-background-timer';

///////////////////
import BackgroundJob from 'react-native-background-job';
// import Setting from './Setting';
var viewObj = null;
var isJobRunning = false;
var isJobStarted = false;
BackgroundJob.register({
    jobKey: 'myJob',
    job: () => {
        if (isJobRunning) return;
        isJobRunning = true;
        let count = 0;
        console.log(">>>>>Background Job started!")
        // viewObj.addLog('Job Started','info');
        // viewObj.startTimer()
        // setInterval(()=>{
        //     count++;
        //     // if(count%SYNC_INTERVAL_SEC==0){
        //         console.log(">>>>>Background Job runed!--"+count);
        //         // viewObj.onTimer.call(viewObj);
        //     // }
        // },1000);
    }
});
function startJob() {
    if (isJobStarted) return;
    isJobStarted = true;
    console.log('startJob()');
    BackgroundJob.schedule({
        jobKey: "myJob",
        //allowExecutionInForeground:true,
        //networkType: BackgroundJob.NETWORK_TYPE_UNMETERED,
        //allowWhileIdle:true,
        period: 5 * 1000,
        timeout: 5 * 1000,
    });
}
function stopJob() {
    BackgroundJob.cancel({ jobKey: 'myJob' });
}
////////////////////


export default class Home extends Component {

    static options() {
        return {
            topBar: {
                title: {
                    text: 'Home Screen',
                },
                rightButtons: 
                    {
                        id: 'Setting',
                        text: 'Setting',
                        color: 'white',
                        //     component: {
                        //   name: 'Setting',

                        //     },
                    },
           
            },
            bottomTab: {
                icon: require('../../assets/images/aboutus.png'),
                text: 'home',
                iconColor: 'red',
    textColor: 'red'
            }

        }
    };

constructor(props) {
    console.log('Home constructor()');
    super(props);
    this.state = {
        result: 'ready to start, interal:' + SYNC_INTERVAL_SEC + ' seconds',
        text: 'This is the sms text',
        logs: [],
    }
    this.newLogs = [];
    this.isRunning = false;
    this.counter = 0;
    this.urlIndex = 0;
    this.preCounter = 0;
    this.sendingCounter = 0;
    this.isSending = false;
    Icon.getImageSource('settings', 20,)
        .then(source => {


            // this.props.navigator.setButtons({
            //     rightButtons: [
            //         {
            //             id: 'settings',
            //             icon: source,
            //         }
            //     ],
            //     animated: true
            // })
        })
        .catch(err => {

        });

    Navigation.events().bindComponent(this);


    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    let wakeful = new Wakeful();
    wakeful.acquire();
    viewObj = this;
    startJob();
}

navigationButtonPressed({ buttonId }) {
    if (buttonId = 'Setting') {

        Navigation.push(this.props.componentId, {
            component: {
                name: 'Setting',
                passProps: {
                    onSave: this.restartTimer.bind(this),
                    onStop: this.stopTimer.bind(this),
                },
                options: {
                    topBar: {
                        title: {
                            text: 'Setting',
                            color: 'white'
                        }

                    },
                    bottomTab: {
                        text: 'Home',
                        color: 'red'
                    }

                }
            },

        });

    }
}



componentWilllMount() {
    console.log('Home componentWillMount()');
    this.addLog(this.state.result, 'info');
    this.startTimer();
    BackgroundTimer.clearInterval(this.moniterTimer);
    this.moniterTimer = BackgroundTimer.setInterval(this.onMoniterTimer.bind(this), 1000 * 60 * 30);
    this.addLog('start monitor timer', 'info');


}

componentWillUnmount() {
    this.stopTimer();
    BackgroundTimer.clearInterval(this.moniterTimer);
    PushNotification.cancelLocalNotifications({ id: '2' });
}

startTimer() {
    console.log('Home startTimer()');
    this.notify('timer started', 'green')
    if (this.isRunning) return;
    this.addLog('timer started, interal:' + SYNC_INTERVAL_SEC + ' seconds', 'info');
    BackgroundTimer.clearInterval(this.timer);
    this.timer = BackgroundTimer.setInterval(this.onTimer.bind(this), 1000 * SYNC_INTERVAL_SEC);
    this.sync_time_interval = SYNC_INTERVAL_SEC;
    this.isRunning = true;
    this.setStatusMsg();
    //this.onTimer();

}
setStatusMsg() {
    let runStatus = this.isRunning ? 'timer started' : 'timer stopped';
    this.setState({
        result: runStatus + ', interal:' + SYNC_INTERVAL_SEC + ' seconds, limit:' + SMS_COUNT_LIMIT
    });
}
stopTimer() {
    console.log('Home stopTimer()');
    if (!this.isRunning) return;
    BackgroundTimer.clearInterval(this.timer);
    this.notify('timer stopped', 'red');
    this.isRunning = false;
    this.setStatusMsg();
    this.addLog('timer stopped, interal:' + SYNC_INTERVAL_SEC + ' seconds', 'error');
}
restartTimer() {
    this.setStatusMsg();
    if (!this.isRunning || this.sync_time_interval === SYNC_INTERVAL_SEC)
        return;
    this.addLog('restartTimer,interal:' + SYNC_INTERVAL_SEC + ' seconds', 'info');
    this.sync_time_interval = SYNC_INTERVAL_SEC;
    BackgroundTimer.clearInterval(this.timer);
    this.timer = BackgroundTimer.setInterval(this.onTimer.bind(this), 1000 * SYNC_INTERVAL_SEC);
}

addLog(msg, type = 'info') {
    let time = new Date();
    this.newLogs.unshift({ key: time.Format('hh:mm:ss ') + msg, type: type });
    if (this.newLogs.length > 1000)
        this.newLogs.pop();
    this.setState({ logs: this.newLogs.slice() });
}

sendSMS(sms, getSMSUrl, updateMessageUrl) {
    // let full_number=sms.countryCode+sms.phone;
    let full_number = sms.countryCode + sms.phone;
    full_number = full_number.split(' ').join('');
    full_number = full_number.split('(').join('');
    full_number = full_number.split(')').join('');
    full_number = full_number.split('-').join('');

    SmsAndroid.sms(
        full_number, // phone number to send sms to
        sms.message, // sms body
        'sendDirect', // sendDirect or sendIndirect
        (err, message) => {
            // this.isSending=false;
            if (err) {
                console.log("error");
                this.addLog(`[error ${this.counter}] ${full_number},${sms.messageId},${sms.message}`, 'error');
                this.reportStatus.call(this, sms.messageId, '3', updateMessageUrl);
            } else {
                console.log(message); // callback message
                let smsCount = this.getSMSCount(sms.message);
                this.addLog(`[success ${this.counter}-${smsCount}] ${full_number},${sms.messageId},${sms.message}`, 'success');
                this.reportStatus.call(this, sms.messageId, '2', updateMessageUrl, smsCount);
            }
            setImmediate(() => { this.handleSMS.call(this, getSMSUrl, updateMessageUrl) });
        }
    );

}
getSMSCount(sms) {
    let smsLenLimit = 160;
    if (sms.search(/[^\x00-\x7F]/) != -1)
        smsLenLimit = 70;
    return Math.ceil(sms.length / smsLenLimit);
}
reportStatus(smsId, status, updateMessageUrl, smsCount) {
    let requestURL = `${updateMessageUrl}?messageId=${smsId}&status=${status}&messageNumber=${smsCount}`;
    console.log(requestURL)
    fetch(requestURL)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(`update message status ${smsId} ${json.msg}`, 'success');
        })
        .catch(err => {
            this.addLog(`update message status ${smsId} error:${err}`, 'error');
        });
    console.log(`report status: smsID: ${smsId}, status:${status}`);
}
getDomain(url) {
    let right = url.substr(7);
    let end = right.search('/');
    return right.substr(0, end);
}
handleSMS(getSMSUrl, updateMessageUrl) {
    let requestURL = `${getSMSUrl}?limit=${SMS_COUNT_LIMIT}`;

    fetch(requestURL)
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.counter += 1;
            this.addLog(this.counter + ',' + this.getDomain(getSMSUrl), 'info');

            console.log(json);
            if (json.ret != 0) {
                this.addLog(this.counter + 'get sms error:' + json.msg, 'error');
                this.isSending = false;
                return;
            }
            let SMSList = json.data.smsList || json.data.messageList;
            this.addLog(this.counter + ',get sms ' + SMSList.length, 'info');
            if (SMSList.length == 0)
                this.isSending = false;
            SMSList.forEach(sms => {
                this.sendSMS.call(this, sms, getSMSUrl, updateMessageUrl);
            });


        })
        .catch(err => {
            this.isSending = false;
            this.addLog('fetch exception:' + requestURL + err, 'error');
        })
}

onTimer() {
    if (this.isSending === true) {
        this.addLog('sending sms,skip', 'info');
        this.sendingCounter++;
        if (this.sendingCounter * SYNC_INTERVAL_SEC > 60)
            this.isSending = false;
        return;
    }
    this.isSending = true;
    this.sendingCounter = 0;

    let url = SMS_URLS[this.urlIndex++ % SMS_URLS.length];
    this.handleSMS.call(this, url.get, url.update);

}

onMoniterTimer() {
    this.addLog(`moniter:${this.preCounter},${this.counter}`, 'info');
    if (this.preCounter == this.counter) {
        this.isSending = false;
        SmsAndroid.sms(
            '+15127347755', // phone number to send sms to
            'SMSGateway not runing for 30 mins', // sms body
            'sendDirect', // sendDirect or sendIndirect
            (err, message) => {
                if (err) {
                    console.log("error");
                } else {
                    console.log(message); // callback message
                }
            }
        );
        setTimeout(() => { BackAndroid.exitApp() }, 10 * 1000);
    }
    this.preCounter = this.counter;
}

notify(msg, color) {
    PushNotification.localNotification({
        id: '2',
        autoCancel: false,
        ongoing: true,
        message: msg,
        color: color,
        number: '10',
        repeatType: 'minute',
    })
}

render() {
    console.log('Home render()');
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/ez2goSMS_logo.png')}
            />

            <View style={styles.logcontainer}>
                <FlatList
                    data={this.state.logs}
                    renderItem={({ item }) => <Text style={{ color: this.getLogTextColor(item.type), marginLeft: 5, fontSize: 14, }}>{item.key}</Text>}
                />
            </View>


            <View style={{ flexDirection: 'row' }}>
                <View style={styles.button}>
                    <Button
                        color='blue'
                        title='Get'
                        onPress={this.onTimer.bind(this)}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color='green'
                        title='Start'
                        onPress={this.startTimer.bind(this)}
                    />
                </View>
                {!IsProductVersion &&
                    <View style={styles.button}>
                        <Button
                            title='Stop'
                            color={Color.red}
                            onPress={this.stopTimer.bind(this)}
                        />
                    </View>
                }
            </View>
            <Text style={{ color: this.isRunning ? 'green' : 'red' }}>
                {this.state.result}
            </Text>
            <KeepAwake />
        </View>
    );
}
getLogTextColor(type = 'info') {
    let color = 'white';
    if (type == 'error')
        color = 'red';
    else if (type == 'success')
        color = 'green';

    return color;
}

}
Navigation.setDefaultOptions({
    statusBar: {
        backgroundColor: '#4d089a'
    },
    topBar: {
        title: {
            color: 'white'
        },
        backButton: {
            color: 'white'
        },
        background: {
            color: '#4d089a'
        }
    },
    bottomTab: {
        fontSize: 14,
        selectedFontSize: 14,
       
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        margin: 20,
        backgroundColor: 'green',
        //height:40
    },
    logcontainer: {
        height: screenSize.height - 300,
        width: '90%',
        backgroundColor: 'black'
    },
    item: {
        color: 'white',
        marginLeft: 5,
        fontSize: 12,
    }
});
