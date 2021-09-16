/**
 * Created by  Richard Zhu on 2021/09/10.
 */
//  export const ROOT_URL = 'https://smss.ez2gosms.us/';
//  export const BASE_URL = ROOT_URL+'app/';
//LOGIN
// export const LOGIN_REGISTER = "login/register";
export const LOGIN_LOGIN_URL = BASE_URL+'login/login'
// export const LOGIN_FORGET_PSD = "login/forgetPsd";
// export const LOGIN_RESET_PSD = "login/resetPsd";



//check version
export const GET_APP_VERSION = 'app/version';

//PROFILE
// export const UPDATE_PROFILE = "Address/insertAddress";
// export const SWITCH_SERVICE_MODE = "member/switchServiceMode";
// export const GET_MEMBER = 'member/getMember';
// export const GET_STATEMENT_LIST = 'statement/getStatementList';
// export const GET_CREDIT_CARD_LIST = 'CardCredit/getCardCreditList';
// export const MODIFY_PROFILE = 'Profile/updateProfile';
// export const GET_STATE_LIST = 'state/getStateList';
// export const GET_TRANSACTION_LIST = 'transaction/getTransactionList';


// //VCODE
// export const CHECK_VCODE = "VCode/checkVCode";
// export const GET_VCODE = "VCode/getVCode";
// export const RE_LOGIN = "VCode/login";

// export function post_data(url,data){
//     // console.log('post_data:',url,data);
//     let params = new FormData();
//     for(let prop in data)
//         params.append(prop, data[prop]);
//         //console.log ("params:",params);
//     let promise = new Promise((resolve,reject)=>{
//         fetch(url, {
//             method: 'POST',
//             body:params,
//           })
//           .then(response =>{ return response.json()})
//           .then(json=>{
//                 if(json.ret===1){
//                     localStorage.clear();
//                     reject('Please login again.');
//                 }
//                 if(json.ret!==0) 
//                     reject(json.msg);
//                 resolve(json.data||{});
//           })
//           .catch((error) =>{
//                 reject(error);
//           })
//     })
//     return promise;
    
// }

// export function get_data(url,params){
//     let p = '';
//     for(let prop in params){
//         if(p==='') 
//         p+='?';
//         else 
//         p+='&';
//         p += prop +'='+ params[prop];
//     }
//     // console.log('get_data:',url+p);
//     let promise = new Promise((resolve,reject)=>{
//         fetch(url+p)
//           .then(response =>{ return response.json()})
//           .then(json=>{
//                 if(json.ret===1){
//                     localStorage.clear();
//                     reject('Please login again.');
//                 }
//                 if(json.ret!==0) 
//                     reject(json.msg);
//                 resolve(json.data||[]);
//           })
//           .catch((error) =>{
//                 reject(error);
//           })
//     })
//     return promise;
    
// }
// function checkToken(data){
//     if(data==null) data={};
//     data._accessToken = localStorage.getItem('accessToken');
//     data._memberId = localStorage.getItem('memberId');
//     if(data._accessToken==null)
//     return new Promise((resolve,reject)=>{
//          reject('please login again');
//      })
//     return null;
// }
// export function post_data_token(url,data){
//     let ret = checkToken(data);
//     if(ret!=null) return ret;
//     return post_data(url,data);
// }
// export function get_data_token(url,data){
//     let ret = checkToken(data);
//     if(ret!=null) return ret;
//     return get_data(url,data);
// }


// export function logout(){
//     localStorage.clear();
// }

// export function login(phone,password){
//     // console.log('====login===')    
//     let promise = new Promise((resolve,reject)=>{ 
//         post_data(LOGIN_LOGIN_URL,{
//             phone:phone,
//             psd:password,
//         }).then(data=>{
//             localStorage.setItem('accessToken',data.accessToken);
//             localStorage.setItem('memberId',data.memberId);
//             localStorage.setItem('isProfileCompleted',data.is_profile_completed);
//             localStorage.setItem('isEmailVerified',data.is_email_verified);
//             resolve(data);
//         }).catch(error=>{
//             localStorage.clear();
//             reject(error);
//         })
//     })
//     return promise;
// }
