
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Range from './components/range.js'
import Range2 from './components/rangeEx2.js'

function App() {

  const router = createBrowserRouter([
    { path: "/exercise1", element: <Range />},
    { path: "/exercise2", element: <Range2 />},
    { path: "*", element: <Navigate to="/exercise1" />
  }
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} fallbackElement={<Range />}/>
    </div>
  );
}

export default App;
