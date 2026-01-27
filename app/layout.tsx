{
  /* app/layout.tsx */
}
import "./globals.css";

export const metadata = {
  title: "Quiz Criança",
  description: "Quiz divertido para crianças",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
