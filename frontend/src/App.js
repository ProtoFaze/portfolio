// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Loader from "./components/Loader";
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetPortfolioData, ShowLoading, HideLoading, ReloadData } from './redux/rootSlice';
import Login from './pages/Admin/Login';

function App() {
  const {loading, portfolioData, reloadData} = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const getData = useCallback(async() =>{
    try{
      dispatch(ShowLoading());
      const response = await axios.get('/api/portfolio/get-portfolio-data');
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    }catch(err){
      dispatch(HideLoading());
      console.log(err);
    }
  },[dispatch])

  useEffect(() => {
    if(!portfolioData){
      getData()
    }
  }, [portfolioData, getData])

  useEffect(() => {
    if(reloadData){
      getData();
    }
  }, [reloadData, getData])

  return (
    <BrowserRouter>
    {loading ? <Loader/> : null}
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/admin-login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
