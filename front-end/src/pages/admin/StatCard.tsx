
interface StatsProps {
  icon: React.ElementType; 
  label: string;
  bgColor: string;
  iconColor: string;
  value:string
}

const StatCard = ({
  bgColor,
  icon: Icon,
  label,
  value,
  iconColor,
}: StatsProps) => {
  return (
    <div className="p-8 bg-zinc-800 rounded-xl transition-colors hover:bg-zinc-800/50">
      <div className="items-center flex gap-3">
        <div className={`${bgColor} rounded-md p-3 hover:${bgColor}/50 hover:scale-103`}>
          <Icon className={`${iconColor} size-6 `} />
        </div>
        <div className="font-bold">
          <p className="font-xl">{label}</p>
          <p className="font-lg text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
