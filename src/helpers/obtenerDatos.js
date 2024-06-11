import axios from "axios";

const url= import.meta.env.VITE_APP_IP

export const getTasks = async () => {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios(`${url}/api/task`, options);
        return response.data.tasks;
    } catch (error) {
        console.log(error.response?.data || error.message);
        return [];
    }
};

export const saveTask=async(task)=>{
    try {
        const options = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            data: {...task},
        } 
        await axios(`${url}/api/task`, options);
        return 'se pudo guardar'
    } catch (error) {
        return  'no se pudo guardar';
    }
}

export const updateTask=async(task)=>{
    try {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: {...task},
      } 
      const response = await axios(`${url}/api/task/${task.id}`, options);
    } catch (error) {
        console.log(error.response?.data || error.message);
        return 'no se pudo actualizar';
    }
}

export const deleteTask = async (id) => {
    const response = await fetch(`${url}/api/task/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
      return true
    } else {
        console.error('Failed to delete task');
        return false
    }
};
