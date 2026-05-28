import { AutoMath } from './AutoMath';

export function Definition({ number, title, children }: {
  number?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="tb-definition">
      <div className="tb-definition-header">
        {number ? `Definition ${number}` : 'Definition'} — {title}
      </div>
      <div className="tb-definition-body"><AutoMath>{children}</AutoMath></div>
    </div>
  );
}
