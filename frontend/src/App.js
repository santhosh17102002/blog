import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/home/Home'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import About from './components/about/About'
import RootLayout from './RootLayout';
function App(){
  const browserrouter = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/signin',
        element:<Signin/>
        
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/about',
        element:<About/>
      }
    ]
  }
]);
  return(
  <div>
    {/*providing browserRouter to app */}
    <RouterProvider router={browserrouter}/>
  </div>);
}

export default App;