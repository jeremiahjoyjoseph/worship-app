import React from "react";

export const metadata = {
  title: "Worship",
  description: "Create, share and communicate worship",
};

const RootLayout = (props) => {
  return (
    <html land="en">
      <body>
        <div className="main"></div>
        <main className="app">{props.children}</main>
      </body>
    </html>
  );
};
export default RootLayout;
