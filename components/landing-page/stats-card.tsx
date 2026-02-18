import { LucideIcon } from "lucide-react";

export default function StatsData({
  icon: Icon,
  value,
  label,
  hasBorder,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  hasBorder?: boolean;
}) {
  return (
    <div className={hasBorder ? "border-x border-border/50" : ""}>
      <div className="flex items-center justify-center gep-2">
        <Icon className="size-5 text-primary/70" />
        <p className="text-3xl sm:text-4xl font-bold">{value}</p>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
