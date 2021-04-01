import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
//Tab Screen
import Home from './Home/index';

//login
import Login from './Login/index';

//cources
import Cources from './Cources/Cources';
import CourseList from './CourseList/CourseList';
import NewsList from './News/NewsList';

//profile
import Profile from './Profile'




//Initializing
import Initializing from './Initializing';




//Registering Component Screen
export function registerScreen() {
    Navigation.registerComponent('Initializing', () => gestureHandlerRootHOC(Initializing));

    Navigation.registerComponent('tab.Home', () => gestureHandlerRootHOC(Home));


    Navigation.registerComponent('screen.Login', () => gestureHandlerRootHOC(Login));
    Navigation.registerComponent('screen.Cources', () => gestureHandlerRootHOC(Cources));

    //Profile
    Navigation.registerComponent('tab.Profile', () => gestureHandlerRootHOC(Profile));

}