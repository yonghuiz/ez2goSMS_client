/**
 * Created by Richard Zhu 2021/09/13.
 */

import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import './config';


//registerScreens();

export default class AppRoot {
  constructor() {
    this._prepareStart();
  }

  _prepareStart() {
    registerScreens();
    Navigation.events().registerAppLaunchedListener(async () => {

      // Navigation.setRoot({
      //   root: {
      //     stack: {
      //       id: 'Stack.Home',
      //       children: [
      //         {
      //           component: {
      //              id: 'Home',
      //              name: 'Home',
      //          },
      //        },
      //       ],
      //     }
      // }
      // });
    // })
      // Navigation.setRoot({
      //   root: {
      //     bottomTabs: {
      //       children: [
      //         {
      //           stack: {
      //             children: [
      //               {
      //                 component: {
      //                   id: 'Home',
      //                   name: 'Home',

      //                 }
      //               },
      //             ]
      //           }
      //         },
      //         {
      //           stack: {
      //             children: [
      //               {
      //                 component: {
      //                   id: 'Setting',
      //                   name: 'Setting',

      //                 }
      //               }
      //             ]
      //           }
      //         }
      //       ]
      //     }
      //   }
      // });
      // });
  
      storage
        .load({
          key: 'isLogin',
        })
        .then(ret => {
          console.log(ret);
          if (ret) {
            storage
              .load({
                key: 'userInfo',
              })
              .then(ret => {
                userInfo = ret;
                this.startHaveLogin();
              })
              .catch(err => {
                this.startLogin();
              });
          } else {
            this.startLogin();
          }
        })
        .catch(err => {
          console.log(err);
          this.startLogin();
        });
    });

  }
  startLogin() {
    Navigation.setRoot({
      root: {
        stack: {
          id: 'Stack.Home',
          children: [
            {
              component: {
                id: 'Login',
                name: 'Login',
              },
            },
          ],
        }
      }
    });

  }

  startHaveLogin() {
   
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
  
}
}
