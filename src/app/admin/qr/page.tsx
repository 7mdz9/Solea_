import { QrStudio } from "../../../components/admin/QrStudio";

const fallbackMenuUrl = "https://soleauae.com/menu";

export const dynamic = "force-dynamic";

export default function AdminQrPage() {
  return (
    <QrStudio
      initialMenuUrl={process.env.MENU_URL ?? fallbackMenuUrl}
      readOnly={process.env.NODE_ENV === "production"}
    />
  );
}
