import Header from "./_component/Header";
import Hero from "./_component/Hero";
import Dashboard from "./(routes)/dashboard/page";

export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <Dashboard/>
   </>
  );
}
