import Header from "@/components/header";
import Link from "next/link";

export default function RoomDataEditorPage() {
  return (
    <>
      <Header />
      <section className="container mt-5">
        <div className="container">
          <h1 className="center text fw-bold text-center">What do you want to do ?</h1>
        </div>
        <div className="container pb-5">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="./room-data-editor/room-editor/">
                  <img src="/image/img21.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Edit Room</b></h2>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-9 col-md-6 col-xl-4 mt-4">
              <div className="card text-bg-dark">
                <Link href="./room-data-editor/room-allot/">
                  <img src="/image/img20.jpg" className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    <h2 className="card-title text"><b>Allot Room</b></h2>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
