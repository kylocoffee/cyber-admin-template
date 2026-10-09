import React from 'react';

interface CyberCardProps {
  title?: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  glow?: boolean;
  corner?: boolean;
  noPadding?: boolean;
}

export const CyberCard: React.FC<CyberCardProps> = ({
  title,
  subtitle,
  badge,
  action,
  className = '',
  children,
  glow = false,
  corner = true,
  noPadding = false,
}) => {
  return (
    <div
      className={`cyber-card rounded-lg transition-all ${
        corner ? 'cyber-corner' : ''
      } ${glow ? 'cyber-card-glow' : ''} ${className}`}
    >
      {(title || action || badge) && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5">
              {typeof title === 'string' ? (
                <h3 className="text-sm font-semibold tracking-wide text-slate-100 uppercase">
                  {title}
                </h3>
              ) : (
                title
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
    </div>
  );
};
