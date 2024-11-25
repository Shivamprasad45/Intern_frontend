import { Button } from "@/components/ui/button";
import { Butcherman } from "next/font/google";
import Image from "next/image";

import Table from "./Components/Home";

export default function Home() {
  return (
    <div className="p-3">
      <Table />
    </div>
  );
}
