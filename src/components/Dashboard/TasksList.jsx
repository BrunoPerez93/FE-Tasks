import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tasks");
        }

        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Tasks List</h1>
      <div className="grid gap-4 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {error && <p className="text-red-500">{error}</p>}

        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <Card key={task._id} className="max-w-[350px] text-center">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {task.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl">{task.description}</p>
                <span className="text-gray-500 font-bold">
                  {new Date(task.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </CardContent>
              <CardFooter className="flex justify-center space-x-3">
                <Button>Edit</Button>
                <Button variant="destructive">Delete</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default TasksList;
