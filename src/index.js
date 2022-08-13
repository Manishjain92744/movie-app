import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore , applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';
 import { Provider } from 'react-redux';

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
   };
 
  //  const thunk = ({dispatch , getState}) =>(next) =>(action) => {
  //   //logger code
  //   if(typeof action === 'function'){
  //     action(dispatch);
  //        return ;
  //   }
  //   next(action);
  //  }

const store = createStore(rootReducer,applyMiddleware(logger,thunk));

// console.log('store',store);

//    export const storeContext = createContext();

//   console.log('storeContext',storeContext);
// // console.log('BEFRORE_STATE',store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies : [{name : 'Superman'}]
// });
// console.log('AFTER_STATE',store.getState());

  // class Provider extends React.Component {
  //   render () {
  //     const {store} = this.props;
  //      return (
  //      <storeContext.Provider value = {store}>
  //       {this.props.children}
  //      </storeContext.Provider>
  //      );
  //   }
  // }

  //  const connectedAppComponent = connect(callback)(App);

// export function connect(callback) {
//   return function (Component){
//      class connectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe (()=>this.forceUpdate());
//       }
//       componentWillUnmount () {
//         this.unsubscribe();
//       }
//       render () {
//         const {store} =this.props;
//         const state = store.getState();
//             const dataToBePassedAsProps = callback(state);
//             return (
//             <Component 
//             {...dataToBePassedAsProps} 
//             dispatch = {store.dispatch}
//              />
//             );
//       }
//     }
//     class connectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <storeContext.Consumer>
//             { (store) => {
//             <connectedComponent store = {store} />;
//             }}
//           </storeContext.Consumer>
//         );
//       }
//     }
//     return connectedComponentWrapper;
//   };
// }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
