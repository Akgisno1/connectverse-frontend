import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import axios from "axios";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "./ui/label";

const userValidationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userValidationSchema>) => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", values);
      navigate("/login");
      toast({ title: "User registered successfully!", variant: "default" });
    } catch (error) {
      console.error(error);
      toast({ title: "Registration failed", variant: "destructive" });
    }
  };

  return (
    <div className="flex size-full flex-row items-center rounded-b-xl">
      <div className="w-[50%] h-full flex items-center justify-center relative max-sm:hidden">
        <img
          src="/purple2.jpg"
          className="h-[80%] w-[80%] object-cover filter grayscale-100 hover:filter-none transition-all duration-500 ease-in-out rounded-xl"
        />
        <div className="absolute bottom-[20%] px-[2vw] w-[80%] text-[2vw] font-bold font-sans text-white">
          <q>
            "Music washes away from the soul the dust of everyday life." -
            Berthold Auerbach
          </q>
        </div>
      </div>
      <div className="w-[50%] max-md:w-full h-full flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[60%] bg-neutral-800 rounded-xl p-4 flex flex-col gap-[1vw] text-white"
          >
            <div className="flex items-center justify-center text-[2.5vw] font-mont font-semibold text-purple-600">
              User Signup
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-[1.2vw] font-mont">Username</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Username"
                      className="h-12 pr-10 bg-neutral-700 rounded-lg border-2 border-white hover:bg-purple-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-[1.2vw] font-mont">Email</Label>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Email"
                      className="h-12 pr-10 bg-neutral-700 rounded-lg border-2 border-white hover:bg-purple-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <Label className="text-[1.2vw] font-mont">Password</Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        placeholder="Password"
                        className="h-12 pr-10 bg-neutral-700 rounded-lg border-2 border-white hover:bg-purple-700"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="font-mont text-lg font-bold border-2 bg-purple-700 rounded-lg h-12 flex items-center hover:bg-purple-500"
            >
              Sign Up
            </Button>

            <div className="text-[1.2vw] font-bold flex-row gap-2 flex items-center text-white font-sans">
              Already have an account?
              <a href="/login" className="text-purple-700 underline">
                Login
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
