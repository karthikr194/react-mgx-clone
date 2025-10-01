const FeatureTable = () => {
  const comparisonData = [
    {
      aspect: "Learning Curve",
      traditional: "6-12 months",
      noCode: "1-2 hours",
      savings: "95% reduction",
    },
    {
      aspect: "Development Time",
      traditional: "3-6 months",
      noCode: "Hours to days",
      savings: "90% faster",
    },
    {
      aspect: "Cost",
      traditional: "$50,000+",
      noCode: "$500-$2,000",
      savings: "96% cheaper",
    },
    {
      aspect: "Technical Skills",
      traditional: "Advanced programming",
      noCode: "Basic computer use",
      savings: "Zero coding required",
    },
    {
      aspect: "Maintenance",
      traditional: "Ongoing developer time",
      noCode: "Automated updates",
      savings: "80% less effort",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="px-6 py-4 text-left font-semibold">Development Aspect</th>
            <th className="px-6 py-4 text-left font-semibold">Traditional Coding</th>
            <th className="px-6 py-4 text-left font-semibold">No-Code Platform</th>
            <th className="px-6 py-4 text-left font-semibold">Time Savings</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, index) => (
            <tr
              key={index}
              className={`border-t ${
                index % 2 === 0 ? "bg-muted/20" : "bg-card"
              } hover:bg-muted/40 transition-smooth`}
            >
              <td className="px-6 py-4 font-medium">{row.aspect}</td>
              <td className="px-6 py-4 text-muted-foreground">{row.traditional}</td>
              <td className="px-6 py-4 text-primary font-medium">{row.noCode}</td>
              <td className="px-6 py-4 text-accent font-semibold">{row.savings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureTable;
