import { Navigation } from 'react-native-navigation'

 import Home from './Home'
  import Setting from './Setting'
  // import Demo from './Demo'
import App from '../App'
// import MyBackgroundJob from './MyBackgroundJob'

export function registerScreens() {
     Navigation.registerComponent('Home',()=>Home);
     Navigation.registerComponent('Setting',()=>Setting);
    //  Navigation.registerComponent('Demo',()=>Demo);
     Navigation.registerComponent('App',()=>App);
    // Navigation.registerComponent('MyBackgroundJob',()=>MyBackgroundJob);
}