import "./global.css";
import Provider from "../app/component/Provider.jsx";

export const metadata = {
  title: " HandCraft Haven",
  description: "Discover & Share Artifacts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="eg">
      <body>
        <Provider>
          <div className="app">
            <div className="gradient" />
          </div>
          <main className="bg-sky-950">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
