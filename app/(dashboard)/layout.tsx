import Provider from "./provider";

function Layout({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

export default Layout;
