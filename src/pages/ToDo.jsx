import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import app from "../components/Firebase/firebase"; 
import TaskCard from '../components/TaskCard'; 

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getDatabase(app);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        try {
          const tasksRef = ref(db, `users/${user.displayName}/tasks`);
          
          onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
              const fetchedTasks = Object.keys(data)
                .map((key) => ({
                  id: key,
                  ...data[key],
                }))
                .filter((task) => task.type === 'Todo'); // Only include 'Todo' tasks

              setTasks(fetchedTasks);
            } else {
              setTasks([]);
            }
          });
        } catch (error) {
          console.error('Error fetching tasks: ', error);
        }
      } else {
        console.log('User is not authenticated');
      }
    };

    if (!loading) {
      fetchTasks();
    }
  }, [db, user, loading]);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">To Do Tasks</h1>
      {user ? (
        <>
          <input
            type="text"
            placeholder="Search tasks by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg shadow-md text-gray-700 mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </>
      ) : (
        <div>Please log in to see your tasks.</div>
      )}
    </div>
  );
};

export default ToDo;
