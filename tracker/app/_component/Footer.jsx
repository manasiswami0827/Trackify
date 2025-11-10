export default function Footer() {
  return (
    <footer className="mt-auto text-center py-3 border-t text-sm text-muted-foreground bg-white shadow-inner">
      © {new Date().getFullYear()} Budget Tracker | All rights reserved.
    </footer>
  );
}
