import Icon from '../Icon';
import './ui.css';

export default function StatCard({ label, value, icon, iconTone = 'mint', hint, hintTone = 'neutral', accent }) {
  return (
    <div className={`stat-card${accent ? ' accent' : ''}`}>
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        {icon && (
          <span className={`stat-card-icon tone-${iconTone}`}>
            <Icon name={icon} size={18} />
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      {hint && <div className={`stat-card-hint tone-${hintTone}`}>{hint}</div>}
    </div>
  );
}
