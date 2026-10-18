import { profile } from "@/content/profile";

export default function HomePage() {
  return (
    <div className="container-page py-24">
      <h1 className="animate-rise text-4xl font-semibold tracking-tight">{profile.name}</h1>
    </div>
  );
}
