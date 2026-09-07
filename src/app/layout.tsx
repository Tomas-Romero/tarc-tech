// Intentionally does not render <html>/<body> — src/app/[locale]/layout.tsx
// is the true document root, so it can set `lang` dynamically per locale.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
