
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

export default function ViewPage() {
  return (
    <>
      <Header />
      <section className="container mt-5">
        <div className="container">
          <h1 className="center text fw-bold text-center">Who are you looking for ?</h1>
        </div>
        <div className="container pb-5">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/view/students/">
                  <img src="/image/img16.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Student</b></h2>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-9 col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/view/faculty/">
                  <img src="/image/img17.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Faculty</b></h2>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-9 col-md-6 col-xl-4 mt-4 new-feature">
              <div className="card text-bg-dark">
                <a href="https://navit.vercel.app/">
                  <img src="/image/img19.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text pb-0"><b>Navit<i className="bi bi-link-45deg h4" style={{ WebkitTextStrokeWidth: '0.5px' }}></i></b></h2>
                    <p className="card-text fw-bold pb-4">Map for room visualisation.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-9 col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="/view/room/">
                  <img src="/image/img21.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Rooms</b></h2>
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
