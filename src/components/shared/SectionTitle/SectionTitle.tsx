type SectionTitleProps = {
  title: string;
  description?: string;
  centered?: boolean;
};

const SectionTitle = ({
  title,
  description,
  centered = true,
}: SectionTitleProps) => {
  return (
    <div className={`${centered ? "text-center" : "text-left"} mb-4`}>
      <div className="relative inline-block">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative z-10">
          {title}
        </h2>
        <div className="absolute -bottom-2 left-0 w-full h-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full z-0"></div>
      </div>
      {description && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
