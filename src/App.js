import React from 'react';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';

import{ Switch, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth , createUserProfileDocument} from './firebase/firebase.util';
class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser : null
    }
  }
  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth); //db 에 유저생성
        
        userRef.onSnapshot(snapshot =>{
          console.log(snapshot.data());
            this.setState({
              currentUser:{
                id:snapshot.id,
                ...snapshot.data()
              }
            },()=>{
              console.log(this.state);
            });
            
        });
      }else{
        this.setState({
          currentUser:userAuth
        })
      }
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();  //unmount -> auth 해제
  }
  render(){
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
          
        </Switch>
      </div>
    )
  }
  
}
//  switch - > match 되면 밑에 라우터 작동 x


export default App;