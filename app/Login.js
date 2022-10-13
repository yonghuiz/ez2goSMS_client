
 import React, { PureComponent } from 'react'
 import {
     View,
    
        KeyboardAvoidingView,
     StyleSheet,
     TouchableOpacity,
     TouchableHighlight,
     Keyboard,
     NativeModules,
     Image,
     StatusBar,
 } from 'react-native'
 import Icon from 'react-native-vector-icons/Ionicons'
//  import SplashScreen from 'react-native-splash-screen'
 
 import Hud from 'react-native-lyhud'
  import {LOGIN_LOGIN_URL} from '../config/API'
 import {
     KeyboardAwareScrollView,
 } from 'react-native-keyboard-aware-scrollview'
import ZIPText from '../component/ZIPText'
  import { Navigation } from 'react-native-navigation'
   import * as Animatable from 'react-native-animatable'
  import CommonTextInput from '../component/CommonTextInput'

  const appPackage = require('../../app.json')
//  import { repeatPress } from '../RepeatPress'

 export default class Login extends PureComponent {
     loginEnable = true;
 
     // 构造
     constructor(props) {
         super(props);
         // 初始状态
 
         this.state = {
             useEmail: true,
 
             email: '',
             password: '',
 
             phoneNum: '',
             phonePsd: '',
 
             region: {
                 "Countries and Regions": "United States of America",
                 "chinese": "美国",
                 "country": "US",
                 "code": "1"
             },
 
             textOnly: false,
             hudType: 'none',
 
             showCount: false,
             count: 59,
             canSendVCode: true,
         }
         Navigation.events().bindComponent(this);
     }
 
     componentDidMount() {
        //  SplashScreen.hide();
         haveAlertLogin = false;
     }
 
     componentWillUnmount() {
         this.timeout && clearTimeout(this.timeout);
         this.interval && clearInterval(this.interval);
     }
 
    
    //  login() {
    //      this.loginEnable = false;
    //      if (this.state.phoneNum.length === 0) {
    //          return;
    //      }
 
    //      this.state.textOnly && this.setState({
    //          textOnly: false,
    //      });
    //      this.hud.show();
    //      let param = new FormData();
    //      param.append('phone', this.state.phoneNum);
    //      param.append('vid', this.state.vid);
    //      param.append('vcode', this.state.vCode);
    //      netWork('POST', CHECK_VCODE, param, false)
    //          .then(json => {
    //              if (json.ret === 0) {
    //                  this.setState({
    //                      hudType: 'success'
    //                  }, () => {
    //                      this.hud.show('success', 1500);
    //                  });
    //                  this.timeout = setTimeout(() => {
    //                      this.loginEnable = true;
    //                      userInfo.accessToken = json.data.accessToken;
    //                      userInfo.memberId = json.data.memberId;
    //                      userInfo.psd = json.data.psd;
    //                     {
    //                              storage.save({
    //                                  key: 'isLogin',
    //                                  data: true,
    //                                  expires: null,
    //                              });
    //                              storage.save({
    //                                  key: 'userInfo',
    //                                  data: {
    //                                      accessToken: userInfo.accessToken,
    //                                      memberId: userInfo.memberId,
    //                                      psd: userInfo.psd,
    //                                  },
    //                                  expires: null,
    //                              });
    //                                Navigation.setRoot({
    //                                      root: {
    //                                          stack: {
    //                                              id: 'Stack.Home2',
    //                                              children: [
    //                                                  {
    //                                                      component: {
    //                                                          id: 'ZipporaHome',
    //                                                          name: 'ZipporaHome',
    //                                                      },
    //                                                  },
    //                                              ],
    //                                          }
    //                                      }
    //                                  });
                                  
                                 
    //                          }
                         
    //                  }, 1500);
    //              }
    //          })
    //          .catch(err => {
    //              this.loginEnable = true;
    //              this.setState({
    //                  hudType: 'error'
    //              }, () => {
    //                  this.hud.show(err, 2000);
    //              });
    //          })
    //  }
 
     loginButtonColor() {
         if (this.state.useEmail) {
             if (this.state.email.length !== 0 && this.state.password.length !== 0) {
                 return 'rgba(42,187,103,1)'
             } else {
                 return 'rgba(42,187,103,0.5)'
             }
         } else {
             if (this.state.phoneNum.length !== 0 && this.state.phonePsd.length !== 0) {
                 return 'rgba(42,187,103,1)'
             } else {
                 return 'rgba(42,187,103,0.5)'
             }
         }
     }
 
     loginTextColor() {
         if (this.state.useEmail) {
             if (this.state.email.length !== 0 && this.state.password.length !== 0) {
                 return 'white'
             } else {
                 return 'rgba(255,255,255,0.3)'
             }
         } else {
             if (this.state.phoneNum.length !== 0 && this.state.phonePsd.length !== 0) {
                 return 'white'
             } else {
                 return 'rgba(255,255,255,0.3)'
             }
         }
     }
   
 
     loginWithPhone() {
         this.loginEnable = false;
         if (this.state.hudType !== 'none') {
             this.setState({
                 hudType: 'none',
                 textOnly: false,
             }, () => {
                 this.hud.show('Please wait');
             })
         } else {
             this.hud.show('Please wait');
         }
 
         let param = new FormData();
         param.append('phone', this.state.phoneNum.replace(/\s/g, ""));
         param.append('psd',this.state.phonePsd);
         console.log ("params:",param);
         netWork('POST', LOGIN_LOGIN_URL, param, false)
             .then(json => {
                 this.setState({
                     hudType: 'success'
                 }, () => {
                     this.hud.show('success', 1500);
                 });
                 this.timeout = setTimeout(() => {
                     this.loginEnable = true;
                     userInfo.accessToken = json.data.accessToken;
                     userInfo.memberId = json.data.memberId;
                userInfo.psd=this.state.phonePsd;
                         storage.save({
                             key: 'isLogin',
                             data: true,
                             expires: null,
                         });
                         storage.save({
                             key: 'userInfo',
                             data: {
                                 accessToken: userInfo.accessToken,
                                 memberId: userInfo.memberId,
                                 psd: userInfo.psd,
                             },
                             expires: null,
                         });
 
                         Navigation.setRoot({
                             root: {
                                 stack: {
                                     id: 'Stack.Home2',
                                     children: [
                                         {
                                             component: {
                                                 id: 'Home',
                                                 name: 'Home',
                                             },
                                         },
                                     ],
                                 }
                             }
                         });
                   
                     
                 }, 1500);
             })
             .catch(err => {
                 this.loginEnable = true;
                 this.setState({
                     hudType: 'error'
                 }, () => {
                     this.hud.show(err, 2000);
                 });
             })
     }
 
    
     render() {
         return (
             <View style={{ flex: 1, backgroundColor: 'white' }}>
                 <KeyboardAwareScrollView
                     style={{ flex: 0.9 }}
                     contentContainerStyle={{
                         padding: 8,
                         flexDirection: 'column'
                     }}
                     keyboardShouldPersistTaps={'handled'}
                 >
                     <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>
                         <Image source={require('../../assets/images/ez2goSMS_logo.png')} />
                     </View>
                     <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                         <ZIPText style={{ fontSize: 24 }}>
                             Log In Via {this.state.useEmail ? 'Email' : 'Mobile Number'}
                         </ZIPText>
                     </View>
                     {
                         this.state.useEmail ?
                             <Animatable.View
                                 style={{ height: 100 }}
                                 ref={r => this.emailView = r}
                             >
                                 <CommonTextInput
                                     leftTitle="Email"
                                     placeholder={'Enter E-mail address'}
                                     placeholderTextColor={'lightgray'}
                                     autoCapitalize={'none'}
                                     autoCorrect={false}
                                     underlineColorAndroid={'transparent'}
                                     value={this.state.email}
                                     keyboardType="email-address"
                                     onChangeText={(text) => {
                                         this.setState({
                                             email: text,
                                         })
                                     }}
                                 />
                                 <CommonTextInput
                                     leftTitle="Password"
                                     placeholder={'Enter password'}
                                     placeholderTextColor={'lightgray'}
                                     autoCapitalize={'none'}
                                     autoCorrect={false}
                                     underlineColorAndroid={'transparent'}
                                     value={this.state.password}
                                     secureTextEntry={true}
                                     onChangeText={(text) => {
                                         this.setState({
                                             password: text,
                                         })
                                     }}
                                 />
                             </Animatable.View>
                             :
                             <Animatable.View
                                 style={{ height: 100 }}
                                 ref={r => this.phoneView = r}
                             >
                                
                                 <CommonTextInput
                                     leftTitle="Phone"
                                     value={this.state.phoneNum}
                                     onChangeText={(text) => {
                                         let phone = text;
                                        //  if (text.length > this.state.phoneNum.length) {
                                        //      if (text.length === 3) {
                                        //          phone += '';
                                        //      } else if (text.length === 7) {
                                        //          phone += '';
                                        //      }
                                        //  } else {
                                        //      if (text.length === 9) {
                                        //          phone = phone.substr(0, 8);
                                        //      } else if (text.length === 4) {
                                        //          phone = phone.substr(0, 3);
                                        //      }
                                        //  }
                                         this.setState({
                                             phoneNum: phone,
                                         });
                                     }}
                                     maxLength={13}
                                     placeholder={'Enter mobile number'}
                                     placeholderTextColor={'lightgray'}
                                     autoCapitalize={'none'}
                                     autoCorrect={false}
                                     underlineColorAndroid={'transparent'}
                                     keyboardType={'numeric'}
                                 />
                                 <CommonTextInput
                                     leftTitle="Password"
                                     placeholder={'Enter password'}
                                     placeholderTextColor={'lightgray'}
                                     autoCapitalize={'none'}
                                     autoCorrect={false}
                                     underlineColorAndroid={'transparent'}
                                     value={this.state.phonePsd}
                                     secureTextEntry={true}
                                     onChangeText={(text) => {
                                         this.setState({
                                             phonePsd: text,
                                         })
                                     }}
                                 />
                             </Animatable.View>
                     }
 
                     <View style={{ paddingLeft: 8, paddingRight: 8, marginTop: 8, flexDirection: 'row' }}>
                         <ZIPText
                             style={{ fontSize: 16, color: Color.themeColor, flex: 1, marginRight: 16 }}
                             onPress={() => {
                                 Keyboard.dismiss();
                                 this.setState({
                                     useEmail: !this.state.useEmail,
                                     emailFocus: false,
                                     passwordFocus: false,
                                     phoneFocus: false,
                                     smsCodeFocus: false,
                                 }, () => {
                                     if (this.state.useEmail) {
                                         this.emailView.slideInRight(500);
                                     } else {
                                         this.phoneView.slideInRight(500);
                                     }
                                 })
                             }}
                         >
                             {this.state.useEmail ? 'Log in via mobile number' : 'Log in via Email'}
                         </ZIPText>
                         <ZIPText
                             onPress={() => {
                                 Navigation.push(this.props.componentId, {
                                     component: {
                                         name: 'Login',
                                         options: {
                                             topBar: {
                                                 title: {
                                                     text: 'Sign Up',
                                                 },
                                             },
                                         },
                                     }
                                 });
                       
                             }}
                             style={{ fontSize: 16, color: Color.themeColor }}
                         >
                             Sign Up
                         </ZIPText>
                     </View>
                     <TouchableOpacity
                         style={{
                             backgroundColor: this.loginButtonColor(),
                             alignItems: 'center',
                             justifyContent: 'center',
                             borderRadius: 3,
                             marginTop: 16,
                             height: 50,
                         }}
                         activeOpacity={1}
                         onPress={() => {
                             Keyboard.dismiss();
                             if (!this.loginEnable) {
                                 return;
                             }
                             if (this.loginTextColor() === 'white') {
                                 if (this.state.useEmail) {
                                     this.loginWithPhone();
                                 } else {
                                     this.loginWithPhone();
                                 }
                             }
                         }}
                     >
                         <ZIPText
                             style={{
                                 fontSize: 18,
                                 color: this.loginTextColor()
                             }}
                         >
                             Log In
                         </ZIPText>
                     </TouchableOpacity>
                 </KeyboardAwareScrollView>
                 <View style={{ flex: 0.1, backgroundColor: 'white' }}>
                     <ZIPText style={{ position: 'absolute', width: '100%', textAlign: 'center', bottom: 10 }}>
                         Version:{appPackage.version}
                     </ZIPText>
                 </View>
                 <Hud
                     hudType={this.state.hudType}
                     textOnly={this.state.textOnly}
                     ref={(r) => {
                         this.hud = r
                     }}
                 />
                 {
                     this.state.useEmail ?
                         <TouchableOpacity
                             style={{
                                 position: 'absolute',
                                 top: 60,
                                 right: 10,
                                 padding: 4
                             }}
                             activeOpacity={1}
                             onPress={() => {
                                 Navigation.push(this.props.componentId, {
                                     component: {
                                         name: 'Home',
 
                                     }
                                 });
                               
                             }}
                         >
                             <Icon name="ios-help-circle-outline" color="lightgray" size={28} />
                         </TouchableOpacity>
                         :
                         null
                 }
 
             </View>
         );
     }
 }

 const styles = StyleSheet.create({
    phoneNumContainer: {
        width: screenSize.width - 48,
        height: 40,
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 48,
    },
   
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        width: screenSize.width,
        height: screenSize.height - navBarHeight,
        alignItems: 'center',
        flexDirection: 'column'
    },
    sendCodeButton: {
        width: 100,
        height: 30,
        backgroundColor: 'white',
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Color.themeColor,
    },
    loginButton: {
        width: screenSize.width - 48,
        marginTop: 50,
        marginLeft: 0,
        marginRight: 0
    }
});
