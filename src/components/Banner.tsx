import { LuHeart, LuClock, LuTruck, LuArchive } from 'react-icons/lu';

interface FeatureItem {
    icon: React.ReactElement;
    line1: string;
    line2: string;
}

const featureItems: FeatureItem[] = [
    {
        icon: <LuHeart className="w-8 h-8 sm:w-10 sm:h-10 text-black" />,
        line1: "6M+",
        line2: "Satisfied Customers",
    },
    {
        icon: <LuClock className="w-8 h-8 sm:w-10 sm:h-10 text-black" />,
        line1: "<24 Hours",
        line2: "Fast Delivery",
    },
    {
        icon: <LuTruck className="w-8 h-8 sm:w-10 sm:h-10 text-black" />,
        line1: "Free Shipping",
        line2: "on orders over €60.00",
    },
    {
        icon: <LuArchive className="w-8 h-8 sm:w-10 sm:h-10 text-black" />,
        line1: "9000+ Products",
        line2: "Widest Assortment in Stock",
    },
];

export default function Banner() {
    // Komponenta Banner, ktorá zobrazuje štyri funkcie s ikonami a textom
    // Vytvára sa zo štyroch položiek, každá s ikonou a dvoma riadkami textu
    // podľa oficiálnej stránky GymBeam
    return (
        <div className="bg-white text-neutral-800 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                    {featureItems.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center md:items-start">
                            <div className="mb-2 md:mb-0 md:mr-4 shrink-0">{item.icon}</div>
                            <div className="flex flex-col">
                                <p className="text-sm sm:text-base font-bold leading-tight">
                                    {item.line1}
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-500 leading-tight mt-0.5">
                                    {item.line2}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
