import "./globals.css";

export const metadata = {
  title: "Nitin Penupala | Software Engineer & Data Analyst",
  description:
    "Nitin Penupala — Software Engineer & Data Analyst. Building scalable web apps, crafting clean UI/UX, and transforming data into insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="bg-particles">
          <div className="orb" />
          <div className="orb" />
          <div className="orb" />
        </div>
        {children}
      </body>
    </html>
  );
}
