import React, { Suspense } from 'react';
import MainPage from "@/components/templates/MainPage/MainPage";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
}
