import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import ChangeTheme from "../components/ChangeTheme";

const Home = () => {
    return (
        <div className="page-content">
            <div className="header-page">
                <div className="header-content">
                    <div className="wrapper">
                        <h1>TODO</h1>
                        <ChangeTheme/>
                    </div>
                    <AddTask/>
                </div>
            </div>
            <div className="main-page">
                <TaskList/>
            </div>
            <div className="footer-page">
                <span>Drag and drop to reorder list</span>
            </div>
        </div>
    );
};

export default Home;

