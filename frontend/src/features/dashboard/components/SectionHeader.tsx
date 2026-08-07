type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.25em] text-pink-200">{eyebrow}</p>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-slate-300">{description}</p> : null}
    </div>
  );
}
