
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from "./components/Login/Login";
import Search from "./components/Search/Search";
import Messages from "./components/Messages/Messages";
import Reservations from "./components/Reservations/Reservations";
import MyVehicle from "./components/Menu/my_vehicle";
import MyProfile from "./components/Menu/my_profile";
import Mylistings from './components/Menu/my_listings';
import Listing from './components/Listing/Listing';
import Checkout from './components/Checkout/Checkout';
import Chat from './components/Chat/Chat';
import EditListing from './components/Menu/edit_listing';

import Wizard0 from './components/Menu/List_space_Wizards/Wizard0'
import Wizard1 from './components/Menu/List_space_Wizards/Wizard1'
import Wizard2 from './components/Menu/List_space_Wizards/Wizard2'
import Wizard3 from './components/Menu/List_space_Wizards/Wizard3'
import Wizard4 from './components/Menu/List_space_Wizards/Wizard4'
import Wizard5 from './components/Menu/List_space_Wizards/Wizard5'
import Wizard6 from './components/Menu/List_space_Wizards/Wizard6'
import Wizard7 from './components/Menu/List_space_Wizards/Wizard7'
import Wizard8 from './components/Menu/List_space_Wizards/Wizard8'


export default (
    <Switch>
        <Route path='/mylisting/edit/:id' component={EditListing}/>
        <Route path='/' component={Login} exact />
        <Route path='/search' component={Search} exact />
        <Route path='/messages' component={Messages} />
        <Route path='/reservations' component={Reservations} />
        <Route path='/myvehicle' component={MyVehicle} />
        <Route path='/myprofile' component={MyProfile} />
        <Route path='/mylistings' component={Mylistings} />
        <Route path='/listing' component={Listing} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/chat' component={Chat} />
        <Route path='/mylisting/edit/:id' component={EditListing} />

        <Route path='/wizard0' component={Wizard0} />
        <Route path='/wizard1' component={Wizard1} />
        <Route path='/wizard2' component={Wizard2} />
        <Route path='/wizard3' component={Wizard3} />
        <Route path='/wizard4' component={Wizard4} />
        <Route path='/wizard5' component={Wizard5} />
        <Route path='/wizard6' component={Wizard6} />
        <Route path='/wizard7' component={Wizard7} />
        <Route path='/wizard8' component={Wizard8} />
    </Switch>
)