import React, { useEffect, useState } from "react";
import './TaskManager.css';
import { getTasks } from "../helpers/obtenerDataDeFirebase";
import { Oval } from 'react-loader-spinner';

export const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const [newTask, setNewTask] = useState({ description: '', assigned: '', status: 'new' });
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);

    const callTask = async () => {
        try {
            const results = await getTasks();
            setTasks(results);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
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
            let newCompletionDate;
            let oldCompletionDate;
            if (task.id === id) {
                if (task.completed === '') {
                    if (task.oldCompletionDate) {
                        newCompletionDate = task.oldCompleted;
                    } else {
                        newCompletionDate = status === 'finished' || status === 'canceled' ? new Date().toISOString() : '';
                    }
                } else {
                    oldCompletionDate = newCompletionDate;
                }
                return { ...task, status, completed: newCompletionDate, oldCompleted: oldCompletionDate };
            }
            return task;
        }));
    };

    const handleEditClick = (task) => {
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

    const handleNewTaskSubmit = (e) => {
        e.preventDefault();
        const newTaskWithId = { ...newTask, id: tasks.length+1, created: new Date().toISOString(), completed: '' };
        setTasks([...tasks, newTaskWithId]);
        setNewTask({ description: '', assigned: '', status: 'new' });
        setShowNewTaskForm(false);
    };

    return (
        <div className="task-manager-container">
            <div className="App">
                <h1 className="my-4">Task Manager</h1>
                <select
                    value={filter}
                    onChange={(e) => filterTasks(e.target.value)}
                >
                    <option value="all" className="all">Not Filters</option>
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
                            <button type="submit">Add Task</button>
                        </form>
                    )}
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Responsable</th>
                                <th>Status</th>
                                <th>Fecha de Creación</th>
                                <th>Fecha de Finalización</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody>
                                {tasks.filter(show).map(task => (
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
                                        <td>{task.completed === '' ? '-' : formatDate(task.completed)}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(task)}>Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                    {selectedTask && (
                        <div className="edit-container">
                            <div className="edit-box">
                                <input type="text" value={selectedTask.description} />
                                <button onClick={handleCancelEdit}>Cancelar</button>
                                <button>Guardar</button>
                            </div>
                        </div>
                    )}
                    {loading && (
                        <div className="spinner-container">
                            <Oval
                                height={80}
                                width={80}
                                color="#4fa94d"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#4fa94d"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
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
    );
};
