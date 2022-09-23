import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/main/Main';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Fail from './components/fail/Fail';
import { useEffect, useState } from 'react';

function App() {

  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    fetch(`/login1`)
    .then(res => res.json())
    .then(data => setUser(data.user));
  }

  return (
    
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor:"white", color:"black"}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=> {navigate('/')}}>
              미리알림
            </Typography>
            {
              user != null  && <div>{user} 님, 환영합니다.</div>
            }
          </Toolbar>
        </AppBar>
      </Box>

      <Routes>
        <Route path='/' element={<Main user={user}/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/fail' element={<Fail />}/>
        <Route path='*' element={<div></div> }/>
      </Routes>
      
    </div> 
  );
}

export default App;