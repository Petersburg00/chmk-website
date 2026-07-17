/** "• ETKINLIKLER" tarzi bolum etiketi + logodaki konveyor bandini animsatan cizgi */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="text-copper" aria-hidden>
        •
      </span>
      <span className="text-xs font-semibold tracking-[0.06em] text-muted">
        {children}
      </span>
      <span
        className="h-px flex-1 max-w-24 bg-gradient-to-r from-copper/60 to-transparent"
        aria-hidden
      />
    </div>
  );
}
