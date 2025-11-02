import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_component/header";
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
