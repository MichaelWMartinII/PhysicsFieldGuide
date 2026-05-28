import { AutoMath } from './AutoMath';

export function Prerequisites({ items }: { items: string[] }) {
  return (
    <div className="prereq">
      <span className="prereq-label">Prerequisites</span>
      <span><AutoMath>{items.join(' · ')}</AutoMath></span>
    </div>
  );
}
