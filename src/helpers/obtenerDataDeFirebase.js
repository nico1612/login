import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";

const db = getFirestore(app);

export const getTasks = () => {
   return new Promise((resolve, reject) => {
       const tasksCollection = collection(db, 'tasks');
       onSnapshot(tasksCollection, (snapshot) => {
           const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
           resolve(tasks);
       }, (error) => {
           reject(error);
       });
   });
};
/*
export const getTasks=async()=>{
    const url= import.meta.env.VITE_APP_IP
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
    }
      const response = await axios(`${url}/api/auth/login`, options)
}*/