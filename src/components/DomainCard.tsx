import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface DomainCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  link: string;
}

const DomainCard = ({ icon: Icon, title, description, color, link }: DomainCardProps) => {
  return (
    <Link to={link}>
      <Card className="p-8 hover:shadow-hover transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-2 cursor-pointer group rounded-3xl">
        <div className={`w-20 h-20 rounded-3xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <Icon className="h-10 w-10 text-foreground" />
        </div>
        <h3 className="text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </Card>
    </Link>
  );
};

export default DomainCard;
