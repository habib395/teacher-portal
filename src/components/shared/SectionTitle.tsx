interface SectionTitleProps {
  heading: string;
  subHeading?: string;
  badge?: string; // নতুন একটি অপশনাল প্রপস যোগ করা হলো যদি ছোট ট্যাগ বা ব্যাজ দেখাতে চাও
}

export default function SectionTitle({ heading, subHeading, badge }: SectionTitleProps) {
  return (
    <div className="text-center mx-auto my-12 max-w-2xl px-4">
      {/* Optional Badge */}
      {badge && (
        <span className="inline-block font-mono text-[10px] tracking-widest uppercase px-3 py-1 mb-3 bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 rounded-full">
          {badge}
        </span>
      )}

      {/* SubHeading */}
      {subHeading && (
        <p className="text-xs md:text-sm font-mono tracking-wider uppercase text-[#0F766E] mb-2">
          // {subHeading}
        </p>
      )}

      {/* Main Heading with Modern Styled Borders */}
      <div className="relative inline-block py-2">
        {/* Top & Bottom Subtle Accent Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#0F766E]" />
        
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#10231F] tracking-tight py-3">
          {heading}
        </h3>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#0F766E]" />
      </div>
    </div>
  );
}