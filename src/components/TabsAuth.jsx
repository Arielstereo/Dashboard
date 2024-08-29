import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const TabsAuth = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <SigninForm />
      </TabsContent>
      <TabsContent value="register">
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
};

export default TabsAuth;
