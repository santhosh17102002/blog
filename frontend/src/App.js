import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/home/Home'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import About from './components/about/About'
import RootLayout from './RootLayout';
import UserProfile from './components/user-profile/UserProfile';
import AuthorProfile from './components/author-profile/AuthorProfile';
//import userprofile,authorprofile

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
      },
      {
        path:'/user-profile',
        element:<UserProfile/>

      },
      {
        path:"/author-profile",
        element:<AuthorProfile/>
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