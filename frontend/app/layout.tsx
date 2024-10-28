export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <header
          style={{
            padding: "10px",
            backgroundColor: "#222",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h1>Bridge Game</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
