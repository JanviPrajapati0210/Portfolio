function Header({ name, themeColor }) {
  return (
    <header
      style={{ backgroundColor: themeColor }}
      className="header"
    >
      <h1>{name}</h1>
      <p>AI & ML Student</p>
    </header>
  );
}

export default Header;