import Userlogin from './pages/User/Userlogin';
import UserRegister from './pages/User/UserRegister';

function App() {
  const currentPage = window.location.pathname.replace(/\/+$/, '').toLowerCase();

  if (currentPage.endsWith('/register')) {
    return <UserRegister />;
  }

  return <Userlogin />;
}

export default App;
