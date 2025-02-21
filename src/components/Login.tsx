import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import axios from "axios";
import { AuthContext } from "../context/context";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importing eye icons
import { Label } from "./ui/label";

const loginValidationSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { updateUser } = authContext;

  const savedUser = JSON.parse(localStorage.getItem("temp_user") || "{}");

  const form = useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: savedUser.email || "",
      password: savedUser.password || "",
      rememberMe: savedUser.rememberMe || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginValidationSchema>) => {
    try {
      const { rememberMe, ...loginData } = values;
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData,
        { withCredentials: true }
      );
      updateUser(res.data);
      navigate("/dashboard");
      toast({ title: "Login successful!", variant: "default" });

      if (rememberMe) {
        localStorage.setItem(
          "temp_user",
          JSON.stringify({
            rememberMe: values.rememberMe,
            email: values.email,
            password: "",
          })
        );
      } else {
        localStorage.removeItem("temp_user");
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Login failed", variant: "destructive" });
    }
  };

  return (
    <div className="flex size-full flex-row items-center rounded-b-xl ">
      <div className="w-[50%] max-md:w-full h-full flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="  w-[60%] bg-neutral-800 rounded-xl p-4 flex flex-col gap-[1vw]  text-white "
          >
            <div className="flex items-center justify-center text-[2.5vw] font-mont font-semibold text-purple-600">
              User Login
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className=" text-[1.2vw] font-mont">Email</Label>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Email"
                      className="h-12  pr-10 bg-neutral-700 rounded-lg border-2 border-white hover:bg-purple-700"
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
                  <Label className=" text-[1.2vw] font-mont">Password</Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"} // Toggle password type
                        {...field}
                        placeholder="Password"
                        className="h-12  pr-10 bg-neutral-700 rounded-lg border-2 border-white hover:bg-purple-700 "
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
              Login
            </Button>
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center  space-x-2">
                  <FormControl className="flex flex-row items-center">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      className="flex flex-row items-center mt-[1vh]"
                    />
                  </FormControl>
                  <FormLabel className="flex flex-row items-center">
                    Remember Me
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-[1.2vw] font-bold flex items-center  hover:text-purple-700 font-sans">
              Forgot your Password?
            </div>
            <div className="text-[1.2vw] font-bold flex-row gap-2 flex items-center  text-white font-sans">
              Already have an account?
              <Link to="/signup" className="text-purple-700 underline">
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <div className="w-[50%] h-full flex items-center justify-center relative max-sm:hidden">
        <img
          src="/purple1.jpg"
          className="h-[80%] w-[80%] object-cover filter grayscale-100 hover:filter-none transition-all duration-500 ease-in-out rounded-xl"
        />
        <div className="absolute bottom-[20%] px-[2vw] w-[80%]  text-[2vw] font-bold font-sans text-white">
          <q>
            Music is the divine way to tell beautiful, poetic things to the
            heart.
          </q>
        </div>
      </div>
    </div>
  );
};

export default Login;
