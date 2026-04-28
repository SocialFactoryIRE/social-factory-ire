import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface DomainCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  bg: string;
  accentColor: string;
  iconBg: string;
  link: string;
  color?: string;
}

const DomainCard = ({ icon: Icon, title, subtitle, description, bg, accentColor, iconBg, link }: DomainCardProps) => {
  return (
    <Link to={link}>
      <Card className={`p-8 h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-2 ${bg} border-2 border-transparent cursor-pointer group`}>
        {/* Icon + heading on the same row */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 shrink-0 rounded-[20px] ${iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <Icon className="h-8 w-8 text-ink" />
          </div>
          <div className="min-w-0">
            <h3 className={`${accentColor} leading-tight`}>{title}</h3>
            {subtitle && <p className="text-sm font-medium text-ink-soft">{subtitle}</p>}
          </div>
        </div>
        <p className="text-ink-soft leading-relaxed font-light max-w-[70ch]">{description}</p>
      </Card>
    </Link>
  );
};

export default DomainCard;
