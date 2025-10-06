import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DomainCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const DomainCard = ({ icon: Icon, title, description, color }: DomainCardProps) => {
  return (
    <Card className="p-6 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-2 cursor-pointer group">
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-8 w-8 text-foreground" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

export default DomainCard;
