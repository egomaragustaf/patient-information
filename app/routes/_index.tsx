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
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-teal-800">Welcome to Remix</h1>
      <Button className="w-48">Login</Button>
      <article className="prose text-center">
        <h3>Hello This is Cool App</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, labore!
          At provident repellendus ullam animi eos perspiciatis enim architecto
          eaque sit similique quas deleniti facere porro perferendis, magnam
          quisquam autem!
        </p>
      </article>
    </div>
  );
}
