import PrivacyPolicyPage from "@/components/templates/PrivacyPolicyPage/PrivacyPolicyPage";
import { Suspense } from "react";

export default function PersonalDataPolicy() {
  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }
  return(
    <Suspense fallback={<Loading />}>
      <PrivacyPolicyPage />
    </Suspense>
    )
}