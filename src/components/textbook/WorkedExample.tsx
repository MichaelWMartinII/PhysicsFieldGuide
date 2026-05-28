import { AutoMath } from './AutoMath';

export function WorkedExample({ number, title, children }: {
  number?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="tb-example">
      <div className="tb-example-header">
        {number ? `Example ${number}` : 'Example'} — {title}
      </div>
      <div className="tb-example-body"><AutoMath>{children}</AutoMath></div>
    </div>
  );
}

export function Step({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="tb-example-step">
      {label && <span style={{ color: 'var(--ex-accent)', fontWeight: 600, marginRight: '0.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '0.88rem' }}>{label}</span>}
      <AutoMath>{children}</AutoMath>
    </div>
  );
}
