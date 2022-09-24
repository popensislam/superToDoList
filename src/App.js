import { useEffect } from 'react';
import './App.css';
import './font.css'
import AppRouter from './components/routes/AppRouter';
import SideBar from './components/sideBar';
import { useDispatch } from 'react-redux'
import { connectLocal } from './store/taskSlice/taskSlice';
import { connectLocalImportant } from './store/importantSlice/importantTasksSlice';
import { connectLocalDeleted } from './store/deletedTasksSlice';

function App() {

  const dispatch = useDispatch()
  const tasks = JSON.parse(localStorage.getItem('task'))
  const importantTasks = JSON.parse(localStorage.getItem('importantTask'))
  const deletedTasks = JSON.parse(localStorage.getItem('deletedTask'))

  useEffect(() => {
    if (tasks) dispatch(connectLocal(tasks))
  }, [])

  useEffect(() => {
    if (importantTasks) dispatch(connectLocalImportant(importantTasks))
  }, [])

  useEffect(() => {
    if (deletedTasks) dispatch(connectLocalDeleted(deletedTasks))
  }, [])

  return (
    <div className="App">
      <div className='container'>
        <div className='flex-center'>
          <div className='wrapper'>
            <SideBar />
            <AppRouter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
