import { AutoMath } from './AutoMath';

export function Theorem({ number, title, children }: {
  number?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="tb-theorem">
      <div className="tb-theorem-header">
        {number ? `Theorem ${number}` : 'Law'} — {title}
      </div>
      <div className="tb-theorem-body"><AutoMath>{children}</AutoMath></div>
    </div>
  );
}
