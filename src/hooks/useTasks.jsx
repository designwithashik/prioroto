import { useQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const useTasks = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(res => res.json())
        .then(data=> setTasks(data))
    }, [])

    return [tasks]
};

export default useTasks;