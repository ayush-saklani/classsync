import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <section className="container mt-5">
        <div className="container">
          <h1 className="center text fw-bold text-center">Whats your purpose ?</h1>
        </div>
        <div className="container pb-5">
          <div className="row justify-content-center">
            <div className="col-sm-8 col-md-4 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/view/">
                  <img src="/image/view.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>View <i className="bi bi-eye" style={{ WebkitTextStroke: '0.5px' }}></i></b></h2>
                    <p className="card-text fw-bold pb-2">Everyone</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-8 col-md-4 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/edit/">
                  <img src="/image/img8.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Editor <i className="bi bi-gear-wide" style={{ WebkitTextStroke: '0.5px' }}></i></b></h2>
                    <p className="card-text fw-bold pb-2">Admin only</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}