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
        <div className={`w-20 h-20 rounded-[20px] ${iconBg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <Icon className="h-10 w-10 text-ink" />
        </div>
        <h3 className={`${accentColor} mb-1`}>{title}</h3>
        {subtitle && <p className="text-sm font-medium text-muted-foreground mb-3">{subtitle}</p>}
        <p className="text-ink-soft leading-relaxed font-light">{description}</p>
      </Card>
    </Link>
  );
};

export default DomainCard;
