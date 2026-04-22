export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="container-page grid gap-4 py-8 text-sm text-slate-600 md:grid-cols-3">
        <div>© {new Date().getFullYear()} ModernShop</div>
        <div>About · Contact · Privacy</div>
        <div>Built with Next.js + Tailwind</div>
      </div>
    </footer>
  );
}
