import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import UsersData from '../UsersData/UsersData';
import UserChart from '../UserChart/UserChart';
import Navbar from '../Navbar/Navbar';
import AllUserChart from '../AllUserChart/AllUserChart';
function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<UsersData />} />
          <Route path="/customer/:customerId" element={<UserChart />} />
          <Route path="/chart" element={<AllUserChart />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
