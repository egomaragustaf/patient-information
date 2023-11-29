import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-teal-800">Welcome to Remix</h1>
      <Button className="w-48">Login</Button>
    </div>
  );
}
