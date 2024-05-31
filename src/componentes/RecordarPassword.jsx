import React, { useEffect, useState } from "react";
import './TaskManager.css'; // Importar el archivo CSS
import { getTasks } from "../helpers/obtenerDataDeFirebase";
import { Oval } from 'react-loader-spinner';

export const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all'); // Nuevo estado para el filtro

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
            let newCompletionDate
            let oldCompletionDate
            if (task.id === id) {
                if(task.completed==='')
                { 
                    if(task.oldCompletionDate){
                        newCompletionDate=task.oldCompleted
                    }
                    else{
                        newCompletionDate = status === 'finished' || status === 'canceled' ? new Date().toISOString() : ''
                    }
                }
                else{
                    oldCompletionDate = newCompletionDate
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

    // Filtrar tareas según el estado seleccionado
    const filteredTasks = filterStatus === 'all' ? tasks : tasks.filter(task => task.status === filterStatus);

    return (
        <div className="task-manager-container">
            <div className="App">
                <h1 className="my-4">Task Manager</h1>
                <div className="container mt-5">
                    {/* Añadir filtro de estado */}
                    <div className="filter-container">
                        <label htmlFor="status-filter">Filtrar por estado:</label>
                        <select
                            id="status-filter"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="new">New</option>
                            <option value="in_process">In Process</option>
                            <option value="canceled">Canceled</option>
                            <option value="finished">Finished</option>
                        </select>
                        <button onClick={() => setFilterStatus('finished')} className="filter-button">
                            Mostrar Completadas
                        </button>
                    </div>
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
                                {filteredTasks.map(task => (
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
