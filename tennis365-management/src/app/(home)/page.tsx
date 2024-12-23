import Navigation from "@/components/navigation";
import { Metadata } from "next";

export const metadata: Metadata= {
    title: "Home"
  };

export default function Home() {

    return (
        <>
        <h1>Main Page</h1>
        <Navigation/>
        </>
    )
}
