import { Routes, Route } from 'react-router-dom'
import Completed from '../../pages/Completed';
import Deleted from '../../pages/Deleted';
import Important from '../../pages/Important';
import MyTasks from '../../pages/MyTasks';
import Result from '../../pages/Result';
import { COMPLETED, DELETED, IMPORTANT, MY_TASKS, RESULT } from './constants';

const AppRouter = () => {
    return ( 
        <Routes>
            <Route path={MY_TASKS} element={<MyTasks/>} index/>
            <Route path={IMPORTANT} element={<Important/>}/>
            <Route path={COMPLETED} element={<Completed/>}/>
            <Route path={DELETED} element={<Deleted/>}/>
            <Route path={RESULT} element={<Result/>}/>
        </Routes>
     );
}
 
export default AppRouter;