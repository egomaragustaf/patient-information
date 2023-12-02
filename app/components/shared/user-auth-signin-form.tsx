import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

export function UserAuthSignInForm() {
  return (
    <section className="space-y-6">
      <Form method="POST">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="yourname@example.com"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          <input hidden name="redirectTo" />

          <Button type="submit">Sign In</Button>
        </div>
      </Form>
    </section>
  );
}
