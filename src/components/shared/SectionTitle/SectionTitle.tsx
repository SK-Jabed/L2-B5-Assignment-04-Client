type SectionTitleProps = {
  title: string;
};
const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div>
      <h1 className="text-center text-2xl md:text-4xl lg:text-6xl font-serif font-medium py-10 text-[#2D3E50]">
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;