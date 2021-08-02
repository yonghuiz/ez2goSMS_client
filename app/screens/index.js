import { Navigation } from 'react-native-navigation'

 import Home from './Home'
  import Setting from './Setting'
import App from '../App'
// import MyBackgroundJob from './MyBackgroundJob'

export function registerScreens() {
     Navigation.registerComponent('Home',()=>Home);
     Navigation.registerComponent('Setting',()=>Setting);
     Navigation.registerComponent('App',()=>App);
    // Navigation.registerComponent('MyBackgroundJob',()=>MyBackgroundJob);
}