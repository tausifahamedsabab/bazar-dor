type BanglaDateProps = {
  dateString: string;
};

export default function BanglaDate({ dateString }: BanglaDateProps) {
  return <p className="text-sm text-gray-500">{dateString}</p>;
}
