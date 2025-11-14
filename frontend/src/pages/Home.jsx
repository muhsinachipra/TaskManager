// client\src\pages\Home.jsx

import { useState, useEffect, useContext } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext';
import { getTasks } from '../api';
import TaskStats from '../components/TaskStats';
import { ClipLoader } from 'react-spinners';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;


const Home = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logout } = useContext(AuthContext);
    const [loadingTasks, setLoadingTasks] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoadingTasks(true);
            try {
                const response = await getTasks();
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoadingTasks(false);
            }
        };

        fetchTasks();

    }, []);

    const handleEdit = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        logout();
    };

    const handleAddTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition duration-300 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold mb-4">Task List</h2>
                            {loadingTasks ? (
                                <div className="flex justify-center items-center h-64">
                                    <ClipLoader size={35} color={"#3498db"} loading={loadingTasks} />
                                </div>
                            ) : (
                                <TaskList tasks={tasks} onEdit={handleEdit} onAddTask={handleAddTask} />
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold mb-4">Task Statistics</h2>
                            {loadingTasks ? (
                                <div className="flex justify-center items-center h-64">
                                    <ClipLoader size={35} color={"#3498db"} loading={loadingTasks} />
                                </div>
                            ) : (
                                tasks.status && <TaskStats stats={tasks.status} />
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-lg mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">{selectedTask ? 'Edit Task' : 'Add New Task'}</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <TaskForm selectedTask={selectedTask} onSave={handleSave} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;


// const Home = () => {
//     return (
//         <div>
//             <h1>Home Page</h1>
//         </div>
//     );
// }
// export default Home;