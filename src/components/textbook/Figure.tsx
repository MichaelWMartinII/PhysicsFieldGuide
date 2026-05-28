import { AutoMath } from './AutoMath';

export function Figure({ number, caption, children }: {
  number?: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="figure-wrap">
      {children}
      <div className="figure-caption">
        {number && <span className="figure-num">Figure {number}. </span>}<AutoMath>{caption}</AutoMath>
      </div>
    </div>
  );
}
