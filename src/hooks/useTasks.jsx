import { useEffect, useState } from "react";

const useTasks = () => {
    const[control, setControl] = useState(false)
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(res => res.json())
        .then(data=> setTasks(data))
    }, [control])

    return [tasks, setControl, control]
};

export default useTasks;