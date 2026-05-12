import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main style={{ width: "100%" }}>
        {children}
      </main>
    </>
  );
}

export default MainLayout;