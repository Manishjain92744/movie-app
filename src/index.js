import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore , applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';

import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers';

//function logger(obj,next,action)
//logger(obj)(next)(action)
// const logger = function ({dispatch , getState}){
//   return function(next) {
//     return function(action) {
//       //middleware code 
//       console.log('ACTION_TYPE=',action.type);
//       next(action);
//     }
//   }
// }
   const logger = ({dispatch , getState}) =>(next) =>(action) => {
    //logger code
    if(typeof action !=='function')
        console.log('ACTION_TYPE = ',action.type);
    next(action);
   }
 
  //  const thunk = ({dispatch , getState}) =>(next) =>(action) => {
  //   //logger code
  //   if(typeof action === 'function'){
  //     action(dispatch);
  //        return ;
  //   }
  //   next(action);
  //  }

const store = createStore(rootReducer,applyMiddleware(logger,thunk));
console.log('store',store);
// console.log('BEFRORE_STATE',store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies : [{name : 'Superman'}]
// });
// console.log('AFTER_STATE',store.getState());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store ={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
