type NavTarget = {
  id: string;
  title: string;
  eyebrow: string;
} | null;

type BottomNavigationProps = {
  previous: NavTarget;
  next: NavTarget;
  onNavigate: (id: string) => void;
};

export function BottomNavigation({ previous, next, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="Previous and next">
      {previous ? (
        <button type="button" onClick={() => onNavigate(previous.id)}>
          <small>{previous.eyebrow}</small>
          <strong>{previous.title}</strong>
        </button>
      ) : (
        <div className="nav-placeholder">Start of sequence</div>
      )}

      {next ? (
        <button className="next" type="button" onClick={() => onNavigate(next.id)}>
          <small>{next.eyebrow}</small>
          <strong>{next.title}</strong>
        </button>
      ) : (
        <div className="nav-placeholder">End of sequence</div>
      )}
    </nav>
  );
}
