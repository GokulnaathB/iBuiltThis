import { cn } from "@/lib/utils";

export default async function StatsCard({
  approved,
  pending,
  rejected,
}: {
  approved: number;
  rejected: number;
  pending: number;
}) {
  const stats = [
    {
      label: "Total",
      count: approved + pending + rejected,
      color: "bg-primary/10",
    },
    {
      label: "Pending",
      count: pending,
      color: "bg-yellow-500/10",
    },
    {
      label: "Approved",
      count: approved,
      color: "bg-green-500/10",
    },
    {
      label: "Rejected",
      count: rejected,
      color: "bg-red-500/10",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className={cn("status-badge-card", stat.color)}>
          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
          <p className="text-3xl font-bold">{stat.count}</p>
        </div>
      ))}
    </div>
  );
}
