import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen  justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <h1 className="text-4xl mb-5">
        🚀 CI/CD Test Project || Test CI
      </h1>
      <h2>
        A hands-on project where I learn, practice, and master CI/CD pipelines through real-world implementation.
      </h2>
       <nav>
       <Link href="/graphqlcall">Graphql Api Call</Link>
       </nav>
    </div>
  );
}
