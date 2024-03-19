"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function GoBack() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} size="icon" variant="outline">
      <ArrowBigLeft />
    </Button>
  );
}

export default GoBack;
