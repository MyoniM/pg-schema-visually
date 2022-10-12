import BasicNavbar from './components/basicNavbar';

export default function Home() {
  return (
    <>
      <BasicNavbar />
      <div className="home">
        <h1>
          Draw <span> Entity-Relationship </span> Diagrams, Painlessly 😎
        </h1>
        <br />
        <br />
        <br />
        <a href="/app" style={{ textDecoration: 'none', width: '400px' }}>
          <button className="button-53">GO TO APP</button>
        </a>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
