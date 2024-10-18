// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Note from '../utils/Note.png';
// import AddTaskPopup from '../components/addTask';
// import TaskCard from '../components/TaskCard';
// import ProfileInfo from '../components/ProfileInfo';
// import app from '../components/Firebase/firebase'
// import { getDatabase, ref, set, push, get } from "firebase/database";

// const Dashboard = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [taskToUpdate, setTaskToUpdate] = useState(null); 

//     /************ Store Tasks **************/
    
//     const db = getDatabase(app);
//     const docRef = push(ref(db, 'users/tasks'));
//     useEffect(()=>{
//       const fetchRef = ref(db, 'users/tasks');
//       try {
//         get(fetchRef).then((data)=>{
//           return data.val();
//         }).catch((error)=>{
//           console.error("Error fetching user data from FireStore: ", error);
//         })
//       } catch (error) {
//         console.error("Error fetching user data from FireStore: ", error);
//       }
//     },[])
//     const saveData = async () => {
//       await set(docRef, tasks).then(()=>{
//         alert('User saved to FireStore');
//       }).catch((error)=>{
//         alert('Error saving user to FireStore: ', error.message);
//       });
//     }

      

//     /************ Store Tasks **************/

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleAddTask = (newTask) => {
//     setTasks([...tasks, newTask]);
//     // console.log(tasks);
//     saveData();
//   };

//   const handleDelete = (taskToDelete) => {
//     setTasks(tasks.filter((task) => task !== taskToDelete));
//   };

//   const handleUpdate = (task) => {
//     setTaskToUpdate(task); 
//   };

//   const handleUpdateTask = (updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.name === updatedTask.name ? updatedTask : task
//     );
//     setTasks(updatedTasks);
//     setTaskToUpdate(null); 
//   };

 
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter((task) => task.type === 'Completed').length;
//   const inProgressTasks = tasks.filter((task) => task.type === 'In Progress').length;
//   const todos = tasks.filter((task) => task.type === 'Todo').length;



//   return (
//     <div className="flex flex-col md:flex-row h-screen">
   
//       <div
//         className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-blue-500 to-purple-500 w-64 p-6 text-white z-10 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:relative md:translate-x-0 md:block`}
//       >
//         <button
//           onClick={toggleSidebar}
//           className="absolute top-4 right-4 text-white text-2xl md:hidden"
//         >
//           &times;
//         </button>

//         <h2 className="text-2xl font-bold mb-10">Dashboard</h2>
//         <nav>
//           <ul className="space-y-6">
//             <li>
//               <Link to="/tasks" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
//                 📋 Tasks
//               </Link>
//             </li>
//             <li>
//               <Link to="/completed" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
//                 ✔ Completed
//               </Link>
//             </li>
//             <li>
//               <Link to="/in-progress" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
//                 ⏳ In Progress
//               </Link>
//             </li>
//             <li>
//               <Link to="/todo" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
//                 📝 To Do
//               </Link>
//             </li>
//             <li>
//               <Link to="/team" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
//                 👥 Team
//               </Link>
//             </li>
//             <li>
//               <Link to="/trash" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
//                 🗑 Trash
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

  
//       <div
//         className={`flex-1 bg-gradient-to-br from-blue-700 to-purple-200 p-6 transition-all duration-300 ease-in-out ${
//           isOpen ? 'md:ml-64' : 'ml-0'
//         }`}
//       >
//         <header className="flex justify-between items-center mb-6">
//           <button onClick={toggleSidebar} className="text-white text-2xl md:hidden">
//             ☰
//           </button>
//           <h1 className="text-4xl font-bold w-full text-white text-center">Task Management System</h1>
//           <div className="text-white flex space-x-6 text-2xl profile">
//             <span>🔔</span>
//             {/* Profile Handler */}
//             <ProfileInfo />
//             {/* Profile Handler */}
//           </div>
//         </header>

   
//         <div className="mb-6">
//           <AddTaskPopup
//             onAddTask={handleAddTask}
//             onUpdateTask={handleUpdateTask}
//             taskToUpdate={taskToUpdate}
//           />
//         </div>

       
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//           <div className="bg-blue-200 p-4 rounded-lg text-center">
//             <h2 className="text-xl text-blue-900">Total Tasks</h2>
//             <p className="text-3xl text-blue-700">{totalTasks}</p>
//           </div>
//           <div className="bg-blue-200 p-4 rounded-lg text-center">
//             <h2 className="text-xl text-blue-900">Completed Tasks</h2>
//             <p className="text-3xl text-blue-700">{completedTasks}</p>
//           </div>
//           <div className="bg-blue-200 p-4 rounded-lg text-center">
//             <h2 className="text-xl text-blue-900">Tasks In Progress</h2>
//             <p className="text-3xl text-blue-700">{inProgressTasks}</p>
//           </div>
//           <div className="bg-blue-200 p-4 rounded-lg text-center">
//             <h2 className="text-xl text-blue-900">TODOs</h2>
//             <p className="text-3xl text-blue-700">{todos}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {tasks.map((task, index) => (
//             <TaskCard
//               key={index}
//               task={task}
//               onDelete={() => handleDelete(task)}
//               onUpdate={() => handleUpdate(task)}
//             />
//           ))}
//         </div>

     
//         <img
//           src={Note}
//           className={`absolute bottom-6 right-6 opacity-30 w-52 ${isOpen ? 'opacity-0' : 'opacity-0'}`}
//           alt="Task Icon"
//         />
//       </div>
//     </div>
//   );
// };



// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Note from '../utils/Note.png';
import AddTaskPopup from '../components/addTask';
import TaskCard from '../components/TaskCard';
import ProfileInfo from '../components/ProfileInfo';
import app from '../components/Firebase/firebase';
import { getDatabase, ref, set, push, get } from "firebase/database";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const db = getDatabase(app);
  const tasksRef = ref(db, 'users/tasks');

  // Fetch data when the component is mounted or reloaded
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(tasksRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const tasksArray = Object.values(data); // Convert the fetched tasks object to an array
          setTasks(tasksArray);
        } else {
          console.log("No tasks found");
        }
      } catch (error) {
        console.error("Error fetching tasks from Firebase: ", error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  // Save new task to the database by pushing it (appending)
  const saveData = async (newTask) => {
    const newTaskRef = push(tasksRef);
    await set(newTaskRef, newTask)
      .then(() => {
        alert('Task added to Firebase');
      })
      .catch((error) => {
        alert('Error adding task to Firebase: ', error.message);
      });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]); // Add task to local state
    saveData(newTask); // Save task to Firebase
  };

  const handleDelete = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
    // You should also handle deletion from Firebase if needed
  };

  const handleUpdate = (task) => {
    setTaskToUpdate(task);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.name === updatedTask.name ? updatedTask : task
    );
    setTasks(updatedTasks);
    setTaskToUpdate(null);
    // Save updated tasks to Firebase if needed
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.type === 'Completed').length;
  const inProgressTasks = tasks.filter((task) => task.type === 'In Progress').length;
  const todos = tasks.filter((task) => task.type === 'Todo').length;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-blue-500 to-purple-500 w-64 p-6 text-white z-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:block`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white text-2xl md:hidden"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-10">Dashboard</h2>
        <nav>
          <ul className="space-y-6">
            <li>
              <Link to="/tasks" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
                📋 Tasks
              </Link>
            </li>
            <li>
              <Link to="/completed" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
                ✔ Completed
              </Link>
            </li>
            <li>
              <Link to="/in-progress" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
                ⏳ In Progress
              </Link>
            </li>
            <li>
              <Link to="/todo" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
                📝 To Do
              </Link>
            </li>
            <li>
              <Link to="/team" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
                👥 Team
              </Link>
            </li>
            <li>
              <Link to="/trash" className="text-lg hover:bg-white/10 py-2 px-4 block rounded">
                🗑 Trash
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={`flex-1 bg-gradient-to-br from-blue-700 to-purple-200 p-6 transition-all duration-300 ease-in-out ${
          isOpen ? 'md:ml-64' : 'ml-0'
        }`}
      >
        <header className="flex justify-between items-center mb-6">
          <button onClick={toggleSidebar} className="text-white text-2xl md:hidden">
            ☰
          </button>
          <h1 className="text-4xl font-bold w-full text-white text-center">Task Management System</h1>
          <div className="text-white flex space-x-6 text-2xl profile">
            <span>🔔</span>
            <ProfileInfo />
          </div>
        </header>

        <div className="mb-6">
          <AddTaskPopup
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            taskToUpdate={taskToUpdate}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-200 p-4 rounded-lg text-center">
            <h2 className="text-xl text-blue-900">Total Tasks</h2>
            <p className="text-3xl text-blue-700">{totalTasks}</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg text-center">
            <h2 className="text-xl text-blue-900">Completed Tasks</h2>
            <p className="text-3xl text-blue-700">{completedTasks}</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg text-center">
            <h2 className="text-xl text-blue-900">Tasks In Progress</h2>
            <p className="text-3xl text-blue-700">{inProgressTasks}</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg text-center">
            <h2 className="text-xl text-blue-900">TODOs</h2>
            <p className="text-3xl text-blue-700">{todos}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              onDelete={() => handleDelete(task)}
              onUpdate={() => handleUpdate(task)}
            />
          ))}
        </div>

        <img
          src={Note}
          className={`absolute bottom-6 right-6 opacity-30 w-52 ${isOpen ? 'opacity-0' : 'opacity-0'}`}
          alt="Task Icon"
        />
      </div>
    </div>
  );
};

export default Dashboard;
