import React from "react";
import { PageComponent } from "./page-component";

export default function Page() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </React.Suspense>
  );
}
