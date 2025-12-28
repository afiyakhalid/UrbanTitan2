import { Login } from "@/components/auth/login";

export default function Page() {
  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? process.env.GOOGLE_CLIENT_ID;

  return (
    <section className="bg-white">
      <Login googleClientId={googleClientId} />
    </section>
  );
}
