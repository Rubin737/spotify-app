
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
    <div className="lg:p-8 p-2 bg-zinc-800 lg:rounded-xl rounded-md transition-colors hover:bg-zinc-800/50">
      <div className="items-center flex gap-3">
        <div className={`${bgColor} rounded-md lg:p-3 p-1 hover:${bgColor}/50 hover:scale-103`}>
          <Icon className={`${iconColor} lg:size-6 size-4 `} />
        </div>
        <div>
          <p className="lg:font-xl font-semibold lg:font-bold text-xs">{label}</p>
          <p className="text-[9px] lg:text-sm text-gray-400">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
