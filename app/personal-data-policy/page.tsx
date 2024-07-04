import PersonalDataPolicyPage from "@/components/templates/PersonalDataPolicyPage/PersonalDataPolicyPage";
import { Suspense } from "react";

export default function PersonalDataPolicy() {
  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }
  return(
    <Suspense fallback={<Loading />}>
      <PersonalDataPolicy />
    </Suspense>
    )
}