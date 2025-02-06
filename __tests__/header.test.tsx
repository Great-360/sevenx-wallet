import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from '../components/main/header';

describe('test code', () => {
    it('should work', () => {
        expect(1 + 1).toBe(2)
    });

     it("renders the Navbar component", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(<Header />);
    expect(screen.getByText(/#1 Rated SevenX E-spcace/i)).toBeInTheDocument();
  });

  it("renders the call-to-action buttons", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /Get Started/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Book Demo/i })).toBeInTheDocument();
  });
     it("renders the Navbar component", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(<Header />);
    expect(screen.getByText(/#1 Rated SevenX E-spcace/i)).toBeInTheDocument();
  });

  it("renders the call-to-action buttons", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /Get Started/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Book Demo/i })).toBeInTheDocument();
  });
     it("renders the Navbar component", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(<Header />);
    expect(screen.getByText(/#1 Rated SevenX E-spcace/i)).toBeInTheDocument();
  });

  it("renders the call-to-action buttons", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /Get Started/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Book Demo/i })).toBeInTheDocument();
  });
     it("renders the Navbar component", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    render(<Header />);
    expect(screen.getByText(/#1 Rated SevenX E-spcace/i)).toBeInTheDocument();
  });

  it("renders the call-to-action buttons", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /Get Started/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Book Demo/i })).toBeInTheDocument();
  });
    
})


