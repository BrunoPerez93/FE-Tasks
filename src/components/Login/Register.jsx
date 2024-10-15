import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/");
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
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
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
            <div className="flex flex-col space-y-1.5">
              <FormField
                htmlFor="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                setValue={setConfirmPassword}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="submit">Register</Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Go Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
