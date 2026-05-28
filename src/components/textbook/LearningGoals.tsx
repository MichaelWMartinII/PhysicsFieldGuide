import { AutoMath } from './AutoMath';

export function LearningGoals({ items }: { items: string[] }) {
  return (
    <div className="learning-goals">
      <div className="learning-goals-title">Learning Goals</div>
      <ul>
        {items.map((item, i) => <li key={i}><AutoMath>{item}</AutoMath></li>)}
      </ul>
    </div>
  );
}
