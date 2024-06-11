import React, { useEffect, useState } from "react";
import './TaskManager.css';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { deleteTask, getTasks, saveTask, updateTask } from "../helpers/obtenerDatos";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../stores/auth/thunks";

export const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const [newTask, setNewTask] = useState({ description: '', assigned: '', status: 'new', dueDate: '' });
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    const [description, setDescription] = useState('');
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const correo = useSelector((state) => state.auth.correo);

    const handleDescriptionChange = (newDescription) => {
        setDescription(newDescription);
    };

    const handleSaveEdit = async () => {
        if (selectedTask) {
            const updatedTask = { ...selectedTask, description };
            setTasks(tasks.map(task => (task.id === selectedTask.id ? updatedTask : task)));
            await updateTask(updatedTask);
            setSelectedTask(null);
        }
    };

    const callTask = async () => {
        const results = await getTasks();
        setTasks(Array.isArray(results) ? results : []);
        setLoading(false);
    };

    useEffect(() => {
        callTask();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'new':
                return '#80deea';
            case 'in_process':
                return '#ffd54f';
            case 'canceled':
                return '#ef9a9a';
            case 'finished':
                return '#a5d6a7';
            default:
                return '#c8e6c9';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const handleStatusChange = (status, id) => {
        setTasks(tasks.map(task => {
            let newCompletionDate = task.completed;
            if (task.id === id) {
                if (status === 'finished' || status === 'canceled') {
                    newCompletionDate = new Date().toISOString();
                } else {
                    newCompletionDate = '';
                }
                return { ...task, status, completed: newCompletionDate };
            }
            return task;
        }));
        updateTask(tasks.find(task => {
            if (task.id === id) {
                return task
            }
        }))
    };

    const handleEditClick = (task) => {
        setDescription(task.description);
        setSelectedTask(task);
    };

    const handleCancelEdit = () => {
        setSelectedTask(null);
    };

    const filterTasks = (value) => {
        setFilter(value);
    };

    const show = (task) => {
        return filter === 'all' || task.status === filter;
    };

    const handleNewTaskChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prevState => ({ ...prevState, [name]: value }));
    };

    const handleNewTaskSubmit = async (e) => {
        e.preventDefault();
        const newTaskWithId = { ...newTask, id: tasks.length + 1, created: new Date().toISOString(), completed: '' };
        setTasks([...tasks, newTaskWithId]);
        setNewTask({ description: '', assigned: '', status: 'new', dueDate: '' });
        setShowNewTaskForm(false);
        await saveTask(newTaskWithId);
    };

    const deleteTakses = (id) => {
        deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleLogout = async () => {
        dispatch(startLogout(correo))
        navigate('/')
    };

    return (
        <div className="task-manager-container">
            <div className="App">
                <h1 className="my-4">Task Manager</h1>
                <button className="logout-button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </button>
                <select
                    value={filter}
                    onChange={(e) => filterTasks(e.target.value)}
                >
                    <option value="all" className="all">No Filters</option>
                    <option value="new" className="new">New</option>
                    <option value="in_process" className="in_process">In Process</option>
                    <option value="canceled" className="canceled">Canceled</option>
                    <option value="finished" className="finished">Finished</option>
                </select>
                <div className="container mt-5">
                    <button onClick={() => setShowNewTaskForm(!showNewTaskForm)}>Create New Task</button>
                    {showNewTaskForm && (
                        <form onSubmit={handleNewTaskSubmit} className="new-task-form">
                            <input
                                type="text"
                                name="description"
                                value={newTask.description}
                                onChange={handleNewTaskChange}
                                placeholder="Description"
                                required
                            />
                            <input
                                type="text"
                                name="assigned"
                                value={newTask.assigned}
                                onChange={handleNewTaskChange}
                                placeholder="Assigned To"
                                required
                            />
                            <input
                                type="date"
                                name="dueDate"
                                value={newTask.dueDate}
                                onChange={handleNewTaskChange}
                                placeholder="Due Date"
                                required
                            />
                            <button type="submit">Add Task</button>
                        </form>
                    )}
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                                <th>Create Date</th>
                                <th>Due Date</th>
                                <th>End Date</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && tasks.length > 0 ? (
                                tasks.filter(show).map(task => (
                                    <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.description}</td>
                                        <td>{task.assigned}</td>
                                        <td>
                                            <select
                                                value={task.status}
                                                style={{ backgroundColor: getStatusColor(task.status) }}
                                                onChange={(e) => handleStatusChange(e.target.value, task.id)}
                                            >
                                                <option value="new" className="new">New</option>
                                                <option value="in_process" className="in_process">In Process</option>
                                                <option value="canceled" className="canceled">Canceled</option>
                                                <option value="finished" className="finished">Finished</option>
                                            </select>
                                        </td>
                                        <td>{formatDate(task.created)}</td>
                                        <td>{!task.dueDate ? '-' : formatDate(task.dueDate)}</td>
                                        <td>{!task.completed ? '-' : formatDate(task.completed)}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(task)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => deleteTakses(task.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        {loading ? (
                                            <div className="spinner-container">
                                                <Oval
                                                    height={80}
                                                    width={80}
                                                    color="#4fa94d"
                                                    visible={true}
                                                    ariaLabel='oval-loading'
                                                    secondaryColor="#4fa94d"
                                                    strokeWidth={2}
                                                    strokeWidthSecondary={2}
                                                />
                                            </div>
                                        ) : (
                                            'No data available'
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {selectedTask && (
                        <div className="edit-container">
                            <div className="edit-box">
                                <input 
                                    type="text" 
                                    value={description} 
                                    onChange={(e) => handleDescriptionChange(e.target.value)}
                                />
                                <button onClick={handleCancelEdit}>Cancel</button>
                                <button onClick={() => handleSaveEdit()}>Save</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <img
                src="src/img/logo.png"
                className="logo-image"
                alt="Descripción de la imagen"
            />
        </div>
    )
};
