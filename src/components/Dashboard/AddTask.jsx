import React, { useState } from "react";
import FormField from "../Login/FormField";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error adding task");
      }
      setTitle("");
      setDescription("");
      navigate("/tasksList");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card className="w-[350px] mt-5">
      <CardHeader>
        <CardTitle>ADD NEW TASK</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTask}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <FormField
                htmlFor="title"
                label="Title"
                placeholder="Title of the task"
                type="text"
                value={title}
                setValue={setTitle}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FormField
                htmlFor="description"
                label="Description"
                placeholder="Content of the task"
                type="text"
                value={description}
                setValue={setDescription}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <CardFooter className="flex justify-center mt-4">
            <Button type="submit" variant="outline">
              Add New Task
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTask;
