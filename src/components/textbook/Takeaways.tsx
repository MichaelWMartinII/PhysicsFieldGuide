import { AutoMath } from './AutoMath';

export function Takeaways({ items }: { items: string[] }) {
  return (
    <div className="takeaways">
      <div className="takeaways-title">Key Takeaways</div>
      <ul>
        {items.map((item, i) => <li key={i}><AutoMath>{item}</AutoMath></li>)}
      </ul>
    </div>
  );
}
