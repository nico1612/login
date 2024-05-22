import React, { useState } from "react";

import './taskManager.css';

const taskis = [
    { id: 1, description: 'Actualizar la base de datos', responsable: 'Juan Pérez', status: 'new', creationDate: '2024-05-21', completionDate: '2024-05-25' },
    { id: 2, description: 'Diseñar el nuevo logotipo', responsable: 'María Gómez', status: 'in_process', creationDate: '2024-05-22', completionDate: null },
    { id: 3, description: 'Revisar el informe financiero', responsable: 'Pedro Rodríguez', status: 'canceled', creationDate: '2024-05-20', completionDate: '2024-05-24' },
    { id: 4, description: 'Coordinar la reunión mensual', responsable: 'Ana López', status: 'in_process', creationDate: '2024-05-23', completionDate: null },
    { id: 5, description: 'Implementar la nueva función', responsable: 'Carlos Sánchez', status: 'finished', creationDate: '2024-05-25', completionDate: null },
];

export const TaskManajer = () => {

    const [tasks,setSelectedStatus]=useState(taskis)

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
    }

    const handleStatusChange = (e,id) => {
        console.log(e)
        setSelectedStatus(tasks.map(task=>{
            if(task.id===id){
                task.status=e
            }
            return task
        }))
    }

    return (
        <>
            <div className="App">
                <h1 className="my-4">Task Manager</h1>
                <div className="container mt-5">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Responsable</th>
                                <th>Status</th>
                                <th>Fecha de Creación</th>
                                <th>Fecha de Finalización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.description}</td>
                                    <td>{task.responsable}</td>
                                    <td>
                                        <select value={task.status} style={{ backgroundColor: getStatusColor(task.status)}} onChange={(e)=>handleStatusChange(e.target.value,task.id)} >
                                            <option value="new" className="new">New</option>
                                            <option value="in_process" className="in_process">In Process</option>
                                            <option value="canceled" className="canceled">Canceled</option>
                                            <option value="finished" className="finished">Finished</option>
                                        </select>
                                    </td>
                                    <td>{task.creationDate}</td>
                                    <td>{task.completionDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <img
                src="src/img/logo.png"
                style={{ width: "100px", height: "auto", position:'relative', top:'50px' }}
                alt="Descripción de la imagen" 
            />
        </>
    )
}
