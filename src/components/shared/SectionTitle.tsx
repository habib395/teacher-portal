
interface SectionTitleProps {
    heading: string;
    subHeading?: string; 
}

  export default function SectionTitle({ heading, subHeading }: SectionTitleProps) {
    return (
      <div className="text-center mx-auto my-8 md:w-4/12">
        {subHeading && (
          <p className="text-teal-500 mb-2 italic">--- {subHeading} ---</p>
        )}
        <h3 className="text-3xl uppercase border-y-4 py-4 font-semibold">{heading}</h3>
      </div>
    );
  }