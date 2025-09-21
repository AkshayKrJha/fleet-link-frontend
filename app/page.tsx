"use client";


export default function Home() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="mb-5 text-primary">Fleet Link Portal</h1>
      <nav className="w-50">
        <a href="/add-vehicle" className="btn btn-primary btn-lg w-100 mb-3">
          Add Vehicle
        </a>
        <a
          href="/search-and-book"
          className="btn btn-success btn-lg w-100 mb-3"
        >
          Search &amp; Book
        </a>
      </nav>
    </div>
  );
}
