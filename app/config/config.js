// import { Dimensions} from 'react-native'
// import  AsyncStorage  from '@react-native-async-storage/async-storage'
// import Storage from 'react-native-storage'
// import './Colors'

// let storage = new Storage({
//     size: 1000,
//     storageBackend: AsyncStorage,
//     defaultExpires: null,
// });

let loadData=()=>{
    storage.load({key:'SyncTimeInterval'})
        .then(ret=>{
            console.log('loadSyncTimeInterval:'+ret)
            SYNC_INTERVAL_SEC=ret
        })
        .catch(err=>console.log(err))

    storage.load({key:'SmsCountLimit'})
    .then(ret=>{
        console.log('loadSmsCountLimit:'+ret)
        SMS_COUNT_LIMIT=ret
    })
    .catch(err=>console.log(err))
}
loadData();
export var SMS_URLS = [
    // {get:'http://api.zipcodexpress.com/zpi/MessageSms/getMessageList'
    // ,update:'http://api.zipcodexpress.com/zpi/MessageSms/updateMessage'},
    // {get:'http://zipcodexpress.unibox.com.cn/zpi/MessageSms/getMessageList'
    // ,update:'http://zipcodexpress.unibox.com.cn/zpi/MessageSms/updateMessage'},
    {get:'https://smss.unibox.com.cn/app/Message/getMessageListN'
    ,update:'https://smss.unibox.com.cn/app/Message/updateMessage'},
    {get:'https://smss.ez2gosms.us/app/Message/getMessageListN'
    ,update:'https://smss.ez2gosms.us/app/Message/updateMessage'},
]
export var SYNC_INTERVAL_SEC = 30;
export function saveData(interval,smsLimit){
    SYNC_INTERVAL_SEC = Number(interval);
    storage.save({key:'SyncTimeInterval',data:SYNC_INTERVAL_SEC});
    SMS_COUNT_LIMIT = Number(smsLimit);
    storage.save({key:'SmsCountLimit',data:SMS_COUNT_LIMIT});  
}

// export const ScreenSize = ({
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
    
// });
export const zipNavigatorStyle = {
    navBarBackgroundColor: 'green',
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    navBarTitleTextCentered: true,
}


//check version
export const GET_APP_VERSION = 'app/version';
//get messagelist
export const GET_MESSAGELIST = 'MessageSms/getMessageList'
// export const GET_MESSAGELIST = 'Message/getMessageList'
//update messate
export const UPDATE_MESSAGE = 'MessageSms/updateMessage'
// export const UPDATE_MESSAGE = 'Message/updateMessage'
//max sms number per request
export var SMS_COUNT_LIMIT = 1;
export const GET_APP_KEY_URL = 'login/getAppKeyInfo';
export const UPDATE_APP_KEY_FLAG = 'login/updateAppkeyflag';

