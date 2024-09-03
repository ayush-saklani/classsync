import logo from '/src/assets/img/logo.png';
import '/src/assets/css/App.css';
import './style.css';
const App = () => {
	//   const history = useHistory(); // Use history for navigation

	//   const handleLoginClick = () => {
	//     history.push('/login/'); // Navigate to the login page on button click
	//   };

	return (
		<nav className="navbar navbar-expand mx-3">
			<img src={logo} height="75px" className="d-inline-block align-text-top " alt="Class-Sync Logo" />
			<h2 className="mx-3 my-3 heading-text">Class-Sync Timetable Manager</h2>
		</nav>
	);
};

export default App;
