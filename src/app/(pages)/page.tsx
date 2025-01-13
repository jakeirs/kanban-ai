import CreateUser from "./auth/CreateUser";
import ServerSideComponent from "./auth/server-side-component";

export default function HomePage() {
  return (
    <section className="container grid grid-cols-2 gap-6 pt-6 pb-8 tems-center f md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <CreateUser />
        <ServerSideComponent />
      </div>
    </section>
  );
}
