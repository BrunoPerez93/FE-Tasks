import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/tasksList");
        onLogin();
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <FormField 
                    htmlFor="username"
                    label="Username"
                    placeholder="Username"
                    type="text"
                    value={username}
                    setValue={setUsername}
                />
            </div>

            <div className="flex flex-col space-y-1.5">
            <FormField 
                    htmlFor="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    setValue={setPassword}
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="submit">Login</Button>
            <Button variant="outline" onClick={() => navigate("/register")}>
              Register
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
