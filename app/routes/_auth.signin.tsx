import { UserAuthSignInForm } from "~/components/shared/user-auth-signin-form";

export default function Route() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Sign In</h1>
      <UserAuthSignInForm />
    </div>
  );
}
