export default function Info() {
    const extraContributions = [
        {
            percentage: "40%",
            title: "Hero Foundation & Community Aid",
            description: "Funding direct aid exclusively for members of our community who need support."
        },
        {
            percentage: "30%",
            title: "Elevating Content Quality",
            description: "Enhancing production, storytelling, and educational content for lasting impact."
        },
        {
            percentage: "20%",
            title: "Growing Our Creative Platform",
            description: "Building infrastructure, supporting the team, and expanding our movement."
        },
        {
            percentage: "10%",
            title: "Empowering My Creative Work",
            description: "Direct support for my work, enabling me to create meaningful content."
        }
    ];

    return (
        <div className="font-ekMukta px-5 mb-5">
            <h3 className="text-[#FFFFFF] font-semibold text-[16px]">Extra Contributions</h3>
            <p className="text-[#CDCDCD] text-[16px]">
                Every extra contribution fuels impact, empowers our community, and rewards our supporters.
            </p>
            <ul className="mt-5 space-y-6">
                {extraContributions.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-2 text-[#CDCDCD] text-[16px]"
                    >
                        {/* Cerculeț */}
                        <span className="w-[4px] h-[4px] mt-[8px] rounded-full bg-[#FFFFFF] flex-shrink-0"></span>
                        {/* Conținut */}
                        <div>
                            <h3 className="text-[#CDCDCD] font-bold text-[16px]">
                                {item.percentage} - {item.title}
                            </h3>
                            <p className="text-[#CDCDCD] font-light text-[16px]">{item.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
