import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script
        src="https://kit.fontawesome.com/3915ec2c1e.js"
        crossOrigin="anonymous"
        async
      ></script>
      <body
        style={{
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
          overflowY: "hidden",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
