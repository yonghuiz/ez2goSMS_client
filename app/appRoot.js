/**
 * Created by liuyu on 2017/7/3.
 */

import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screens';
//import './config';


//registerScreens();

export default class AppRoot {
  constructor() {
    this._prepareStart();
  }

  _prepareStart() {
    registerScreens();
    Navigation.events().registerAppLaunchedListener(async () => {
     
      Navigation.setRoot({
        root: {
          stack: {
            id: 'Stack.Home',
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
    
     });
    }  


      
   

}