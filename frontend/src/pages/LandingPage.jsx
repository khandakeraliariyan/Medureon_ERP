import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import '../components/Logo.css';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <Logo />
        <nav className="landing-nav-links">
          <a href="#home" className="active">Home</a>
          <a href="#products">Products</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="landing-nav-cta">
          <Link to="/login" className="nav-link-btn">Log In</Link>
          <Link to="/register" className="nav-btn">Get Started</Link>
        </div>
      </header>

      <main className="landing-hero">
        <div className="hero-stage">
          <div className="hero-arch left" />
          <div className="hero-arch right" />
          <div className="hero-shelf left">
            <div className="bottle" />
            <div className="bottle" />
            <div className="bottle" />
          </div>
          <div className="hero-shelf right">
            <div className="bottle" />
            <div className="bottle" />
            <div className="bottle" />
          </div>
          <div className="hero-panel">
            <div className="hero-panel-line short" />
            <div className="hero-panel-line" />
            <div className="hero-panel-line" />
            <div className="hero-panel-circle" />
          </div>
        </div>

        <h1 className="hero-title">MEDUREON OS</h1>
        <p className="hero-subtitle">Intelligent Management for Modern Healthcare Operations</p>

        <div className="hero-cta">
          <Link to="/register" className="nav-btn">Create Institution Account</Link>
          <Link to="/login" className="nav-link-btn outline">Sign In to ERP</Link>
        </div>
      </main>

      <footer className="landing-footer">
        © {new Date().getFullYear()} Medureon ERP Systems. Precise Care.
      </footer>
    </div>
  );
}
