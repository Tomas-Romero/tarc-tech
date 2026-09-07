import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n";

// PLAN §3 D13 / §5: "/" always redirects to the default locale.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
