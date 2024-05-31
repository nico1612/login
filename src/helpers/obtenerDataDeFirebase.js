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
