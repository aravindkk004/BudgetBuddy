import { SignUp } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <SignUp />
    </div>
  );
}
